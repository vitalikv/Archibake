import * as THREE from 'three';

export class RoomBuilder {
  private roomGroup: THREE.Group;
  private width: number;
  private height: number;
  private depth: number;

  constructor(width = 10, height = 3, depth = 10) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.roomGroup = new THREE.Group();
  }

  public build() {
    this.createFloor();
    //this.createCeiling();
    this.createWalls();
    return this.roomGroup;
  }

  private createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(this.width, this.depth);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.8,
      metalness: 0.2,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.roomGroup.add(floor);
  }

  private createCeiling() {
    const ceilingGeometry = new THREE.PlaneGeometry(this.width, this.depth);
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = this.height;
    ceiling.receiveShadow = true;
    this.roomGroup.add(ceiling);
  }

  private createWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.1,
    });

    // Задняя стена
    const backWallGeometry = new THREE.PlaneGeometry(this.width, this.height);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, this.height / 2, -this.depth / 2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    this.roomGroup.add(backWall);

    // Передняя стена (с дверью)
    const frontWallGeometry = new THREE.PlaneGeometry(this.width, this.height);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.set(0, this.height / 2, this.depth / 2);
    frontWall.rotation.y = Math.PI;
    frontWall.castShadow = true;
    frontWall.receiveShadow = true;
    this.roomGroup.add(frontWall);

    // Левая стена
    const leftWallGeometry = new THREE.PlaneGeometry(this.depth, this.height);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-this.width / 2, this.height / 2, 0);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.castShadow = true;
    leftWall.receiveShadow = true;
    this.roomGroup.add(leftWall);

    // Правая стена (с окном)
    const rightWallGeometry = new THREE.PlaneGeometry(this.depth, this.height);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.set(this.width / 2, this.height / 2, 0);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.castShadow = true;
    rightWall.receiveShadow = true;
    this.roomGroup.add(rightWall);
  }

  public addFurniture() {
    // Стол
    const tableGeometry = new THREE.BoxGeometry(2, 0.05, 1);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, 0.8, 0);
    table.castShadow = true;
    table.receiveShadow = true;
    this.roomGroup.add(table);

    // Ножки стола
    const legGeometry = new THREE.BoxGeometry(0.05, 0.8, 0.05);
    const legPositions = [
      [-0.95, 0.4, -0.45],
      [0.95, 0.4, -0.45],
      [-0.95, 0.4, 0.45],
      [0.95, 0.4, 0.45],
    ];

    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeometry, tableMaterial);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      this.roomGroup.add(leg);
    });

    // Стул
    const chairSeatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    const chairSeat = new THREE.Mesh(chairSeatGeometry, tableMaterial);
    chairSeat.position.set(1.5, 0.4, 0);
    chairSeat.castShadow = true;
    chairSeat.receiveShadow = true;
    this.roomGroup.add(chairSeat);

    const chairBackGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.05);
    const chairBack = new THREE.Mesh(chairBackGeometry, tableMaterial);
    chairBack.position.set(1.5, 0.65, -0.2);
    chairBack.castShadow = true;
    this.roomGroup.add(chairBack);
  }

  public getRoom() {
    return this.roomGroup;
  }
}
