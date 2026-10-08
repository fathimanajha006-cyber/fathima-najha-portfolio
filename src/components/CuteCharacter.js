import * as THREE from 'three';

/**
 * Creates a cute, friendly stylized 3D guide character ("NAJHA GUIDE"):
 * Chibi proportions, rounded pastel hoodie, friendly waving arm, cute sneakers, and expressive head.
 */
export function createCuteCharacter() {
  const characterGroup = new THREE.Group();
  characterGroup.name = 'CuteGuide';

  // Materials
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xffdfd0,
    roughness: 0.5,
    metalness: 0.05
  });

  const hoodieMat = new THREE.MeshStandardMaterial({
    color: 0xfb7185, // soft pastel rose / peach
    roughness: 0.6,
    metalness: 0.05
  });

  const pantsMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8, // cute soft denim sky blue
    roughness: 0.5,
    metalness: 0.05
  });

  const shoeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.1
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x33221b, // soft dark brown
    roughness: 0.7,
    metalness: 0.05
  });

  const eyeMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
  const blushMat = new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.6 });

  // Body Root
  const bodyRoot = new THREE.Group();
  characterGroup.add(bodyRoot);

  // --- LEGS ---
  const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.45, 12), pantsMat);
  leftLeg.position.set(-0.2, 0.4, 0);
  bodyRoot.add(leftLeg);

  const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.45, 12), pantsMat);
  rightLeg.position.set(0.2, 0.4, 0);
  bodyRoot.add(rightLeg);

  const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.32), shoeMat);
  leftShoe.position.set(-0.2, 0.1, 0.05);
  bodyRoot.add(leftShoe);

  const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.32), shoeMat);
  rightShoe.position.set(0.2, 0.1, 0.05);
  bodyRoot.add(rightShoe);

  // --- TORSO / HOODIE ---
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.65, 16), hoodieMat);
  torso.position.set(0, 0.95, 0);
  bodyRoot.add(torso);

  // Cute backpack
  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.45, 0.22), new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 }));
  backpack.position.set(0, 0.95, -0.28);
  bodyRoot.add(backpack);

  // --- HEAD ---
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.6, 0);
  bodyRoot.add(headGroup);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 24, 24), skinMat);
  headGroup.add(head);

  // Hair / Bangs
  const hairBack = new THREE.Mesh(new THREE.SphereGeometry(0.44, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7), hairMat);
  hairBack.rotation.x = -Math.PI / 4;
  headGroup.add(hairBack);

  // Eyes
  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), eyeMat);
  leftEye.position.set(-0.15, 0.04, 0.39);
  headGroup.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), eyeMat);
  rightEye.position.set(0.15, 0.04, 0.39);
  headGroup.add(rightEye);

  // Cute rosy cheeks
  const leftCheek = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), blushMat);
  leftCheek.position.set(-0.22, -0.06, 0.38);
  leftCheek.rotation.y = -0.3;
  headGroup.add(leftCheek);

  const rightCheek = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), blushMat);
  rightCheek.position.set(0.22, -0.06, 0.38);
  rightCheek.rotation.y = 0.3;
  headGroup.add(rightCheek);

  // Cute small star hairpin
  const starPin = new THREE.Mesh(new THREE.DodecahedronGeometry(0.07), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
  starPin.position.set(0.32, 0.22, 0.3);
  headGroup.add(starPin);

  // --- ARMS ---
  // Left Arm (relaxed by side)
  const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.5, 12), hoodieMat);
  leftArm.position.set(-0.48, 0.9, 0);
  leftArm.rotation.z = 0.2;
  bodyRoot.add(leftArm);

  // Right Arm (friendly waving animation)
  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.48, 1.15, 0);
  bodyRoot.add(rightArmPivot);

  const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.45, 12), hoodieMat);
  rightArm.position.set(0, 0.2, 0);
  rightArmPivot.add(rightArm);

  const rightHand = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), skinMat);
  rightHand.position.set(0, 0.45, 0);
  rightArmPivot.add(rightHand);

  // Set initial wave angle
  rightArmPivot.rotation.z = -Math.PI / 3;

  // Scale character nicely
  characterGroup.scale.set(1.6, 1.6, 1.6);

  // Animation controller
  const anim = {
    time: 0,
    update: (delta) => {
      anim.time += delta;
      const t = anim.time;

      // Gentle floating/breathing bounce
      bodyRoot.position.y = Math.sin(t * 2.5) * 0.06;

      // Friendly arm waving
      rightArmPivot.rotation.z = -Math.PI / 3 + Math.sin(t * 5.5) * 0.35;
      rightArmPivot.rotation.x = Math.cos(t * 4) * 0.15;

      // Subtle head gaze
      headGroup.rotation.y = Math.sin(t * 1.2) * 0.2;
      headGroup.rotation.x = Math.sin(t * 1.8) * 0.05;
    }
  };

  characterGroup.userData.anim = anim;
  return characterGroup;
}
