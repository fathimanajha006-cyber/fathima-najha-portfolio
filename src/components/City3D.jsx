import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCyberCharacter } from './CyberCharacter';
import { soundManager } from '../utils/soundManager';

// 8 Distinct Architectural Districts + Central Plaza Coordinates
export const DISTRICT_NODES = [
  {
    id: 'core',
    num: '00',
    name: 'NAJHA CENTRAL',
    label: 'CITY CORE',
    pos: new THREE.Vector3(0, 0, 16),
    camPos: new THREE.Vector3(0, 14, 42),
    lookAt: new THREE.Vector3(0, 3, 12),
    color: 0x00ffcc,
    signColor: '#00ffcc'
  },
  {
    id: 'identity',
    num: '01',
    name: 'IDENTITY DISTRICT',
    label: '01 — IDENTITY',
    pos: new THREE.Vector3(-28, 0, 0),
    camPos: new THREE.Vector3(-28, 12, 18),
    lookAt: new THREE.Vector3(-28, 10, 0),
    color: 0x00e5ff,
    signColor: '#00e5ff'
  },
  {
    id: 'education',
    num: '02',
    name: 'EDUCATION DISTRICT',
    label: '02 — EDUCATION',
    pos: new THREE.Vector3(-42, 0, -32),
    camPos: new THREE.Vector3(-42, 16, -14),
    lookAt: new THREE.Vector3(-42, 12, -32),
    color: 0x38bdf8,
    signColor: '#38bdf8'
  },
  {
    id: 'projects',
    num: '03',
    name: 'PROJECT DISTRICT',
    label: '03 — PROJECTS',
    pos: new THREE.Vector3(38, 0, -28),
    camPos: new THREE.Vector3(38, 18, -10),
    lookAt: new THREE.Vector3(38, 14, -28),
    color: 0x00ffcc,
    signColor: '#00ffcc'
  },
  {
    id: 'lab',
    num: '04',
    name: 'TECH LAB DISTRICT',
    label: '04 — TECH LAB',
    pos: new THREE.Vector3(-36, 0, 36),
    camPos: new THREE.Vector3(-36, 14, 52),
    lookAt: new THREE.Vector3(-36, 10, 36),
    color: 0xa855f7,
    signColor: '#a855f7'
  },
  {
    id: 'experience',
    num: '05',
    name: 'EXPERIENCE DISTRICT',
    label: '05 — EXPERIENCE',
    pos: new THREE.Vector3(42, 0, 8),
    camPos: new THREE.Vector3(42, 16, 26),
    lookAt: new THREE.Vector3(42, 12, 8),
    color: 0x38bdf8,
    signColor: '#38bdf8'
  },
  {
    id: 'vault',
    num: '06',
    name: 'ACHIEVEMENT DISTRICT',
    label: '06 — ACHIEVEMENTS',
    pos: new THREE.Vector3(0, 0, -68),
    camPos: new THREE.Vector3(0, 18, -48),
    lookAt: new THREE.Vector3(0, 12, -68),
    color: 0xf59e0b,
    signColor: '#f59e0b'
  },
  {
    id: 'certifications',
    num: '07',
    name: 'ARCHIVE DISTRICT',
    label: '07 — ARCHIVE',
    pos: new THREE.Vector3(-14, 0, 68),
    camPos: new THREE.Vector3(-14, 14, 84),
    lookAt: new THREE.Vector3(-14, 10, 68),
    color: 0x10b981,
    signColor: '#10b981'
  },
  {
    id: 'contact',
    num: '08',
    name: 'COMMUNICATION DISTRICT',
    label: '08 — CONTACT',
    pos: new THREE.Vector3(26, 0, 64),
    camPos: new THREE.Vector3(26, 16, 80),
    lookAt: new THREE.Vector3(26, 12, 64),
    color: 0xf43f5e,
    signColor: '#f43f5e'
  }
];

export default function City3D({
  targetDistrictId,
  isTraveling,
  travelProgress,
  onTravelComplete,
  onSelectDistrict,
  reducedMotion,
  isOpeningCinematic
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    character: null,
    landmarksMap: {},
    interactiveMeshes: [],
    trafficStreams: [],
    transitVehicle: null,
    startCamPos: new THREE.Vector3(0, 14, 42),
    startLookAt: new THREE.Vector3(0, 3, 12),
    currentCamPos: new THREE.Vector3(0, 14, 42),
    currentLookAt: new THREE.Vector3(0, 3, 12),
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    orbitOffset: new THREE.Vector2(0, 0),
    hoveredId: null
  });

  // Handle destination changes & travel trigger
  useEffect(() => {
    const dest = DISTRICT_NODES.find((d) => d.id === targetDistrictId) || DISTRICT_NODES[0];
    if (stateRef.current.camera) {
      stateRef.current.startCamPos.copy(stateRef.current.currentCamPos);
      stateRef.current.startLookAt.copy(stateRef.current.currentLookAt);
    }
  }, [targetDistrictId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02050f);
    scene.fog = new THREE.FogExp2(0x02050f, 0.011);
    stateRef.current.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      54,
      container.clientWidth / container.clientHeight,
      0.1,
      1400
    );
    camera.position.set(0, 80, 140); // starts high in atmosphere for cinematic opening
    camera.lookAt(0, 8, 16);
    stateRef.current.camera = camera;
    stateRef.current.currentCamPos.copy(camera.position);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x081326, 2.8);
    scene.add(ambientLight);

    const tealDir = new THREE.DirectionalLight(0x00f0ff, 1.8);
    tealDir.position.set(60, 100, 60);
    scene.add(tealDir);

    const purpleDir = new THREE.DirectionalLight(0xa855f7, 1.3);
    purpleDir.position.set(-60, 80, -60);
    scene.add(purpleDir);

    // --- WET CYBER ASPHALT GROUND GRID ---
    const groundGeo = new THREE.PlaneGeometry(500, 500, 60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x030713,
      roughness: 0.2,
      metalness: 0.95
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Neon Cyber Ground Grid
    const cyberGrid = new THREE.GridHelper(500, 100, 0x00ffcc, 0x091c36);
    cyberGrid.position.y = 0.04;
    scene.add(cyberGrid);

    // Concentric Neon Transit Rings
    for (let r of [25, 55, 95, 140]) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r - 0.3, r + 0.3, 64),
        new THREE.MeshBasicMaterial({
          color: r === 55 ? 0x38bdf8 : 0x00ffcc,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.08;
      scene.add(ring);
    }

    // --- CENTRAL EMBARKATION PLATFORM (NAJHA CENTRAL) ---
    const centralGroup = new THREE.Group();
    centralGroup.position.set(0, 0, 16);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(14, 15, 1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x061122, metalness: 0.85, roughness: 0.25 })
    );
    platform.position.y = 0.6;
    centralGroup.add(platform);

    const platformRing = new THREE.Mesh(
      new THREE.RingGeometry(13.8, 14.5, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ffcc, side: THREE.DoubleSide })
    );
    platformRing.rotation.x = -Math.PI / 2;
    platformRing.position.y = 1.22;
    centralGroup.add(platformRing);

    // Holographic destination console in center of plaza
    const consoleGeo = new THREE.CylinderGeometry(1.2, 1.8, 2.2, 8);
    const consoleMat = new THREE.MeshStandardMaterial({
      color: 0x0a1d38,
      emissive: 0x00ffcc,
      emissiveIntensity: 0.3
    });
    const terminalPillar = new THREE.Mesh(consoleGeo, consoleMat);
    terminalPillar.position.y = 2.2;
    centralGroup.add(terminalPillar);

    const holoDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 0.2, 0.4, 16),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 })
    );
    holoDisk.position.y = 3.6;
    centralGroup.add(holoDisk);
    scene.add(centralGroup);

    // --- STYLIZED 3D CHARACTER (GUIDE AT CENTRAL PLAZA) ---
    const character = createCyberCharacter();
    character.position.set(3.5, 1.2, 15);
    character.rotation.y = -Math.PI / 4;
    scene.add(character);
    stateRef.current.character = character;

    // --- AUTONOMOUS TRANSIT VEHICLE (FOR CINEMATIC TRAVEL) ---
    const transitVehicle = new THREE.Group();
    const transitBody = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.2, 5.0),
      new THREE.MeshStandardMaterial({
        color: 0x091830,
        metalness: 0.9,
        roughness: 0.2,
        emissive: 0x00ffcc,
        emissiveIntensity: 0.3
      })
    );
    transitBody.position.y = 1.0;
    transitVehicle.add(transitBody);

    // Glow streaks on transit craft
    const glowTrail = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.2, 4.8),
      new THREE.MeshBasicMaterial({ color: 0x00ffcc })
    );
    glowTrail.position.y = 0.3;
    transitVehicle.add(glowTrail);
    transitVehicle.position.set(0, 1.5, 20);
    scene.add(transitVehicle);
    stateRef.current.transitVehicle = transitVehicle;

    // --- BUILD THE 8 RECOGNIZED ARCHITECTURAL LANDMARKS ---
    const landmarksMap = {};
    const interactiveMeshes = [];

    function makeHoloSign(num, name, colorHex) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#030814';
      ctx.fillRect(0, 0, 512, 180);
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 496, 164);
      ctx.fillStyle = colorHex;
      ctx.fillRect(8, 8, 20, 20);
      ctx.fillRect(484, 152, 20, 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${num} // ${name}`, 256, 85);

      ctx.fillStyle = colorHex;
      ctx.font = '600 20px monospace';
      ctx.fillText('[ TAP / SELECT TO ENTER ]', 256, 130);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    DISTRICT_NODES.forEach((d) => {
      if (d.id === 'core') return;

      const group = new THREE.Group();
      group.position.copy(d.pos);
      group.userData = { districtId: d.id, name: d.name };
      scene.add(group);

      let haloParts = [];

      // 1. IDENTITY: Cyan crystalline obelisk with revolving rings
      if (d.id === 'identity') {
        const obelisk = new THREE.Mesh(
          new THREE.CylinderGeometry(2.2, 4.0, 36, 6),
          new THREE.MeshStandardMaterial({
            color: 0x071e2e,
            emissive: d.color,
            emissiveIntensity: 0.35,
            metalness: 0.9,
            roughness: 0.2
          })
        );
        obelisk.position.y = 18;
        group.add(obelisk);

        for (let r = 0; r < 2; r++) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(6 + r * 2, 0.15, 16, 48),
            new THREE.MeshBasicMaterial({ color: d.color })
          );
          ring.position.y = 22 + r * 6;
          ring.rotation.x = Math.PI / 3 + r * 0.4;
          group.add(ring);
          haloParts.push(ring);
        }
      }

      // 2. EDUCATION: University Spire with celestial rings
      else if (d.id === 'education') {
        const spire = new THREE.Mesh(
          new THREE.ConeGeometry(4.0, 42, 6),
          new THREE.MeshStandardMaterial({
            color: 0x081b34,
            emissive: d.color,
            emissiveIntensity: 0.35,
            metalness: 0.85
          })
        );
        spire.position.y = 21;
        group.add(spire);

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(7.5, 0.18, 16, 48),
          new THREE.MeshBasicMaterial({ color: d.color })
        );
        ring.position.y = 28;
        ring.rotation.x = Math.PI / 4;
        group.add(ring);
        haloParts.push(ring);
      }

      // 3. PROJECTS (HERO DISTRICT): Massive dual-arch research megastructure & bridge
      else if (d.id === 'projects') {
        for (let sign of [-1, 1]) {
          const pillar = new THREE.Mesh(
            new THREE.BoxGeometry(4.5, 48, 5.0),
            new THREE.MeshStandardMaterial({
              color: 0x061922,
              emissive: d.color,
              emissiveIntensity: 0.4,
              metalness: 0.9
            })
          );
          pillar.position.set(sign * 7.5, 24, 0);
          group.add(pillar);
        }

        const skybridge = new THREE.Mesh(
          new THREE.BoxGeometry(22, 4.5, 7.0),
          new THREE.MeshStandardMaterial({ color: 0x0b2533, metalness: 0.85 })
        );
        skybridge.position.set(0, 40, 0);
        group.add(skybridge);

        // Pulsing floating collider core
        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(4.2, 1),
          new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true })
        );
        core.position.set(0, 24, 0);
        group.add(core);
        haloParts.push(core);
      }

      // 4. TECH LAB: Levitating polyhedral core & laser field
      else if (d.id === 'lab') {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(6, 8, 12, 6),
          new THREE.MeshStandardMaterial({ color: 0x120822, metalness: 0.85 })
        );
        base.position.y = 6;
        group.add(base);

        const crystal = new THREE.Mesh(
          new THREE.OctahedronGeometry(4.8),
          new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            emissive: d.color,
            emissiveIntensity: 0.5,
            wireframe: true
          })
        );
        crystal.position.y = 22;
        group.add(crystal);
        haloParts.push(crystal);
      }

      // 5. EXPERIENCE: Stepped corporate megatower
      else if (d.id === 'experience') {
        const tower = new THREE.Mesh(
          new THREE.BoxGeometry(8.5, 46, 8.5),
          new THREE.MeshStandardMaterial({
            color: 0x051a24,
            emissive: d.color,
            emissiveIntensity: 0.3,
            metalness: 0.85
          })
        );
        tower.position.y = 23;
        group.add(tower);
      }

      // 6. ACHIEVEMENTS: Vault & golden trophy dome
      else if (d.id === 'vault') {
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(7.5, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({
            color: 0x241804,
            emissive: d.color,
            emissiveIntensity: 0.35,
            wireframe: true
          })
        );
        dome.position.y = 0;
        group.add(dome);

        const trophy = new THREE.Mesh(
          new THREE.DodecahedronGeometry(3.0),
          new THREE.MeshBasicMaterial({ color: 0xf59e0b })
        );
        trophy.position.y = 12;
        group.add(trophy);
        haloParts.push(trophy);
      }

      // 7. ARCHIVE: Cylindrical data-spire
      else if (d.id === 'certifications') {
        const cyl = new THREE.Mesh(
          new THREE.CylinderGeometry(4.5, 5.0, 36, 16),
          new THREE.MeshStandardMaterial({
            color: 0x041822,
            emissive: d.color,
            emissiveIntensity: 0.35,
            metalness: 0.85
          })
        );
        cyl.position.y = 18;
        group.add(cyl);

        for (let k = 0; k < 3; k++) {
          const r = new THREE.Mesh(
            new THREE.TorusGeometry(6.2, 0.15, 12, 32),
            new THREE.MeshBasicMaterial({ color: d.color })
          );
          r.position.y = 12 + k * 8;
          r.rotation.x = Math.PI / 2;
          group.add(r);
          haloParts.push(r);
        }
      }

      // 8. CONTACT: High-altitude transmission mast with dish
      else {
        const mast = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 2.2, 46, 8),
          new THREE.MeshStandardMaterial({
            color: 0x240916,
            emissive: d.color,
            emissiveIntensity: 0.4
          })
        );
        mast.position.y = 23;
        group.add(mast);

        const dish = new THREE.Mesh(
          new THREE.CylinderGeometry(3.0, 0.3, 0.8, 16),
          new THREE.MeshBasicMaterial({ color: d.color })
        );
        dish.position.y = 38;
        dish.rotation.x = Math.PI / 4;
        group.add(dish);
        haloParts.push(dish);
      }

      // Large Holographic Sign Facing Central Plaza
      const signTex = makeHoloSign(d.num, d.label, d.signColor);
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 3.5),
        new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide, transparent: true })
      );
      signMesh.position.set(0, 18, 5.5);

      const angleToCenter = Math.atan2(-d.pos.x, -d.pos.z + 16);
      signMesh.rotation.y = angleToCenter;
      group.add(signMesh);

      // Hitbox for raycasting
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(16, 42, 16),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.position.y = 21;
      hitBox.userData = { districtId: d.id, name: d.name };
      group.add(hitBox);
      interactiveMeshes.push(hitBox);

      // Dedicated Point Light
      const beaconLight = new THREE.PointLight(d.color, 2.5, 55, 1.3);
      beaconLight.position.set(0, 16, 0);
      group.add(beaconLight);

      landmarksMap[d.id] = { group, haloParts, beaconLight, signMesh, data: d };
    });

    stateRef.current.landmarksMap = landmarksMap;
    stateRef.current.interactiveMeshes = interactiveMeshes;

    // --- PROCEDURAL SURROUNDING METROPOLIS SKYSCRAPERS ---
    const bldMat = new THREE.MeshStandardMaterial({
      color: 0x050b18,
      roughness: 0.3,
      metalness: 0.85
    });

    for (let b = 0; b < 65; b++) {
      const angle = (b / 65) * Math.PI * 2 + Math.random() * 0.12;
      const dist = 42 + Math.random() * 95;
      const x = Math.sin(angle) * dist;
      const z = Math.cos(angle) * dist;

      const overlaps = DISTRICT_NODES.some((dn) => dn.pos.distanceTo(new THREE.Vector3(x, 0, z)) < 16);
      if (overlaps) continue;

      const w = 7 + Math.random() * 8;
      const d = 7 + Math.random() * 8;
      const h = 22 + Math.random() * 65;

      const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bldMat);
      box.position.set(x, h / 2, z);
      scene.add(box);

      // Glowing edge line
      const edges = new THREE.EdgesGeometry(box.geometry);
      const wire = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: b % 3 === 0 ? 0x00ffcc : b % 3 === 1 ? 0x38bdf8 : 0xa855f7,
          transparent: true,
          opacity: 0.32
        })
      );
      wire.position.copy(box.position);
      scene.add(wire);
    }

    // --- ELEVATED FLYING TRAFFIC SKYWAYS ---
    const trafficStreams = [];
    for (let f = 0; f < 26; f++) {
      const isRed = f % 2 === 0;
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.35, 2.8),
        new THREE.MeshBasicMaterial({ color: isRed ? 0xff0055 : 0x00ffff })
      );
      const radius = 42 + (f % 5) * 16;
      const altitude = 16 + (f % 6) * 6;
      const speed = (0.22 + (f % 3) * 0.12) * (f % 2 === 0 ? 1 : -1);
      car.userData = { radius, altitude, speed, angle: Math.random() * Math.PI * 2 };
      scene.add(car);
      trafficStreams.push(car);
    }
    stateRef.current.trafficStreams = trafficStreams;

    // --- FLOATING CYBER DUST PARTICLES ---
    const moteCount = 650;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let m = 0; m < moteCount * 3; m += 3) {
      motePos[m] = (Math.random() - 0.5) * 260;
      motePos[m + 1] = Math.random() * 85;
      motePos[m + 2] = (Math.random() - 0.5) * 260;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const motes = new THREE.Points(
      moteGeo,
      new THREE.PointsMaterial({
        color: 0x00ffcc,
        size: 0.8,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(motes);

    // --- RAYCASTING & DRAG CONTROLS ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (stateRef.current.isDragging && !isTraveling) {
        const dx = e.clientX - stateRef.current.dragStart.x;
        const dy = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.orbitOffset.x += dx * 0.005;
        stateRef.current.orbitOffset.y = Math.max(
          -0.5,
          Math.min(0.5, stateRef.current.orbitOffset.y + dy * 0.003)
        );
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }

      // Check hover
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(stateRef.current.interactiveMeshes, true);
      const bId = hits.length > 0 ? hits[0].object.userData.districtId : null;

      if (bId !== stateRef.current.hoveredId) {
        stateRef.current.hoveredId = bId;
        container.style.cursor = bId ? 'pointer' : 'default';
        if (bId) soundManager.playHover();
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(stateRef.current.interactiveMeshes, true);

      if (hits.length > 0) {
        const bId = hits[0].object.userData.districtId;
        if (bId) {
          soundManager.playClick();
          onSelectDistrict(bId);
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // --- ANIMATION LOOP (SMOOTH 60 FPS) ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Guide character idle animation
      if (stateRef.current.character?.userData?.anim) {
        stateRef.current.character.userData.anim.update(delta, false, 0);
      }

      // Landmarks halo rotations
      Object.values(stateRef.current.landmarksMap).forEach((item) => {
        item.haloParts.forEach((part, idx) => {
          part.rotation.y = time * (0.8 + idx * 0.3);
        });
      });

      // Flying traffic along air lanes
      stateRef.current.trafficStreams.forEach((car) => {
        car.userData.angle += car.userData.speed * delta;
        const rad = car.userData.radius;
        car.position.x = Math.sin(car.userData.angle) * rad;
        car.position.z = Math.cos(car.userData.angle) * rad;
        car.position.y = car.userData.altitude;
        car.rotation.y = car.userData.angle + Math.PI / 2;
      });

      // Drifting motes
      const mArray = moteGeo.attributes.position.array;
      for (let p = 0; p < moteCount; p++) {
        mArray[p * 3 + 1] += 0.14;
        if (mArray[p * 3 + 1] > 85) mArray[p * 3 + 1] = 0;
      }
      moteGeo.attributes.position.needsUpdate = true;

      // ========================================================
      // CAMERA SYSTEM: OPENING vs TRAVEL vs STATIONARY
      // ========================================================
      if (isOpeningCinematic) {
        // High altitude sweep descending into the central district
        const progress = Math.min(time / 6.0, 1.0);
        camera.position.x = Math.sin(time * 0.15) * 30;
        camera.position.y = THREE.MathUtils.lerp(80, 24, progress);
        camera.position.z = THREE.MathUtils.lerp(140, 52, progress);
        camera.lookAt(0, 4, 16);
      } else if (isTraveling) {
        // CINEMATIC TRAVELING: Autonomous hover vehicle glides along the elevated skyway
        const dest = DISTRICT_NODES.find((d) => d.id === targetDistrictId) || DISTRICT_NODES[0];
        const t = Math.min(travelProgress / 100, 1.0);

        // Smooth easeInOut cubic curve
        const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        // Curve trajectory from start to destination
        const midPoint = new THREE.Vector3()
          .addVectors(stateRef.current.startCamPos, dest.camPos)
          .multiplyScalar(0.5);
        midPoint.y += 10; // arc up slightly for dramatic skyline view

        // Quadratic bezier interpolation
        const currentPos = new THREE.Vector3();
        currentPos.x = (1 - easeT) * (1 - easeT) * stateRef.current.startCamPos.x + 2 * (1 - easeT) * easeT * midPoint.x + easeT * easeT * dest.camPos.x;
        currentPos.y = (1 - easeT) * (1 - easeT) * stateRef.current.startCamPos.y + 2 * (1 - easeT) * easeT * midPoint.y + easeT * easeT * dest.camPos.y;
        currentPos.z = (1 - easeT) * (1 - easeT) * stateRef.current.startCamPos.z + 2 * (1 - easeT) * easeT * midPoint.z + easeT * easeT * dest.camPos.z;

        const currentTarget = new THREE.Vector3().lerpVectors(stateRef.current.startLookAt, dest.lookAt, easeT);

        camera.position.copy(currentPos);
        camera.lookAt(currentTarget);

        // Update transit vehicle position along the route
        if (stateRef.current.transitVehicle) {
          const vehPos = new THREE.Vector3().lerpVectors(
            stateRef.current.startCamPos.clone().sub(new THREE.Vector3(0, 4, 8)),
            dest.pos.clone().add(new THREE.Vector3(0, 2, 8)),
            easeT
          );
          stateRef.current.transitVehicle.position.copy(vehPos);
          stateRef.current.transitVehicle.lookAt(dest.pos);
        }

        stateRef.current.currentCamPos.copy(currentPos);
        stateRef.current.currentLookAt.copy(currentTarget);
      } else {
        // STATIONARY DISTRICT INSPECTION
        const dest = DISTRICT_NODES.find((d) => d.id === targetDistrictId) || DISTRICT_NODES[0];
        const desiredPos = dest.camPos.clone();
        desiredPos.x += Math.sin(stateRef.current.orbitOffset.x) * 12;
        desiredPos.z += Math.cos(stateRef.current.orbitOffset.x) * 12 - 12;
        desiredPos.y += stateRef.current.orbitOffset.y * 10;

        stateRef.current.currentCamPos.lerp(desiredPos, reducedMotion ? 0.2 : 0.05);
        stateRef.current.currentLookAt.lerp(dest.lookAt, reducedMotion ? 0.2 : 0.05);

        camera.position.copy(stateRef.current.currentCamPos);
        camera.lookAt(stateRef.current.currentLookAt);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion, isOpeningCinematic, isTraveling, targetDistrictId, onSelectDistrict]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
