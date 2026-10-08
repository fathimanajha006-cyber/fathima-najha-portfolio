import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCyberCharacter, createArcadePerch } from './CyberCharacter';
import { soundManager } from '../utils/soundManager';

// 7 Landmark District Coordinates & Colors in the Open City
const LANDMARKS = [
  {
    id: 'education',
    name: 'EDUCATION',
    title: 'EDUCATION TOWER',
    pos: new THREE.Vector3(-45, 0, 25),
    color: 0x38bdf8,
    labelColor: '#38bdf8'
  },
  {
    id: 'projects',
    name: 'PROJECTS',
    title: 'PROJECTS RESEARCH FACILITY',
    pos: new THREE.Vector3(45, 0, 25),
    color: 0x00ffcc,
    labelColor: '#00ffcc'
  },
  {
    id: 'lab',
    name: 'TECH LAB',
    title: 'TECH LAB FACILITY',
    pos: new THREE.Vector3(-48, 0, -35),
    color: 0xa855f7,
    labelColor: '#a855f7'
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    title: 'EXPERIENCE TOWER',
    pos: new THREE.Vector3(48, 0, -35),
    color: 0x00ffcc,
    labelColor: '#00ffcc'
  },
  {
    id: 'vault',
    name: 'ACHIEVEMENTS',
    title: 'ACHIEVEMENT VAULT',
    pos: new THREE.Vector3(0, 0, -65),
    color: 0xf59e0b,
    labelColor: '#f59e0b'
  },
  {
    id: 'certifications',
    name: 'CERTIFICATIONS',
    title: 'CERTIFICATION ARCHIVE',
    pos: new THREE.Vector3(-24, 0, 65),
    color: 0x06b6d4,
    labelColor: '#06b6d4'
  },
  {
    id: 'contact',
    name: 'CONTACT',
    title: 'COMMUNICATION TOWER',
    pos: new THREE.Vector3(24, 0, 65),
    color: 0xf43f5e,
    labelColor: '#f43f5e'
  }
];

export default function City3D({
  activeDistrict,
  onSelectDistrict,
  onNearbyBuilding,
  reducedMotion,
  isIntroPlaying
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    player: {
      pos: new THREE.Vector3(0, 0, 18),
      velocity: new THREE.Vector3(),
      yaw: 0,
      pitch: -0.1,
      speed: 18,
      isMoving: false
    },
    keys: { w: false, a: false, s: false, d: false, shift: false },
    character: null,
    arcadePerch: null,
    landmarksMap: {},
    animatedElements: [],
    flyingTraffic: [],
    nearbyBuildingId: null,
    isDragging: false,
    dragStart: { x: 0, y: 0 }
  });

  // Handle building selection via keyboard / HUD
  useEffect(() => {
    if (activeDistrict !== 'city') {
      const landmark = LANDMARKS.find((l) => l.id === activeDistrict);
      if (landmark) {
        soundManager.playWarp();
      }
    }
  }, [activeDistrict]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020409);
    scene.fog = new THREE.FogExp2(0x020409, 0.011);
    stateRef.current.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      58,
      container.clientWidth / container.clientHeight,
      0.1,
      1200
    );
    camera.position.set(0, 8, 30);
    stateRef.current.camera = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0c172e, 2.8);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    moonLight.position.set(60, 120, 60);
    scene.add(moonLight);

    const warmRim = new THREE.DirectionalLight(0xff5500, 1.2);
    warmRim.position.set(-60, 80, -60);
    scene.add(warmRim);

    // --- WET CYBER ASPHALT GROUND ---
    const groundGeo = new THREE.PlaneGeometry(400, 400, 60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050914,
      roughness: 0.22,
      metalness: 0.92
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Glowing Road Grid & Crossings
    const roadGrid = new THREE.GridHelper(400, 80, 0x00ffcc, 0x0a1a38);
    roadGrid.position.y = 0.04;
    scene.add(roadGrid);

    // Concentric cyber plaza rings
    for (let r of [22, 50, 85, 125]) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r - 0.25, r + 0.25, 64),
        new THREE.MeshBasicMaterial({
          color: r === 50 ? 0xff0055 : 0x00ffcc,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.4
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.06;
      scene.add(ring);
    }

    // --- CHARACTER & INTRO PERCH (REFERENCE 2) ---
    const character = createCyberCharacter();
    scene.add(character);
    stateRef.current.character = character;

    const perch = createArcadePerch();
    perch.position.set(0, 0, 16);
    scene.add(perch);
    stateRef.current.arcadePerch = perch;

    // Initial character sits on perch during intro
    character.position.set(0, 2.3, 16);
    if (character.userData.anim?.setSitting) {
      character.userData.anim.setSitting(true);
    }

    // --- BUILD 7 DISTINCT ARCHITECTURAL LANDMARKS ---
    const landmarksMap = {};

    function createMarqueeTexture(title, sub, colorHex) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 160;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#030814';
      ctx.fillRect(0, 0, 512, 160);
      ctx.strokeStyle = colorHex;
      ctx.lineWidth = 6;
      ctx.strokeRect(6, 6, 500, 148);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 38px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(title, 256, 75);
      ctx.font = '600 20px monospace';
      ctx.fillStyle = colorHex;
      ctx.fillText(sub, 256, 120);

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    }

    LANDMARKS.forEach((land) => {
      const group = new THREE.Group();
      group.position.copy(land.pos);
      scene.add(group);

      let coreMesh = null;
      let haloRings = [];

      // 1. EDUCATION: University Spire with crystalline wings
      if (land.id === 'education') {
        const spire = new THREE.Mesh(
          new THREE.ConeGeometry(4.5, 42, 6),
          new THREE.MeshStandardMaterial({
            color: 0x071e3d,
            emissive: land.color,
            emissiveIntensity: 0.35,
            metalness: 0.8
          })
        );
        spire.position.y = 21;
        group.add(spire);
        coreMesh = spire;

        // Wing monoliths
        for (let sign of [-1, 1]) {
          const wing = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 26, 4.5),
            new THREE.MeshStandardMaterial({ color: 0x061426, metalness: 0.8 })
          );
          wing.position.set(sign * 7.5, 13, 0);
          group.add(wing);
        }

        // Revolving rings
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(8, 0.15, 16, 48),
          new THREE.MeshBasicMaterial({ color: land.color })
        );
        ring.position.y = 26;
        ring.rotation.x = Math.PI / 3;
        group.add(ring);
        haloRings.push(ring);
      }

      // 2. PROJECTS: Giant Technology Research Facility with dual arches & bridge
      else if (land.id === 'projects') {
        const pillar1 = new THREE.Mesh(
          new THREE.BoxGeometry(5, 46, 5),
          new THREE.MeshStandardMaterial({ color: 0x081c24, emissive: land.color, emissiveIntensity: 0.3 })
        );
        pillar1.position.set(-7, 23, 0);
        group.add(pillar1);

        const pillar2 = new THREE.Mesh(
          new THREE.BoxGeometry(5, 46, 5),
          new THREE.MeshStandardMaterial({ color: 0x081c24, emissive: land.color, emissiveIntensity: 0.3 })
        );
        pillar2.position.set(7, 23, 0);
        group.add(pillar2);

        const bridge = new THREE.Mesh(
          new THREE.BoxGeometry(20, 4, 6),
          new THREE.MeshStandardMaterial({ color: 0x0b2533, metalness: 0.85 })
        );
        bridge.position.set(0, 38, 0);
        group.add(bridge);
        coreMesh = bridge;

        // Pulsing floating energy core in the center
        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(3.5, 1),
          new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true })
        );
        core.position.set(0, 24, 0);
        group.add(core);
        haloRings.push(core);
      }

      // 3. TECH LAB: Glowing Laboratory with floating polyhedrons
      else if (land.id === 'lab') {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(7, 9, 14, 6),
          new THREE.MeshStandardMaterial({ color: 0x120822, metalness: 0.85 })
        );
        base.position.y = 7;
        group.add(base);

        const crystal = new THREE.Mesh(
          new THREE.OctahedronGeometry(5.2),
          new THREE.MeshStandardMaterial({
            color: 0xa855f7,
            emissive: land.color,
            emissiveIntensity: 0.5,
            wireframe: true
          })
        );
        crystal.position.y = 23;
        group.add(crystal);
        coreMesh = crystal;
        haloRings.push(crystal);
      }

      // 4. EXPERIENCE: Corporate Skyscraper with stepped sky-terraces
      else if (land.id === 'experience') {
        const tower = new THREE.Mesh(
          new THREE.BoxGeometry(9, 48, 9),
          new THREE.MeshStandardMaterial({
            color: 0x051a24,
            emissive: land.color,
            emissiveIntensity: 0.25,
            metalness: 0.85
          })
        );
        tower.position.y = 24;
        group.add(tower);
        coreMesh = tower;

        for (let i = 0; i < 3; i++) {
          const terrace = new THREE.Mesh(
            new THREE.BoxGeometry(11 - i * 1.5, 1.5, 11 - i * 1.5),
            new THREE.MeshBasicMaterial({ color: land.color })
          );
          terrace.position.y = 16 + i * 12;
          group.add(terrace);
        }
      }

      // 5. ACHIEVEMENTS: Vault & Trophy Dome
      else if (land.id === 'vault') {
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(8, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({
            color: 0x241804,
            emissive: land.color,
            emissiveIntensity: 0.35,
            wireframe: true
          })
        );
        group.add(dome);

        const trophy = new THREE.Mesh(
          new THREE.DodecahedronGeometry(3.5),
          new THREE.MeshBasicMaterial({ color: 0xf59e0b })
        );
        trophy.position.y = 12;
        group.add(trophy);
        coreMesh = trophy;
        haloRings.push(trophy);
      }

      // 6. CERTIFICATIONS: Holographic Cylinder Databank
      else if (land.id === 'certifications') {
        const cyl = new THREE.Mesh(
          new THREE.CylinderGeometry(5, 5, 34, 16),
          new THREE.MeshStandardMaterial({
            color: 0x041822,
            emissive: land.color,
            emissiveIntensity: 0.3,
            metalness: 0.85
          })
        );
        cyl.position.y = 17;
        group.add(cyl);
        coreMesh = cyl;

        for (let k = 0; k < 3; k++) {
          const r = new THREE.Mesh(
            new THREE.TorusGeometry(6.5, 0.15, 12, 32),
            new THREE.MeshBasicMaterial({ color: land.color })
          );
          r.position.y = 10 + k * 8;
          r.rotation.x = Math.PI / 2;
          group.add(r);
          haloRings.push(r);
        }
      }

      // 7. CONTACT: High-Altitude Transmission Spire
      else if (land.id === 'contact') {
        const mast = new THREE.Mesh(
          new THREE.CylinderGeometry(0.6, 2.5, 46, 8),
          new THREE.MeshStandardMaterial({
            color: 0x220914,
            emissive: land.color,
            emissiveIntensity: 0.4
          })
        );
        mast.position.y = 23;
        group.add(mast);
        coreMesh = mast;

        const dish = new THREE.Mesh(
          new THREE.CylinderGeometry(3.2, 0.4, 0.8, 16),
          new THREE.MeshBasicMaterial({ color: land.color })
        );
        dish.position.y = 38;
        dish.rotation.x = Math.PI / 4;
        group.add(dish);
        haloRings.push(dish);
      }

      // Marquee Neon Sign
      const marqueeTex = createMarqueeTexture(land.name, land.title, land.labelColor);
      const marquee = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 3.2),
        new THREE.MeshBasicMaterial({ map: marqueeTex, side: THREE.DoubleSide })
      );
      marquee.position.set(0, 18, 6.5);
      group.add(marquee);

      // Dedicated Beacon Point Light
      const beaconLight = new THREE.PointLight(land.color, 2, 45, 1.2);
      beaconLight.position.set(0, 14, 0);
      group.add(beaconLight);

      landmarksMap[land.id] = {
        group,
        coreMesh,
        haloRings,
        beaconLight,
        data: land
      };
    });

    stateRef.current.landmarksMap = landmarksMap;

    // --- PROCEDURAL SURROUNDING SKYSCRAPERS (DENSE HIGH-TECH METROPOLIS) ---
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0x060c18,
      roughness: 0.35,
      metalness: 0.85
    });

    for (let b = 0; b < 65; b++) {
      const angle = (b / 65) * Math.PI * 2 + Math.random() * 0.1;
      const dist = 38 + Math.random() * 95;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      // Don't overlap landmark plazas
      const overlapsLandmark = LANDMARKS.some((l) => l.pos.distanceTo(new THREE.Vector3(x, 0, z)) < 18);
      if (overlapsLandmark) continue;

      const w = 7 + Math.random() * 8;
      const d = 7 + Math.random() * 8;
      const h = 20 + Math.random() * 60;

      const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMat);
      box.position.set(x, h / 2, z);
      scene.add(box);

      // Glowing edge line
      const edges = new THREE.EdgesGeometry(box.geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({
          color: b % 3 === 0 ? 0x00ffcc : b % 3 === 1 ? 0x38bdf8 : 0xa855f7,
          transparent: true,
          opacity: 0.35
        })
      );
      line.position.copy(box.position);
      scene.add(line);
    }

    // --- FLYING TRAFFIC ALONG AIR HIGHWAYS ---
    const flyingTraffic = [];
    for (let f = 0; f < 24; f++) {
      const isRed = f % 2 === 0;
      const car = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.4, 3.0),
        new THREE.MeshBasicMaterial({ color: isRed ? 0xff0055 : 0x00ffcc })
      );
      const radius = 45 + (f % 5) * 16;
      const altitude = 18 + (f % 6) * 6;
      const speed = (0.2 + (f % 3) * 0.1) * (f % 2 === 0 ? 1 : -1);
      car.userData = { radius, altitude, speed, angle: Math.random() * Math.PI * 2 };
      scene.add(car);
      flyingTraffic.push(car);
    }
    stateRef.current.flyingTraffic = flyingTraffic;

    // --- CYBER RAIN & FLOATING MOTES ---
    const moteCount = 600;
    const moteGeo = new THREE.BufferGeometry();
    const motePos = new Float32Array(moteCount * 3);
    for (let m = 0; m < moteCount * 3; m += 3) {
      motePos[m] = (Math.random() - 0.5) * 240;
      motePos[m + 1] = Math.random() * 80;
      motePos[m + 2] = (Math.random() - 0.5) * 240;
    }
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const motes = new THREE.Points(
      moteGeo,
      new THREE.PointsMaterial({
        color: 0x00ffcc,
        size: 0.75,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      })
    );
    scene.add(motes);

    // --- KEYBOARD & MOUSE TRAVEL CONTROLLER ---
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') stateRef.current.keys.w = true;
      if (key === 's' || key === 'arrowdown') stateRef.current.keys.s = true;
      if (key === 'a' || key === 'arrowleft') stateRef.current.keys.a = true;
      if (key === 'd' || key === 'arrowright') stateRef.current.keys.d = true;
      if (e.shiftKey) stateRef.current.keys.shift = true;

      // Press 'E' to enter nearby building
      if (key === 'e' && stateRef.current.nearbyBuildingId) {
        soundManager.playClick();
        onSelectDistrict(stateRef.current.nearbyBuildingId);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') stateRef.current.keys.w = false;
      if (key === 's' || key === 'arrowdown') stateRef.current.keys.s = false;
      if (key === 'a' || key === 'arrowleft') stateRef.current.keys.a = false;
      if (key === 'd' || key === 'arrowright') stateRef.current.keys.d = false;
      if (!e.shiftKey) stateRef.current.keys.shift = false;
    };

    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (stateRef.current.isDragging) {
        const dx = e.clientX - stateRef.current.dragStart.x;
        const dy = e.clientY - stateRef.current.dragStart.y;
        stateRef.current.player.yaw -= dx * 0.004;
        stateRef.current.player.pitch = Math.max(
          -0.6,
          Math.min(0.6, stateRef.current.player.pitch - dy * 0.003)
        );
        stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // --- ANIMATION LOOP ---
    let frameId;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Animate halo rings
      Object.values(stateRef.current.landmarksMap).forEach((item) => {
        item.haloRings.forEach((r, idx) => {
          r.rotation.y = time * (0.8 + idx * 0.3);
          r.rotation.z = Math.sin(time) * 0.2;
        });
      });

      // Animate flying traffic
      stateRef.current.flyingTraffic.forEach((car) => {
        car.userData.angle += car.userData.speed * delta;
        const rad = car.userData.radius;
        car.position.x = Math.cos(car.userData.angle) * rad;
        car.position.z = Math.sin(car.userData.angle) * rad;
        car.position.y = car.userData.altitude;
        car.rotation.y = -car.userData.angle + (car.userData.speed > 0 ? 0 : Math.PI);
      });

      // Animate floating motes
      const mArray = moteGeo.attributes.position.array;
      for (let p = 0; p < moteCount; p++) {
        mArray[p * 3 + 1] += 0.15;
        if (mArray[p * 3 + 1] > 80) mArray[p * 3 + 1] = 0;
      }
      moteGeo.attributes.position.needsUpdate = true;

      // ========================================================
      // INTRO CINEMATIC vs OPEN STREET TRAVEL vs BUILDING INTERIOR
      // ========================================================
      if (isIntroPlaying) {
        // Dramatic establishing camera moving toward city entrance
        const introProgress = Math.min(time / 6.0, 1.0);
        camera.position.x = Math.sin(time * 0.2) * 20;
        camera.position.y = 12 + Math.cos(time * 0.2) * 4;
        camera.position.z = 32 - introProgress * 6;
        camera.lookAt(0, 3, 16);

        if (character.userData.anim) {
          character.userData.anim.update(delta, false, 0);
        }
      } else if (activeDistrict !== 'city') {
        // Inside building: Smooth cinematic camera focus on that building
        const targetLandmark = LANDMARKS.find((l) => l.id === activeDistrict);
        if (targetLandmark) {
          const desiredCamPos = targetLandmark.pos.clone().add(new THREE.Vector3(0, 18, 22));
          const desiredLookAt = targetLandmark.pos.clone().add(new THREE.Vector3(0, 14, 0));
          camera.position.lerp(desiredCamPos, 0.04);
          camera.lookAt(desiredLookAt);
        }
      } else {
        // FREE STREET EXPLORATION MODE (WASD + MOUSE)
        const p = stateRef.current.player;
        const keys = stateRef.current.keys;

        // Calculate move direction relative to camera yaw
        const moveDir = new THREE.Vector3();
        if (keys.w) moveDir.z -= 1;
        if (keys.s) moveDir.z += 1;
        if (keys.a) moveDir.x -= 1;
        if (keys.d) moveDir.x += 1;

        const isMoving = moveDir.lengthSq() > 0;
        p.isMoving = isMoving;

        if (isMoving) {
          moveDir.normalize();
          moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), p.yaw);

          const curSpeed = keys.shift ? p.speed * 1.8 : p.speed;
          p.pos.x += moveDir.x * curSpeed * delta;
          p.pos.z += moveDir.z * curSpeed * delta;

          // Keep player inside city bounds
          p.pos.x = Math.max(-120, Math.min(120, p.pos.x));
          p.pos.z = Math.max(-120, Math.min(120, p.pos.z));
        }

        // Update player character in third-person view
        character.position.set(p.pos.x, 0, p.pos.z);
        character.rotation.y = p.yaw + Math.PI;

        if (character.userData.anim) {
          character.userData.anim.setSitting(false);
          character.userData.anim.update(delta, isMoving, keys.shift ? 2 : 1);
        }

        // Third-person camera trailing player
        const camDist = 12;
        const camHeight = 5.5 + Math.sin(p.pitch) * 4;
        const targetCamX = p.pos.x + Math.sin(p.yaw) * camDist;
        const targetCamZ = p.pos.z + Math.cos(p.yaw) * camDist;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.1);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, camHeight, 0.1);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.1);

        const lookTarget = new THREE.Vector3(p.pos.x, 2.8, p.pos.z);
        camera.lookAt(lookTarget);

        // --- PROXIMITY DETECTION TO 7 LANDMARKS ---
        let closestBuilding = null;
        let minDistance = 26; // detection radius

        LANDMARKS.forEach((land) => {
          const dist = p.pos.distanceTo(land.pos);
          if (dist < minDistance) {
            closestBuilding = land;
            minDistance = dist;
          }

          // Light intensity reacts to proximity
          const mapItem = stateRef.current.landmarksMap[land.id];
          if (mapItem?.beaconLight) {
            const proximityFactor = Math.max(0, 1 - dist / 50);
            mapItem.beaconLight.intensity = 2.0 + proximityFactor * 4.0;
          }
        });

        if (closestBuilding) {
          if (stateRef.current.nearbyBuildingId !== closestBuilding.id) {
            stateRef.current.nearbyBuildingId = closestBuilding.id;
            soundManager.playHover();
            onNearbyBuilding({
              id: closestBuilding.id,
              name: closestBuilding.name,
              title: closestBuilding.title,
              dist: Math.round(minDistance)
            });
          }
        } else {
          if (stateRef.current.nearbyBuildingId !== null) {
            stateRef.current.nearbyBuildingId = null;
            onNearbyBuilding(null);
          }
        }
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
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [reducedMotion, isIntroPlaying, activeDistrict, onNearbyBuilding, onSelectDistrict]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ touchAction: 'none' }}
    />
  );
}
