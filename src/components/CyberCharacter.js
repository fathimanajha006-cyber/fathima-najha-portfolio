import * as THREE from 'three';

/**
 * Creates a stylized futuristic cyber robot character inspired by Reference 2:
 * Articulated chassis, glowing optic visor, cyber jacket/collar, and mechanical limbs.
 */
export function createCyberCharacter() {
  const characterGroup = new THREE.Group();
  characterGroup.name = 'CyberCharacter';

  // Materials
  const armorMat = new THREE.MeshStandardMaterial({
    color: 0x1e2430,
    metalness: 0.85,
    roughness: 0.25
  });

  const whitePlateMat = new THREE.MeshStandardMaterial({
    color: 0xf0f4f8,
    metalness: 0.4,
    roughness: 0.3
  });

  const jacketMat = new THREE.MeshStandardMaterial({
    color: 0x8b3a1a, // warm burnt orange / amber jacket inspired by reference 2
    roughness: 0.7,
    metalness: 0.1
  });

  const jointMat = new THREE.MeshStandardMaterial({
    color: 0x0a0f1d,
    metalness: 0.9,
    roughness: 0.2
  });

  const glowCyanMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc
  });

  const glowAmberMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00
  });

  // --- ROOT PIVOT ---
  const bodyRoot = new THREE.Group();
  characterGroup.add(bodyRoot);

  // --- HIPS & PELVIS ---
  const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.5), whitePlateMat);
  pelvis.position.y = 1.3;
  bodyRoot.add(pelvis);

  // --- TORSO / JACKET ---
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 0.6), jacketMat);
  torso.position.y = 2.0;
  bodyRoot.add(torso);

  // Chest arc reactor
  const chestLight = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), glowCyanMat);
  chestLight.rotation.x = Math.PI / 2;
  chestLight.position.set(0, 2.15, 0.32);
  bodyRoot.add(chestLight);

  // Jacket collar
  const collar = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.25, 0.45), jacketMat);
  collar.position.set(0, 2.6, 0);
  bodyRoot.add(collar);

  // --- HEAD & VISOR ---
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 2.85, 0);
  bodyRoot.add(headGroup);

  const headMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.5), whitePlateMat);
  headGroup.add(headMesh);

  // Sleek cyber visor
  const visorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.18, 0.1), glowCyanMat);
  visorMesh.position.set(0, 0.05, 0.26);
  headGroup.add(visorMesh);

  // Cap / Beanie (like reference 2)
  const capMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.34, 0.2, 16), armorMat);
  capMesh.position.set(0, 0.32, -0.05);
  capMesh.rotation.x = -0.15;
  headGroup.add(capMesh);

  const capBrim = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.25), armorMat);
  capBrim.position.set(0, 0.24, 0.26);
  capBrim.rotation.x = 0.2;
  headGroup.add(capBrim);

  // --- LEGS ---
  // Left Leg
  const leftLegGroup = new THREE.Group();
  leftLegGroup.position.set(-0.28, 1.25, 0);
  bodyRoot.add(leftLegGroup);

  const leftThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.6, 12), whitePlateMat);
  leftThigh.position.y = -0.3;
  leftLegGroup.add(leftThigh);

  const leftKnee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), jointMat);
  leftKnee.position.y = -0.6;
  leftLegGroup.add(leftKnee);

  const leftShin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.6, 12), armorMat);
  leftShin.position.y = -0.9;
  leftLegGroup.add(leftShin);

  const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.45), jointMat);
  leftFoot.position.set(0, -1.22, 0.1);
  leftLegGroup.add(leftFoot);

  // Right Leg
  const rightLegGroup = new THREE.Group();
  rightLegGroup.position.set(0.28, 1.25, 0);
  bodyRoot.add(rightLegGroup);

  const rightThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.6, 12), whitePlateMat);
  rightThigh.position.y = -0.3;
  rightLegGroup.add(rightThigh);

  const rightKnee = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), jointMat);
  rightKnee.position.y = -0.6;
  rightLegGroup.add(rightKnee);

  const rightShin = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.6, 12), armorMat);
  rightShin.position.y = -0.9;
  rightLegGroup.add(rightShin);

  const rightFoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.45), jointMat);
  rightFoot.position.set(0, -1.22, 0.1);
  rightLegGroup.add(rightFoot);

  // --- ARMS ---
  // Left Arm
  const leftArmGroup = new THREE.Group();
  leftArmGroup.position.set(-0.55, 2.3, 0);
  bodyRoot.add(leftArmGroup);

  const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.5, 12), jacketMat);
  leftUpperArm.position.y = -0.25;
  leftArmGroup.add(leftUpperArm);

  const leftElbow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), jointMat);
  leftElbow.position.y = -0.52;
  leftArmGroup.add(leftElbow);

  const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.45, 12), whitePlateMat);
  leftForearm.position.y = -0.76;
  leftArmGroup.add(leftForearm);

  // Right Arm
  const rightArmGroup = new THREE.Group();
  rightArmGroup.position.set(0.55, 2.3, 0);
  bodyRoot.add(rightArmGroup);

  const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.5, 12), jacketMat);
  rightUpperArm.position.y = -0.25;
  rightArmGroup.add(rightUpperArm);

  const rightElbow = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), jointMat);
  rightElbow.position.y = -0.52;
  rightArmGroup.add(rightElbow);

  const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.45, 12), whitePlateMat);
  rightForearm.position.y = -0.76;
  rightArmGroup.add(rightForearm);

  // Scale character nicely
  characterGroup.scale.set(1.4, 1.4, 1.4);

  // Animation controller
  const animController = {
    mode: 'idle', // 'idle' | 'walk' | 'sit'
    time: 0,
    update: (delta, isMoving = false, speed = 0) => {
      animController.time += delta;
      const t = animController.time;

      if (isMoving) {
        // Walking stride animation
        const walkCycle = t * 9;
        leftLegGroup.rotation.x = Math.sin(walkCycle) * 0.7;
        rightLegGroup.rotation.x = -Math.sin(walkCycle) * 0.7;
        leftArmGroup.rotation.x = -Math.sin(walkCycle) * 0.6;
        rightArmGroup.rotation.x = Math.sin(walkCycle) * 0.6;
        bodyRoot.position.y = Math.abs(Math.sin(walkCycle * 2)) * 0.08;
        headGroup.rotation.y = Math.sin(walkCycle * 0.5) * 0.06;
      } else {
        // Idle breathing and head gaze
        leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, 0, 0.1);
        rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, 0, 0.1);
        leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0.1, 0.1);
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, -0.1, 0.1);
        bodyRoot.position.y = Math.sin(t * 1.8) * 0.04;
        headGroup.rotation.y = Math.sin(t * 0.8) * 0.2;
        headGroup.rotation.x = Math.sin(t * 1.2) * 0.05;
      }
    },
    setSitting: (isSitting) => {
      if (isSitting) {
        leftLegGroup.rotation.x = -Math.PI / 2 + 0.2;
        rightLegGroup.rotation.x = -Math.PI / 2 + 0.35;
        bodyRoot.position.y = -0.4;
        leftArmGroup.rotation.x = 0.5;
        rightArmGroup.rotation.x = -0.2;
      } else {
        leftLegGroup.rotation.x = 0;
        rightLegGroup.rotation.x = 0;
        bodyRoot.position.y = 0;
      }
    }
  };

  characterGroup.userData.anim = animController;
  return characterGroup;
}

/**
 * Creates the retro-futuristic arcade console pedestal inspired by Reference 2:
 * "GAME OVER" glowing screen, cyber grass/moss edge, where the character sits during the intro.
 */
export function createArcadePerch() {
  const perchGroup = new THREE.Group();
  perchGroup.name = 'ArcadePerch';

  // Base arcade cabinet
  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x181e28,
    metalness: 0.6,
    roughness: 0.4
  });
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.4), cabinetMat);
  cabinet.position.y = 1.1;
  perchGroup.add(cabinet);

  // Slanted top seat
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x0f141e,
    metalness: 0.8,
    roughness: 0.3
  });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 1.4), seatMat);
  seat.position.y = 2.25;
  perchGroup.add(seat);

  // Glowing CRT screen
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 256;
  screenCanvas.height = 256;
  const ctx = screenCanvas.getContext('2d');
  ctx.fillStyle = '#061325';
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = '#00ffcc';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 244, 244);
  ctx.fillStyle = '#00ffcc';
  ctx.font = 'bold 36px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('NAJHA.OS', 128, 110);
  ctx.font = '22px monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('SYSTEM READY', 128, 160);

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 1.2), screenMat);
  screen.position.set(0, 1.1, 0.71);
  perchGroup.add(screen);

  return perchGroup;
}
