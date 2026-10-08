import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundManager } from '../utils/soundManager';

// District camera coordinates & target focus points
const DISTRICT_CAMERAS = {
  explore: { pos: new THREE.Vector3(0, 42, 88), target: new THREE.Vector3(0, 8, 0) },
  identity: { pos: new THREE.Vector3(-28, 18, 28), target: new THREE.Vector3(-28, 14, 6) },
  projects: { pos: new THREE.Vector3(28, 20, 28), target: new THREE.Vector3(28, 14, 6) },
  lab: { pos: new THREE.Vector3(-32, 22, -18), target: new THREE.Vector3(-32, 14, -36) },
  experience: { pos: new THREE.Vector3(32, 26, -18), target: new THREE.Vector3(32, 18, -36) },
  vault: { pos: new THREE.Vector3(0, 22, -36), target: new THREE.Vector3(0, 14, -58) },
  archive: { pos: new THREE.Vector3(-14, 16, 52), target: new THREE.Vector3(-14, 10, 28) },
  terminal: { pos: new THREE.Vector3(16, 18, 52), target: new THREE.Vector3(16, 10, 28) }
};

export default function City3D({ activeDistrict, onSelectDistrict, reducedMotion }) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    currentPos: new THREE.Vector3(0, 42, 88),
    currentTarget: new THREE.Vector3(0, 8, 0),
    targetPos: new THREE.Vector3(0, 42, 88),
    targetTarget: new THREE.Vector3(0, 8, 0),
    interactiveObjects: [],
    mouse: new THREE.Vector2(),
    targetMouseParallax: new THREE.Vector2(),
    mouseParallax: new THREE.Vector2(),
    hoveredDistrict: null,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    orbitOffset: new THREE.Vector2(0, 0),
    trafficStreams: [],
    animatedObjects: []
  });

  // Handle active district camera changes
  useEffect(() => {
    const config = DISTRICT_CAMERAS[activeDistrict] || DISTRICT_CAMERAS.explore;
    stateRef.current.targetPos.copy(config.pos);
    stateRef.current.targetTarget.copy(config.target);
    soundManager.playWarp();
  }, [activeDistrict]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02040a);
    scene.fog = new THREE.FogExp2(0x02040a, 0.012);
    stateRef.current.scene = scene;

    // --- CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 42, 88);
    camera.lookAt(0, 8, 0);
    stateRef.current.camera = camera;

    // --- RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = false; // keep fast 60fps
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0b1528, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight1.position.set(40, 60, 40);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff0077, 1.4);
    dirLight2.position.set(-40, 50, -30);
    scene.add(dirLight2);

    // Dynamic central cyber glow
    const coreLight = new THREE.PointLight(0x00ffcc, 3, 120, 1.2);
    coreLight.position.set(0, 25, 0);
    scene.add(coreLight);

    // --- GROUND GRID (WET CYBERPUNK ASPHALT) ---
    const groundGeo = new THREE.PlaneGeometry(360, 360, 40, 40);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050914,
      roughness: 0.25,
      metalness: 0.9,
      wireframe: false
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Glowing Neon Ground Grid Lines
    const gridHelper = new THREE.GridHelper(360, 72, 0x00ffcc, 0x0d2149);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // Radial cyber circles on ground
    for (let r of [18, 38, 65, 95]) {
      const ringGeo = new THREE.RingGeometry(r - 0.2, r + 0.2, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r === 38 ? 0xff0055 : 0x00e5ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.08;
      scene.add(ringMesh);
    }

    // --- PROCEDURAL CYBERPUNK SKYSCRAPERS ---
    const buildingMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x070c18, roughness: 0.3, metalness: 0.8 }),
      new THREE.MeshStandardMaterial({ color: 0x091024, roughness: 0.2, metalness: 0.85 }),
      new THREE.MeshStandardMaterial({ color: 0x050811, roughness: 0.4, metalness: 0.75 })
    ];

    const neonWindowColors = [0x00f0ff, 0xff0077, 0x8b5cf6, 0x38bdf8, 0x10b981];

    // Helper to generate dynamic billboard texture
    function createBillboardTexture(title, subtitle, accentColor) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#050914';
      ctx.fillRect(0, 0, 512, 256);

      // Cyber border
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 8;
      ctx.strokeRect(8, 8, 496, 240);

      // Corner tech cuts
      ctx.fillStyle = accentColor;
      ctx.fillRect(8, 8, 28, 8);
      ctx.fillRect(8, 8, 8, 28);
      ctx.fillRect(476, 224, 28, 8);
      ctx.fillRect(496, 204, 8, 28);

      // Title
      ctx.font = 'bold 44px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(title, 256, 115);

      // Subtitle
      ctx.font = '600 22px monospace';
      ctx.fillStyle = accentColor;
      ctx.fillText(subtitle, 256, 165);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    // Add Skyscraper Cluster
    const buildingBoxes = [];
    const occupiedLocations = [];

    function isOccupied(x, z, r = 10) {
      return occupiedLocations.some(loc => {
        const dx = loc.x - x;
        const dz = loc.z - z;
        return Math.sqrt(dx * dx + dz * dz) < r;
      });
    }

    // Reserved district positions so skyscrapers don't overlap landmarks
    const reservedZones = [
      { x: -28, z: 6, r: 16 },   // Identity
      { x: 28, z: 6, r: 16 },    // Projects
      { x: -32, z: -36, r: 16 }, // Tech Lab
      { x: 32, z: -36, r: 16 },  // Experience
      { x: 0, z: -58, r: 18 },   // Vault
      { x: -14, z: 28, r: 14 },  // Archive
      { x: 16, z: 28, r: 14 },   // Terminal
      { x: 0, z: 0, r: 18 }      // Central Plaza
    ];
    reservedZones.forEach(z => occupiedLocations.push(z));

    // Generate surrounding skyline buildings
    for (let i = 0; i < 75; i++) {
      const angle = (i / 75) * Math.PI * 2 + (Math.random() * 0.15);
      const dist = 32 + Math.random() * 85;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (isOccupied(x, z, 7)) continue;
      occupiedLocations.push({ x, z, r: 7 });

      const width = 6 + Math.random() * 7;
      const depth = 6 + Math.random() * 7;
      const height = 18 + Math.random() * 55;

      const geo = new THREE.BoxGeometry(width, height, depth);
      const mat = buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)];
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, height / 2, z);
      scene.add(mesh);
      buildingBoxes.push(mesh);

      // Glowing edge highlight wireframe on top
      const wireGeo = new THREE.EdgesGeometry(geo);
      const wireColor = neonWindowColors[Math.floor(Math.random() * neonWindowColors.length)];
      const wireMat = new THREE.LineBasicMaterial({
        color: wireColor,
        transparent: true,
        opacity: Math.random() * 0.4 + 0.25
      });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      wire.position.copy(mesh.position);
      scene.add(wire);

      // Random window panels / holographic strips
      if (Math.random() > 0.45 && height > 30) {
        const stripHeight = height * 0.6;
        const stripGeo = new THREE.PlaneGeometry(width * 0.8, stripHeight);
        const stripMat = new THREE.MeshBasicMaterial({
          color: wireColor,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide
        });
        const strip = new THREE.Mesh(stripGeo, stripMat);
        strip.position.set(x, height / 2, z + depth / 2 + 0.05);
        scene.add(strip);
      }
    }

    // --- DISTRICT INTERACTIVE LANDMARKS ---
    const interactiveObjects = [];

    function registerInteractive(mesh, districtId, label, sub) {
      mesh.userData = { districtId, label, sub };
      interactiveObjects.push(mesh);
      scene.add(mesh);
    }

    // 1. DIGITAL IDENTITY TOWER (Cyan spire + orbital holographic rings)
    const idGroup = new THREE.Group();
    idGroup.position.set(-28, 0, 6);
    const idTowerGeo = new THREE.CylinderGeometry(2.5, 4.5, 36, 8);
    const idTowerMat = new THREE.MeshStandardMaterial({
      color: 0x071b26,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.2,
      roughness: 0.2,
      metalness: 0.9
    });
    const idTower = new THREE.Mesh(idTowerGeo, idTowerMat);
    idTower.position.y = 18;
    idGroup.add(idTower);

    // Glowing orbital rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(5.5, 0.15, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x00ffcc })
    );
    ring1.rotation.x = Math.PI / 3;
    ring1.position.y = 26;
    idGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(7.0, 0.12, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.position.y = 22;
    idGroup.add(ring2);

    // Billboard sign
    const idTex = createBillboardTexture('FATHIMA.OS', 'IDENTITY TERMINAL', '#00ffcc');
    const idSign = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshBasicMaterial({ map: idTex, side: THREE.DoubleSide })
    );
    idSign.position.set(0, 32, 0);
    idGroup.add(idSign);

    registerInteractive(idGroup, 'identity', 'DIGITAL IDENTITY', 'Explore Fathima\'s Bio & Strengths');
    stateRef.current.animatedObjects.push({
      update: (time) => {
        ring1.rotation.z = time * 0.8;
        ring2.rotation.y = time * -0.6;
        idSign.rotation.y = Math.sin(time * 0.5) * 0.2;
      }
    });

    // 2. PROJECT DISTRICT (Dual megatower portal with connecting skybridge)
    const projGroup = new THREE.Group();
    projGroup.position.set(28, 0, 6);

    const archPillar1 = new THREE.Mesh(
      new THREE.BoxGeometry(4, 38, 4),
      new THREE.MeshStandardMaterial({ color: 0x0a1024, emissive: 0x3b82f6, emissiveIntensity: 0.3 })
    );
    archPillar1.position.set(-5, 19, 0);
    projGroup.add(archPillar1);

    const archPillar2 = new THREE.Mesh(
      new THREE.BoxGeometry(4, 38, 4),
      new THREE.MeshStandardMaterial({ color: 0x0a1024, emissive: 0x8b5cf6, emissiveIntensity: 0.3 })
    );
    archPillar2.position.set(5, 19, 0);
    projGroup.add(archPillar2);

    const bridge = new THREE.Mesh(
      new THREE.BoxGeometry(14, 3, 5),
      new THREE.MeshStandardMaterial({ color: 0x111c38, roughness: 0.2 })
    );
    bridge.position.set(0, 32, 0);
    projGroup.add(bridge);

    const projTex = createBillboardTexture('AGRIQUEUE', 'PROJECT DISTRICT', '#38bdf8');
    const projSign = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5),
      new THREE.MeshBasicMaterial({ map: projTex, side: THREE.DoubleSide })
    );
    projSign.position.set(0, 24, 0);
    projGroup.add(projSign);

    registerInteractive(projGroup, 'projects', 'PROJECT DISTRICT', 'Launch AgriQueue & I/O Simulations');

    // 3. TECH LAB SPHERE (Levitating 3D polyhedral core)
    const labGroup = new THREE.Group();
    labGroup.position.set(-32, 0, -36);

    const labBase = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 7, 12, 6),
      new THREE.MeshStandardMaterial({ color: 0x091424, roughness: 0.3 })
    );
    labBase.position.y = 6;
    labGroup.add(labBase);

    const labCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(4.2, 0),
      new THREE.MeshStandardMaterial({
        color: 0x8b5cf6,
        emissive: 0x6366f1,
        emissiveIntensity: 0.6,
        wireframe: true
      })
    );
    labCore.position.y = 20;
    labGroup.add(labCore);

    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x00ffcc })
    );
    innerSphere.position.y = 20;
    labGroup.add(innerSphere);

    const labTex = createBillboardTexture('TECH LAB', 'SKILL MATRIX // CORE', '#a855f7');
    const labSign = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshBasicMaterial({ map: labTex, side: THREE.DoubleSide })
    );
    labSign.position.set(0, 28, 0);
    labGroup.add(labSign);

    registerInteractive(labGroup, 'lab', 'TECH LAB', 'Inspect Holographic Skill Matrix');
    stateRef.current.animatedObjects.push({
      update: (time) => {
        labCore.rotation.x = time * 0.4;
        labCore.rotation.y = time * 0.6;
        labCore.position.y = 20 + Math.sin(time * 2) * 0.8;
        innerSphere.position.y = 20 + Math.sin(time * 2) * 0.8;
      }
    });

    // 4. EXPERIENCE TOWER (Ascending helix cyber spire)
    const expGroup = new THREE.Group();
    expGroup.position.set(32, 0, -36);

    const expSpire = new THREE.Mesh(
      new THREE.ConeGeometry(4, 46, 6),
      new THREE.MeshStandardMaterial({
        color: 0x0d1f36,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.3,
        roughness: 0.2
      })
    );
    expSpire.position.y = 23;
    expGroup.add(expSpire);

    // Helical rings around spire
    const expRings = [];
    for (let k = 0; k < 5; k++) {
      const eRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.6 - k * 0.5, 0.15, 12, 32),
        new THREE.MeshBasicMaterial({ color: 0x00ffcc })
      );
      eRing.position.y = 12 + k * 6;
      eRing.rotation.x = Math.PI / 2;
      expGroup.add(eRing);
      expRings.push(eRing);
    }

    const expTex = createBillboardTexture('EXPERIENCE', 'JHF & GENZEE INTERNSHIPS', '#00ffcc');
    const expSign = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 4.5),
      new THREE.MeshBasicMaterial({ map: expTex, side: THREE.DoubleSide })
    );
    expSign.position.set(0, 36, 0);
    expGroup.add(expSign);

    registerInteractive(expGroup, 'experience', 'EXPERIENCE TOWER', 'Explore Career Timeline & Internships');
    stateRef.current.animatedObjects.push({
      update: (time) => {
        expRings.forEach((r, idx) => {
          r.rotation.z = time * (0.5 + idx * 0.2);
        });
      }
    });

    // 5. ACHIEVEMENT VAULT (Golden/Amber geodesic dome)
    const vaultGroup = new THREE.Group();
    vaultGroup.position.set(0, 0, -58);

    const domeGeo = new THREE.SphereGeometry(7, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x241804,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      wireframe: true
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0;
    vaultGroup.add(dome);

    const trophyCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(2.8),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b })
    );
    trophyCore.position.y = 10;
    vaultGroup.add(trophyCore);

    const vaultTex = createBillboardTexture('ACHIEVEMENTS', 'SIH 2026 3RD PRIZE // BADGES', '#f59e0b');
    const vaultSign = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5),
      new THREE.MeshBasicMaterial({ map: vaultTex, side: THREE.DoubleSide })
    );
    vaultSign.position.set(0, 20, 0);
    vaultGroup.add(vaultSign);

    registerInteractive(vaultGroup, 'vault', 'ACHIEVEMENT VAULT', 'Unlock Trophies & Certifications');
    stateRef.current.animatedObjects.push({
      update: (time) => {
        trophyCore.rotation.y = time * 1.2;
        trophyCore.rotation.x = Math.sin(time) * 0.3;
        trophyCore.position.y = 10 + Math.sin(time * 3) * 0.5;
      }
    });

    // 6. EDUCATION ARCHIVE (Emerald/Cyan crystalline monolith)
    const archGroup = new THREE.Group();
    archGroup.position.set(-14, 0, 28);

    const archMonolith = new THREE.Mesh(
      new THREE.BoxGeometry(5, 26, 4),
      new THREE.MeshStandardMaterial({
        color: 0x052e16,
        emissive: 0x10b981,
        emissiveIntensity: 0.3,
        roughness: 0.2
      })
    );
    archMonolith.position.y = 13;
    archGroup.add(archMonolith);

    const archTex = createBillboardTexture('EDUCATION', 'B.TECH CSE (KTU) // 7.41 CGPA', '#10b981');
    const archSign = new THREE.Mesh(
      new THREE.PlaneGeometry(7.5, 3.8),
      new THREE.MeshBasicMaterial({ map: archTex, side: THREE.DoubleSide })
    );
    archSign.position.set(0, 24, 0);
    archGroup.add(archSign);

    registerInteractive(archGroup, 'archive', 'EDUCATION ARCHIVE', 'Inspect Academic Milestones');

    // 7. COMMUNICATION TERMINAL (Antenna transmission mast with pulse beam)
    const termGroup = new THREE.Group();
    termGroup.position.set(16, 0, 28);

    const mastGeo = new THREE.CylinderGeometry(0.5, 2, 32, 8);
    const mastMat = new THREE.MeshStandardMaterial({
      color: 0x221319,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.4
    });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = 16;
    termGroup.add(mast);

    const dish = new THREE.Mesh(
      new THREE.CylinderGeometry(2.5, 0.4, 0.8, 16),
      new THREE.MeshBasicMaterial({ color: 0xff0055 })
    );
    dish.position.y = 30;
    dish.rotation.x = Math.PI / 4;
    termGroup.add(dish);

    const termTex = createBillboardTexture('TERMINAL', 'LET\'S BUILD SOMETHING', '#f43f5e');
    const termSign = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshBasicMaterial({ map: termTex, side: THREE.DoubleSide })
    );
    termSign.position.set(0, 22, 0);
    termGroup.add(termSign);

    registerInteractive(termGroup, 'terminal', 'COMMUNICATION TERMINAL', 'Transmit Message or Connect');
    stateRef.current.animatedObjects.push({
      update: (time) => {
        dish.rotation.y = time * 0.9;
      }
    });

    stateRef.current.interactiveObjects = interactiveObjects;

    // --- CYBER RAIN & FLOATING PARTICLES ---
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 220;
      particlePositions[p * 3 + 1] = Math.random() * 80;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 220;
      particleSpeeds[p] = 0.1 + Math.random() * 0.3;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.85,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // --- AERIAL TRAFFIC (FLYING VEHICLE LIGHT TRAILS) ---
    const trafficCount = 28;
    const trafficCars = [];

    for (let t = 0; t < trafficCount; t++) {
      const isRed = t % 2 === 0;
      const carGeo = new THREE.BoxGeometry(0.8, 0.3, 2.5);
      const carMat = new THREE.MeshBasicMaterial({
        color: isRed ? 0xff1e56 : 0x00ffff
      });
      const car = new THREE.Mesh(carGeo, carMat);

      const laneRadius = 35 + (t % 5) * 12;
      const altitude = 14 + (t % 6) * 5;
      const speed = (0.2 + (t % 3) * 0.15) * (t % 2 === 0 ? 1 : -1);
      const startAngle = Math.random() * Math.PI * 2;

      car.userData = { laneRadius, altitude, speed, angle: startAngle };
      scene.add(car);
      trafficCars.push(car);
    }

    // --- MOUSE & RAYCASTER INTERACTION ---
    const raycaster = new THREE.Raycaster();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      stateRef.current.mouse.set(x, y);
      stateRef.current.targetMouseParallax.set(x * 6, y * 3);

      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.dragStart.x;
        const dy = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.orbitOffset.x += dx * 0.005;
        stateRef.current.orbitOffset.y = Math.max(
          -0.6,
          Math.min(0.6, stateRef.current.orbitOffset.y + dy * 0.003)
        );
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(stateRef.current.interactiveObjects, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.districtId && obj.parent) {
          obj = obj.parent;
        }
        if (obj?.userData?.districtId) {
          soundManager.playClick();
          onSelectDistrict(obj.userData.districtId);
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // --- ANIMATION LOOP ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Animate landmarks
      stateRef.current.animatedObjects.forEach(obj => obj.update(time));

      // Animate particles (floating cyber motes)
      const positions = particleGeo.attributes.position.array;
      for (let p = 0; p < particleCount; p++) {
        positions[p * 3 + 1] += particleSpeeds[p] * 0.8;
        if (positions[p * 3 + 1] > 80) {
          positions[p * 3 + 1] = 0;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Animate traffic cars
      trafficCars.forEach(car => {
        car.userData.angle += car.userData.speed * delta;
        const rad = car.userData.laneRadius;
        car.position.x = Math.cos(car.userData.angle) * rad;
        car.position.z = Math.sin(car.userData.angle) * rad;
        car.position.y = car.userData.altitude;
        car.rotation.y = -car.userData.angle + (car.userData.speed > 0 ? 0 : Math.PI);
      });

      // Smooth camera interpolation
      const lerpSpeed = reducedMotion ? 0.15 : 0.045;
      stateRef.current.currentPos.lerp(stateRef.current.targetPos, lerpSpeed);
      stateRef.current.currentTarget.lerp(stateRef.current.targetTarget, lerpSpeed);

      // Smooth mouse parallax
      stateRef.current.mouseParallax.lerp(stateRef.current.targetMouseParallax, 0.05);

      // Apply camera transform with orbit & subtle parallax
      camera.position.copy(stateRef.current.currentPos);
      camera.position.x += stateRef.current.mouseParallax.x * 0.6;
      camera.position.y += stateRef.current.mouseParallax.y * 0.4;

      if (activeDistrict === 'explore') {
        camera.position.x += Math.sin(stateRef.current.orbitOffset.x) * 15;
        camera.position.z += Math.cos(stateRef.current.orbitOffset.x) * 15 - 15;
      }

      camera.lookAt(stateRef.current.currentTarget);

      // Raycasting for hover highlight
      raycaster.setFromCamera(stateRef.current.mouse, camera);
      const intersects = raycaster.intersectObjects(stateRef.current.interactiveObjects, true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.districtId && obj.parent) {
          obj = obj.parent;
        }
        if (obj?.userData?.districtId && stateRef.current.hoveredDistrict !== obj.userData.districtId) {
          stateRef.current.hoveredDistrict = obj.userData.districtId;
          soundManager.playHover();
          container.style.cursor = 'crosshair';
        }
      } else {
        if (stateRef.current.hoveredDistrict) {
          stateRef.current.hoveredDistrict = null;
          container.style.cursor = 'default';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion, onSelectDistrict, activeDistrict]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
