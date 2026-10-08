import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCuteCharacter } from './CuteCharacter';
import { soundManager } from '../utils/soundManager';

// 7 Landmark Buildings in the Radial Central Plaza
export const CUTE_BUILDINGS = [
  {
    id: 'education',
    name: 'EDUCATION',
    subtitle: 'University Tower',
    emoji: '🎓',
    pos: new THREE.Vector3(0, 0, -32),
    color: 0x818cf8, // soft lavender/indigo
    accent: 0xa5b4fc,
    roofColor: 0x4f46e5,
    icon: '🎓'
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    subtitle: 'Creative Tech Studio',
    emoji: '💻',
    pos: new THREE.Vector3(26, 0, -18),
    color: 0x06b6d4, // bright pastel cyan
    accent: 0x67e8f9,
    roofColor: 0x0891b2,
    icon: '💻'
  },
  {
    id: 'lab',
    name: 'TECH LAB',
    subtitle: 'Science & Code Lab',
    emoji: '🧪',
    pos: new THREE.Vector3(-26, 0, -18),
    color: 0xa855f7, // soft friendly purple
    accent: 0xd8b4fe,
    roofColor: 0x7e22ce,
    icon: '🧪'
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    subtitle: 'Modern Office Tower',
    emoji: '💼',
    pos: new THREE.Vector3(-30, 0, 14),
    color: 0xfb923c, // warm peach / orange
    accent: 0xfed7aa,
    roofColor: 0xea580c,
    icon: '💼'
  },
  {
    id: 'vault',
    name: 'ACHIEVEMENTS',
    subtitle: 'Golden Trophy Tower',
    emoji: '🏆',
    pos: new THREE.Vector3(30, 0, 14),
    color: 0xfacc15, // warm golden yellow
    accent: 0xfef08a,
    roofColor: 0xca8a04,
    icon: '🏆'
  },
  {
    id: 'certifications',
    name: 'CERTIFICATIONS',
    subtitle: 'Cute Library Archive',
    emoji: '📜',
    pos: new THREE.Vector3(-16, 0, 32),
    color: 0x10b981, // mint / emerald pastel
    accent: 0x6ee7b7,
    roofColor: 0x059669,
    icon: '📜'
  },
  {
    id: 'contact',
    name: 'CONTACT',
    subtitle: 'Communication Tower',
    emoji: '📡',
    pos: new THREE.Vector3(16, 0, 32),
    color: 0xf43f5e, // soft rose / pink
    accent: 0xfda4af,
    roofColor: 0xe11d48,
    icon: '📡'
  }
];

export default function City3D({
  activeBuilding,
  onSelectBuilding,
  onHoverBuilding,
  reducedMotion
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    guideCharacter: null,
    buildingGroups: {},
    interactiveMeshes: [],
    clouds: [],
    cars: [],
    animatedDecor: [],
    camTarget: new THREE.Vector3(0, 3, 0),
    desiredCamPos: new THREE.Vector3(0, 36, 48), // cozy isometric wide establishing shot
    currentCamPos: new THREE.Vector3(0, 36, 48),
    currentCamTarget: new THREE.Vector3(0, 3, 0),
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    orbitAngle: 0,
    orbitPitch: 0.55,
    hoveredId: null
  });

  // Camera navigation when activeBuilding changes
  useEffect(() => {
    if (activeBuilding === 'city' || !activeBuilding) {
      // Return to Wide Plaza View
      stateRef.current.desiredCamPos.set(0, 34, 46);
      stateRef.current.camTarget.set(0, 2, 0);
    } else {
      const b = CUTE_BUILDINGS.find((item) => item.id === activeBuilding);
      if (b) {
        // Fly directly toward the building with a cozy angled front view
        const dir = b.pos.clone().normalize();
        const camOffset = dir.clone().multiplyScalar(14).add(new THREE.Vector3(0, 11, 0));
        stateRef.current.desiredCamPos.copy(b.pos).add(camOffset);
        stateRef.current.camTarget.copy(b.pos).add(new THREE.Vector3(0, 5, 0));
      }
    }
  }, [activeBuilding]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdceefb); // Soft pastel morning sky
    scene.fog = new THREE.FogExp2(0xdceefb, 0.008);
    stateRef.current.scene = scene;

    // --- CAMERA SETUP ---
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 36, 48);
    camera.lookAt(0, 2, 0);
    stateRef.current.camera = camera;

    // --- RENDERER SETUP ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // --- COZY LIGHTING ---
    const hemiLight = new THREE.HemisphereLight(0xfffbf0, 0xdcf0fa, 1.4);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfff7e6, 2.2);
    sunLight.position.set(45, 80, 45);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 200;
    const shadowR = 60;
    sunLight.shadow.camera.left = -shadowR;
    sunLight.shadow.camera.right = shadowR;
    sunLight.shadow.camera.top = shadowR;
    sunLight.shadow.camera.bottom = -shadowR;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Soft sky rim light
    const skyFill = new THREE.DirectionalLight(0xbae6fd, 0.8);
    skyFill.position.set(-45, 60, -45);
    scene.add(skyFill);

    // --- GROUND ISLAND: SOFT MINT PARK & COBBLESTONE PATHS ---
    const islandGeo = new THREE.CylinderGeometry(62, 66, 4, 64);
    const islandMat = new THREE.MeshStandardMaterial({
      color: 0xebf7ee, // fresh soft mint grass
      roughness: 0.8,
      metalness: 0.05
    });
    const island = new THREE.Mesh(islandGeo, islandMat);
    island.position.y = -2;
    island.receiveShadow = true;
    scene.add(island);

    // Island Earth base
    const earthBase = new THREE.Mesh(
      new THREE.CylinderGeometry(66, 68, 6, 64),
      new THREE.MeshStandardMaterial({ color: 0x94725c, roughness: 0.9 })
    );
    earthBase.position.y = -6;
    scene.add(earthBase);

    // Water surrounding ring
    const water = new THREE.Mesh(
      new THREE.RingGeometry(64, 180, 64),
      new THREE.MeshStandardMaterial({
        color: 0x7dd3fc,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85
      })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -3.8;
    scene.add(water);

    // --- CENTRAL CITY PLAZA (COBBLESTONE CIRCLE) ---
    const plaza = new THREE.Mesh(
      new THREE.CircleGeometry(16, 48),
      new THREE.MeshStandardMaterial({
        color: 0xfdf4ec, // warm cream stone
        roughness: 0.7
      })
    );
    plaza.rotation.x = -Math.PI / 2;
    plaza.position.y = 0.02;
    plaza.receiveShadow = true;
    scene.add(plaza);

    // Plaza outer border ring
    const plazaRing = new THREE.Mesh(
      new THREE.RingGeometry(15.8, 16.5, 48),
      new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.6 })
    );
    plazaRing.rotation.x = -Math.PI / 2;
    plazaRing.position.y = 0.03;
    scene.add(plazaRing);

    // Cobblestone roads leading from Plaza to each building
    CUTE_BUILDINGS.forEach((b) => {
      const roadLength = b.pos.length() - 8;
      const roadGeo = new THREE.PlaneGeometry(5.5, roadLength);
      const roadMat = new THREE.MeshStandardMaterial({
        color: 0xfef9f3,
        roughness: 0.7
      });
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      const angle = Math.atan2(b.pos.x, b.pos.z);
      road.rotation.z = -angle;

      const midPoint = b.pos.clone().multiplyScalar(0.48);
      road.position.set(midPoint.x, 0.025, midPoint.z);
      road.receiveShadow = true;
      scene.add(road);
    });

    // --- CENTRAL PLAZA FOUNTAIN ---
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(0, 0, 0);

    const basin = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 4.0, 1.0, 32),
      new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.4 })
    );
    basin.position.y = 0.5;
    basin.castShadow = true;
    basin.receiveShadow = true;
    fountainGroup.add(basin);

    const fountainWater = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.3 })
    );
    fountainWater.position.y = 0.95;
    fountainGroup.add(fountainWater);

    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 1.0, 2.2, 16),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
    );
    pillar.position.y = 1.6;
    pillar.castShadow = true;
    fountainGroup.add(pillar);

    // Glowing cute gem on top of fountain
    const gem = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.7),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.4 })
    );
    gem.position.y = 3.0;
    fountainGroup.add(gem);
    scene.add(fountainGroup);

    // --- CUTE GUIDE CHARACTER (NAJHA GUIDE) IN PLAZA ---
    const guideCharacter = createCuteCharacter();
    guideCharacter.position.set(0, 0, 4.2);
    guideCharacter.rotation.y = 0; // facing front
    scene.add(guideCharacter);
    stateRef.current.guideCharacter = guideCharacter;

    // --- PLAZA BENCHES & FLOWER PLANTERS ---
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const bx = Math.sin(angle) * 9.5;
      const bz = Math.cos(angle) * 9.5;

      // Planter
      const planter = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.0, 0.8, 16),
        new THREE.MeshStandardMaterial({ color: 0xffedd5, roughness: 0.6 })
      );
      planter.position.set(bx, 0.4, bz);
      planter.castShadow = true;
      scene.add(planter);

      // Flowers
      const flowerColor = i % 2 === 0 ? 0xf472b6 : 0xfacc15;
      const flowers = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 12, 12),
        new THREE.MeshStandardMaterial({ color: flowerColor, roughness: 0.5 })
      );
      flowers.position.set(bx, 1.0, bz);
      scene.add(flowers);
    }

    // --- POPULATE THE 7 DISTINCT BUILDINGS ---
    const interactiveMeshes = [];
    const buildingGroups = {};

    function makeSignCanvas(emoji, name) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');

      // Rounded pill badge
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(10, 10, 492, 160, 40);
      ctx.fill();

      // Border
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#38bdf8';
      ctx.stroke();

      // Text
      ctx.font = 'bold 58px sans-serif';
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${emoji} ${name}`, 256, 90);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    CUTE_BUILDINGS.forEach((b) => {
      const bGroup = new THREE.Group();
      bGroup.position.copy(b.pos);
      bGroup.userData = { buildingId: b.id, name: b.name };
      scene.add(bGroup);

      // Unique architecture per building:
      let mainBody;
      let roof;

      if (b.id === 'education') {
        // Cute university with clock/spire & arched wings
        mainBody = new THREE.Mesh(
          new THREE.BoxGeometry(10, 14, 9),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 7;
        roof = new THREE.Mesh(
          new THREE.ConeGeometry(5.5, 8, 4),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 18;
        roof.rotation.y = Math.PI / 4;

        // Graduation cap ornament
        const cap = new THREE.Mesh(
          new THREE.BoxGeometry(3.5, 0.4, 3.5),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b })
        );
        cap.position.y = 22.5;
        bGroup.add(cap);
      } else if (b.id === 'projects') {
        // Creative tech studio: staggered pastel cubes & screens
        mainBody = new THREE.Mesh(
          new THREE.BoxGeometry(11, 12, 10),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 6;
        roof = new THREE.Mesh(
          new THREE.BoxGeometry(9, 4, 8),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 14;

        // Giant floating code screen
        const screen = new THREE.Mesh(
          new THREE.BoxGeometry(4.5, 2.8, 0.4),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
        );
        screen.position.set(0, 18, 0);
        bGroup.add(screen);
      } else if (b.id === 'lab') {
        // Cute science dome laboratory
        mainBody = new THREE.Mesh(
          new THREE.CylinderGeometry(5.5, 6.0, 10, 24),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 5;
        roof = new THREE.Mesh(
          new THREE.SphereGeometry(5.2, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.2, transparent: true, opacity: 0.9 })
        );
        roof.position.y = 10;
      } else if (b.id === 'experience') {
        // Stepped cute office tower
        mainBody = new THREE.Mesh(
          new THREE.BoxGeometry(8.5, 16, 8.5),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 8;
        roof = new THREE.Mesh(
          new THREE.BoxGeometry(6.5, 3.5, 6.5),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 17.5;
      } else if (b.id === 'vault') {
        // Trophy tower with golden cup on top
        mainBody = new THREE.Mesh(
          new THREE.CylinderGeometry(5.0, 5.8, 12, 16),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 6;
        roof = new THREE.Mesh(
          new THREE.ConeGeometry(5.2, 5, 16),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 14.5;

        // Big golden trophy on roof
        const trophy = new THREE.Mesh(
          new THREE.DodecahedronGeometry(2.0),
          new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.7, roughness: 0.2 })
        );
        trophy.position.y = 18.5;
        bGroup.add(trophy);
      } else if (b.id === 'certifications') {
        // Cute library / archive with column portico
        mainBody = new THREE.Mesh(
          new THREE.BoxGeometry(9.5, 11, 8.5),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 5.5;
        roof = new THREE.Mesh(
          new THREE.ConeGeometry(6.0, 4.5, 4),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 13.2;
        roof.rotation.y = Math.PI / 4;
      } else {
        // Contact communication tower with antenna
        mainBody = new THREE.Mesh(
          new THREE.CylinderGeometry(4.2, 5.0, 13, 16),
          new THREE.MeshStandardMaterial({ color: b.color, roughness: 0.4 })
        );
        mainBody.position.y = 6.5;
        roof = new THREE.Mesh(
          new THREE.ConeGeometry(4.4, 5, 16),
          new THREE.MeshStandardMaterial({ color: b.roofColor, roughness: 0.3 })
        );
        roof.position.y = 15.5;

        // Antenna mast
        const mast = new THREE.Mesh(
          new THREE.CylinderGeometry(0.3, 0.3, 7, 8),
          new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 })
        );
        mast.position.y = 20.5;
        bGroup.add(mast);

        const dish = new THREE.Mesh(
          new THREE.SphereGeometry(1.2, 16, 8, 0, Math.PI),
          new THREE.MeshStandardMaterial({ color: 0xffffff })
        );
        dish.position.y = 23;
        dish.rotation.x = Math.PI / 2;
        bGroup.add(dish);
      }

      mainBody.castShadow = true;
      mainBody.receiveShadow = true;
      bGroup.add(mainBody);

      if (roof) {
        roof.castShadow = true;
        bGroup.add(roof);
      }

      // Windows (warm lit little square windows)
      for (let w = 0; w < 4; w++) {
        const win = new THREE.Mesh(
          new THREE.PlaneGeometry(1.4, 1.4),
          new THREE.MeshBasicMaterial({ color: 0xffedd5 })
        );
        win.position.set(-2.2 + (w % 2) * 4.4, 4 + Math.floor(w / 2) * 4, 4.8);
        bGroup.add(win);
      }

      // LARGE, READABLE FLOATING SIGN FACING THE PLAZA
      const signTex = makeSignCanvas(b.emoji, b.name);
      const signMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(8.5, 3.0),
        new THREE.MeshBasicMaterial({ map: signTex, transparent: true, side: THREE.DoubleSide })
      );
      signMesh.position.set(0, 19.5, 0);

      // Rotate sign to always face the central plaza
      const angleToCenter = Math.atan2(-b.pos.x, -b.pos.z);
      signMesh.rotation.y = angleToCenter;
      bGroup.add(signMesh);

      // Large invisible click/tap hitbox for easy selection
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(14, 24, 14),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.position.y = 12;
      hitBox.userData = { buildingId: b.id, name: b.name };
      bGroup.add(hitBox);
      interactiveMeshes.push(hitBox);

      buildingGroups[b.id] = { group: bGroup, sign: signMesh, basePos: b.pos.clone() };
    });

    stateRef.current.interactiveMeshes = interactiveMeshes;
    stateRef.current.buildingGroups = buildingGroups;

    // --- CUTE STYLIZED TREES & FLOWERS AROUND ROADS ---
    const treeGeo = new THREE.DodecahedronGeometry(1.8, 1);
    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.45, 2.2, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x854d0e, roughness: 0.8 });

    for (let t = 0; t < 28; t++) {
      const angle = (t / 28) * Math.PI * 2 + Math.random() * 0.15;
      const dist = 20 + Math.random() * 32;
      const x = Math.sin(angle) * dist;
      const z = Math.cos(angle) * dist;

      // Don't collide with buildings
      const nearB = CUTE_BUILDINGS.some((b) => b.pos.distanceTo(new THREE.Vector3(x, 0, z)) < 8);
      if (nearB) continue;

      const tree = new THREE.Group();
      tree.position.set(x, 0, z);

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = 1.1;
      trunk.castShadow = true;
      tree.add(trunk);

      // Cherry blossom pink or mint green foliage
      const leafColor = t % 3 === 0 ? 0xfbcfe8 : 0x86efac;
      const leaves = new THREE.Mesh(
        treeGeo,
        new THREE.MeshStandardMaterial({ color: leafColor, roughness: 0.6 })
      );
      leaves.position.y = 2.8;
      leaves.castShadow = true;
      tree.add(leaves);

      scene.add(tree);
    }

    // --- CUTE CLOUDS DRIFTING SLOWLY ---
    const clouds = [];
    for (let c = 0; c < 8; c++) {
      const cloud = new THREE.Group();
      for (let s = 0; s < 4; s++) {
        const puff = new THREE.Mesh(
          new THREE.SphereGeometry(3.5 + Math.random() * 2, 12, 12),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
        );
        puff.position.set(s * 3.5 - 5, Math.random() * 1.5, Math.random() * 2);
        cloud.add(puff);
      }
      cloud.position.set(
        (Math.random() - 0.5) * 160,
        35 + Math.random() * 18,
        (Math.random() - 0.5) * 160
      );
      cloud.userData = { speed: 0.08 + Math.random() * 0.08 };
      scene.add(cloud);
      clouds.push(cloud);
    }
    stateRef.current.clouds = clouds;

    // --- LITTLE PASTEL CARS MOVING IN LOOP ---
    const cars = [];
    for (let k = 0; k < 4; k++) {
      const carGroup = new THREE.Group();
      const carColor = [0x38bdf8, 0xf472b6, 0xfacc15, 0x4ade80][k];

      const carBody = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 1.0, 3.5),
        new THREE.MeshStandardMaterial({ color: carColor, roughness: 0.4 })
      );
      carBody.position.y = 0.8;
      carGroup.add(carBody);

      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.9, 1.8),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
      );
      cabin.position.set(0, 1.7, -0.2);
      carGroup.add(cabin);

      carGroup.userData = {
        radius: 44,
        angle: (k * Math.PI) / 2,
        speed: 0.35
      };
      scene.add(carGroup);
      cars.push(carGroup);
    }
    stateRef.current.cars = cars;

    // --- RAYCASTING & CLICK / HOVER HANDLING ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getRaycastBuilding = (event) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(stateRef.current.interactiveMeshes, true);
      if (hits.length > 0) {
        return hits[0].object.userData.buildingId;
      }
      return null;
    };

    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      // Dragging orbits the camera gently around the plaza
      if (stateRef.current.isDragging && (!activeBuilding || activeBuilding === 'city')) {
        const dx = e.clientX - stateRef.current.dragStart.x;
        const dy = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.orbitAngle += dx * 0.006;
        stateRef.current.orbitPitch = Math.max(
          0.25,
          Math.min(1.1, stateRef.current.orbitPitch + dy * 0.004)
        );
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }

      // Check hover
      const bId = getRaycastBuilding(e);
      if (bId !== stateRef.current.hoveredId) {
        stateRef.current.hoveredId = bId;
        container.style.cursor = bId ? 'pointer' : 'default';
        if (bId) soundManager.playHover();
        onHoverBuilding(bId);
      }
    };

    const handlePointerUp = (e) => {
      stateRef.current.isDragging = false;
    };

    const handleClick = (e) => {
      const bId = getRaycastBuilding(e);
      if (bId) {
        soundManager.playClick();
        onSelectBuilding(bId);
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

      // Guide character animation
      if (stateRef.current.guideCharacter?.userData?.anim) {
        stateRef.current.guideCharacter.userData.anim.update(delta);
      }

      // Gem rotation on fountain
      gem.rotation.y = time * 0.8;
      gem.position.y = 3.0 + Math.sin(time * 2) * 0.15;

      // Drifting clouds
      stateRef.current.clouds.forEach((cl) => {
        cl.position.x += cl.userData.speed;
        if (cl.position.x > 80) cl.position.x = -80;
      });

      // Moving cars along perimeter loop
      stateRef.current.cars.forEach((car) => {
        car.userData.angle += car.userData.speed * delta;
        const rad = car.userData.radius;
        car.position.x = Math.sin(car.userData.angle) * rad;
        car.position.z = Math.cos(car.userData.angle) * rad;
        car.rotation.y = car.userData.angle + Math.PI / 2;
      });

      // Hover feedback: smooth scale on hovered building
      Object.entries(stateRef.current.buildingGroups).forEach(([id, item]) => {
        const isHovered = stateRef.current.hoveredId === id;
        const targetScale = isHovered ? 1.05 : 1.0;
        item.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // Sign gentle float
        item.sign.position.y = 19.5 + Math.sin(time * 2 + (id.length)) * 0.25;
      });

      // Camera Orbit logic in wide City view
      if (!activeBuilding || activeBuilding === 'city') {
        const orbitDist = 52;
        const targetX = Math.sin(stateRef.current.orbitAngle) * orbitDist * Math.cos(stateRef.current.orbitPitch);
        const targetZ = Math.cos(stateRef.current.orbitAngle) * orbitDist * Math.cos(stateRef.current.orbitPitch);
        const targetY = 16 + Math.sin(stateRef.current.orbitPitch) * 28;

        stateRef.current.desiredCamPos.set(targetX, targetY, targetZ);
        stateRef.current.camTarget.set(0, 3, 0);
      }

      // Smooth camera interpolation
      const lerpSpeed = reducedMotion ? 0.15 : 0.055;
      stateRef.current.currentCamPos.lerp(stateRef.current.desiredCamPos, lerpSpeed);
      stateRef.current.currentCamTarget.lerp(stateRef.current.camTarget, lerpSpeed);

      camera.position.copy(stateRef.current.currentCamPos);
      camera.lookAt(stateRef.current.currentCamTarget);

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
  }, [reducedMotion, onSelectBuilding, onHoverBuilding, activeBuilding]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
