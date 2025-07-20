// Office Visualizer Component
class OfficeVisualizer extends HTMLElement {
    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.officeModel = null;
        this.hotspots = new Map();
        this.teamLocations = new Map();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="office-visualizer">
                <div class="visualizer-header">
                    <h3 class="visualizer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Office Space
                    </h3>
                    <div class="visualizer-controls">
                        <button class="btn-icon small" id="zoomIn" aria-label="Zoom in">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="zoomOut" aria-label="Zoom out">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="resetView" aria-label="Reset view">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                                <path d="M3 21v-5h5"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="visualizerCanvas" class="visualizer-canvas"></div>
                <div class="floor-selector">
                    <button class="floor-btn active" data-floor="1">Floor 1</button>
                    <button class="floor-btn" data-floor="2">Floor 2</button>
                    <button class="floor-btn" data-floor="3">Floor 3</button>
                </div>
                <div class="legend">
                    <div class="legend-item">
                        <span class="legend-dot available"></span>
                        Available
                    </div>
                    <div class="legend-item">
                        <span class="legend-dot occupied"></span>
                        Occupied
                    </div>
                    <div class="legend-item">
                        <span class="legend-dot meeting"></span>
                        In Meeting
                    </div>
                </div>
            </div>
        `;

        this.loadThreeJs()
            .then(() => {
                this.initScene();
                this.loadOfficeModel();
                this.setupEventListeners();
                this.startRealTimeUpdates();
            });
    }

    async loadThreeJs() {
        // Load Three.js and OrbitControls from CDN
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        try {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
            await loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
            return true;
        } catch (error) {
            console.error('Failed to load Three.js:', error);
            // Show fallback content
            this.showFallbackContent();
            return false;
        }
    }

    showFallbackContent() {
        this.innerHTML = `
            <div class="office-visualizer fallback">
                <div class="visualizer-header">
                    <h3 class="visualizer-title">Office Space</h3>
                </div>
                <div class="fallback-content">
                    <div class="fallback-message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <h4>2D Office View</h4>
                        <p>Showing simplified office layout</p>
                    </div>
                    <div class="office-grid">
                        <div class="office-area meeting-room" data-status="available">
                            <span class="area-label">Meeting Room A</span>
                            <span class="status-badge">Available</span>
                        </div>
                        <div class="office-area workspace" data-status="occupied">
                            <span class="area-label">Open Space</span>
                            <span class="status-badge">8 people</span>
                        </div>
                        <div class="office-area meeting-room" data-status="in-use">
                            <span class="area-label">Meeting Room B</span>
                            <span class="status-badge">In Use</span>
                        </div>
                        <div class="office-area break-room">
                            <span class="area-label">Break Room</span>
                            <span class="status-badge">2 people</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initScene() {
        const container = this.querySelector('#visualizerCanvas');
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create scene with fog for depth
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8fafc);
        this.scene.fog = new THREE.Fog(0xf8fafc, 10, 50);

        // Create camera with better initial position
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(15, 10, 15);
        this.camera.lookAt(0, 0, 0);

        // Create renderer with better quality
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Add orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 30;
        this.controls.maxPolarAngle = Math.PI / 2;

        // Add better lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.right = 17;
        directionalLight.shadow.camera.left = -17;
        directionalLight.shadow.camera.top = 17;
        directionalLight.shadow.camera.bottom = -17;
        directionalLight.shadow.mapSize.width = 512;
        directionalLight.shadow.mapSize.height = 512;
        this.scene.add(directionalLight);

        // Add ground plane
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xe2e8f0,
            roughness: 0.8,
            metalness: 0.2
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Add grid helper
        const gridHelper = new THREE.GridHelper(50, 50, 0x9ca3af, 0xd1d5db);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;

            this.camera.aspect = newWidth / newHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(newWidth, newHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Update team locations
        this.updateTeamLocations();
        
        // Update hotspots with pulsing effect
        this.updateHotspots();

        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    loadOfficeModel() {
        // Create office container
        this.officeModel = new THREE.Group();
        this.scene.add(this.officeModel);

        // Materials
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.7,
            metalness: 0.1
        });

        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x6366f1,
            roughness: 0,
            metalness: 0.2,
            transparent: true,
            opacity: 0.3,
            transmission: 0.9
        });

        // Create main office structure
        const mainStructure = new THREE.Group();

        // Outer walls
        const outerWalls = [
            { size: [20, 4, 0.2], position: [0, 2, -10], rotation: [0, 0, 0] },  // Back wall
            { size: [20, 4, 0.2], position: [0, 2, 10], rotation: [0, 0, 0] },   // Front wall
            { size: [0.2, 4, 20], position: [-10, 2, 0], rotation: [0, 0, 0] },  // Left wall
            { size: [0.2, 4, 20], position: [10, 2, 0], rotation: [0, 0, 0] }    // Right wall
        ];

        outerWalls.forEach(wall => {
            const geometry = new THREE.BoxGeometry(...wall.size);
            const mesh = new THREE.Mesh(geometry, wallMaterial);
            mesh.position.set(...wall.position);
            mesh.rotation.set(...wall.rotation);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mainStructure.add(mesh);
        });

        // Meeting rooms (glass boxes)
        const meetingRooms = [
            { size: [5, 3, 5], position: [-7, 1.5, -7] },
            { size: [5, 3, 5], position: [7, 1.5, -7] },
            { size: [5, 3, 5], position: [7, 1.5, 7] }
        ];

        meetingRooms.forEach((room, index) => {
            const roomGroup = new THREE.Group();
            
            // Glass walls
            const walls = [
                { size: [5, 3, 0.1], position: [0, 0, -2.5], rotation: [0, 0, 0] },
                { size: [5, 3, 0.1], position: [0, 0, 2.5], rotation: [0, 0, 0] },
                { size: [0.1, 3, 5], position: [-2.5, 0, 0], rotation: [0, 0, 0] },
                { size: [0.1, 3, 5], position: [2.5, 0, 0], rotation: [0, 0, 0] }
            ];

            walls.forEach(wall => {
                const geometry = new THREE.BoxGeometry(...wall.size);
                const mesh = new THREE.Mesh(geometry, glassMaterial);
                mesh.position.set(...wall.position);
                mesh.rotation.set(...wall.rotation);
                roomGroup.add(mesh);
            });

            roomGroup.position.set(...room.position);
            mainStructure.add(roomGroup);

            // Add hotspot for room status
            const hotspot = this.createHotspot(room.position[0], 3, room.position[2], index);
            mainStructure.add(hotspot);
        });

        // Add desks in open space
        const desks = [
            { position: [-3, 0.5, 0], rotation: 0 },
            { position: [0, 0.5, 0], rotation: 0 },
            { position: [3, 0.5, 0], rotation: 0 },
            { position: [-3, 0.5, 3], rotation: 0 },
            { position: [0, 0.5, 3], rotation: 0 },
            { position: [3, 0.5, 3], rotation: 0 }
        ];

        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.3,
            metalness: 0.7
        });

        desks.forEach(desk => {
            const deskGeometry = new THREE.BoxGeometry(2, 0.1, 1);
            const deskMesh = new THREE.Mesh(deskGeometry, deskMaterial);
            deskMesh.position.set(...desk.position);
            deskMesh.rotation.y = desk.rotation;
            deskMesh.castShadow = true;
            deskMesh.receiveShadow = true;
            mainStructure.add(deskMesh);
        });

        this.officeModel.add(mainStructure);
    }

    createHotspot(x, y, z, index) {
        const geometry = new THREE.SphereGeometry(0.2, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x10b981,
            transparent: true,
            opacity: 0.7
        });

        const hotspot = new THREE.Mesh(geometry, material);
        hotspot.position.set(x, y, z);
        
        // Add to hotspots collection for animation
        this.hotspots.set(`room${index}`, hotspot);

        return hotspot;
    }

    updateTeamLocations() {
        // Update team member positions
        this.teamLocations.forEach((location, memberId) => {
            const marker = this.getOrCreateTeamMarker(memberId);
            marker.position.lerp(location.target, 0.1);
        });
    }

    getOrCreateTeamMarker(memberId) {
        if (!this.teamLocations.has(memberId)) {
            const geometry = new THREE.SphereGeometry(0.1);
            const material = new THREE.MeshPhongMaterial({ color: 0x10b981 });
            const marker = new THREE.Mesh(geometry, material);
            this.scene.add(marker);
            this.teamLocations.set(memberId, {
                marker,
                target: new THREE.Vector3()
            });
        }
        return this.teamLocations.get(memberId).marker;
    }

    updateHotspots() {
        // Update interactive hotspots
        this.hotspots.forEach((hotspot, id) => {
            hotspot.update();
        });
    }

    setupEventListeners() {
        // Zoom controls
        this.querySelector('#zoomIn').addEventListener('click', () => {
            this.camera.position.z = Math.max(2, this.camera.position.z - 0.5);
        });

        this.querySelector('#zoomOut').addEventListener('click', () => {
            this.camera.position.z = Math.min(10, this.camera.position.z + 0.5);
        });

        this.querySelector('#resetView').addEventListener('click', () => {
            this.camera.position.set(0, 0, 5);
            this.camera.rotation.set(0, 0, 0);
        });

        // Floor selection
        this.querySelectorAll('.floor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const floor = parseInt(e.target.dataset.floor);
                this.switchFloor(floor);
                
                // Update active state
                this.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            const container = this.querySelector('#visualizerCanvas');
            const width = container.clientWidth;
            const height = container.clientHeight;

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    switchFloor(floorNumber) {
        // Animate to show selected floor
        const targetY = (floorNumber - 2) * 0.33;
        const currentY = this.camera.position.y;
        
        const animate = () => {
            const diff = targetY - currentY;
            if (Math.abs(diff) > 0.01) {
                this.camera.position.y += diff * 0.1;
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateTeamMemberLocations();
            this.updateRoomAvailability();
        }, 5000);
    }

    updateTeamMemberLocations() {
        // Simulate team member movement
        const teamMembers = [
            { id: 1, name: 'Alice', department: 'Engineering' },
            { id: 2, name: 'Bob', department: 'Design' },
            { id: 3, name: 'Charlie', department: 'Marketing' }
        ];

        teamMembers.forEach(member => {
            const location = {
                target: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 0.5,
                    (Math.random() - 0.5) * 2
                )
            };
            this.teamLocations.set(member.id, location);
        });
    }

    updateRoomAvailability() {
        // Simulate room availability changes
        const rooms = [
            { id: 'room1', name: 'Brainstorm Room', floor: 1 },
            { id: 'room2', name: 'Meeting Room A', floor: 2 },
            { id: 'room3', name: 'Conference Room', floor: 3 }
        ];

        rooms.forEach(room => {
            const isAvailable = Math.random() > 0.5;
            const hotspot = this.getOrCreateHotspot(room.id);
            hotspot.material.color.setHex(isAvailable ? 0x10b981 : 0xef4444);
        });
    }

    getOrCreateHotspot(roomId) {
        if (!this.hotspots.has(roomId)) {
            const geometry = new THREE.CircleGeometry(0.15);
            const material = new THREE.MeshBasicMaterial({ color: 0x10b981 });
            const hotspot = new THREE.Mesh(geometry, material);
            
            // Add pulse animation
            hotspot.update = () => {
                const scale = 1 + Math.sin(Date.now() * 0.005) * 0.1;
                hotspot.scale.set(scale, scale, 1);
            };

            this.scene.add(hotspot);
            this.hotspots.set(roomId, hotspot);
        }
        return this.hotspots.get(roomId);
    }

    disconnectedCallback() {
        // Cleanup
        this.renderer?.dispose();
        this.scene?.dispose();
    }
}

customElements.define('office-visualizer', OfficeVisualizer); 