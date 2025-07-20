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
        this.isInitialized = false;
        this.animationFrame = null;
    }

    connectedCallback() {
        // Initial render
        this.render2DView();

        // Initialize after a short delay to ensure Three.js is loaded
        setTimeout(() => {
            if (typeof THREE === 'undefined') {
                console.error('Three.js not loaded');
                this.showFallbackContent();
                return;
            }

            try {
                this.initialize3DView();
            } catch (error) {
                console.error('Failed to initialize 3D view:', error);
                this.showFallbackContent();
            }
        }, 1000); // Increased delay to ensure scripts are loaded
    }

    async loadDependencies() {
        // Load Three.js if not already loaded
        if (typeof THREE === 'undefined') {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.128.0/three.min.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Load OrbitControls
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        // Verify dependencies are loaded
        if (typeof THREE === 'undefined' || typeof THREE.OrbitControls === 'undefined') {
            throw new Error('Failed to load Three.js dependencies');
        }
    }

    render2DView() {
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
                </div>
                <div id="visualizerCanvas" class="visualizer-canvas">
                    <div class="loading-indicator">
                        <span class="loading-text">Loading 3D Office View...</span>
                        <div class="loading-spinner"></div>
                    </div>
                </div>
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
    }

    initialize3DView() {
        const container = this.querySelector('#visualizerCanvas');
        if (!container) {
            throw new Error('Canvas container not found');
        }

        // Get container dimensions
        const width = container.clientWidth;
        const height = container.clientHeight || 400;

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f7fa);

        // Create camera with better initial position
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(30, 25, 30);
        this.camera.lookAt(0, 0, 0);

        // Create renderer with better quality
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Clear container and append renderer
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        // Add orbit controls with better defaults
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 2, 0);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 20;
        this.controls.maxDistance = 50;
        this.controls.maxPolarAngle = Math.PI / 2.1; // Prevent going below ground
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.5;
        this.controls.rotateSpeed = 0.5;

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(15, 25, 15);
        this.scene.add(directionalLight);

        // Add ground with better material
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            roughness: 0.9,
            metalness: 0.1
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);

        // Add grid with better colors
        const gridHelper = new THREE.GridHelper(50, 50, 0xdbe1e8, 0xe2e8f0);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // Add office model
        this.loadOfficeModel();

        // Handle resize
        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight || 400;
            this.camera.aspect = newWidth / newHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(newWidth, newHeight);
        });

        // Start animation
        this.isInitialized = true;
        this.animate();

        // Add floor change handler
        this.setupFloorButtons();
    }

    animate() {
        if (!this.isInitialized) return;

        this.animationFrame = requestAnimationFrame(() => this.animate());

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        // Render scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    loadOfficeModel() {
        // Create office container
        this.officeModel = new THREE.Group();
        this.scene.add(this.officeModel);

        // Materials with better colors and properties
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5,
            metalness: 0.1
        });

        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.2,
            roughness: 0.1,
            metalness: 0.9
        });

        const deskMaterial = new THREE.MeshStandardMaterial({
            color: 0x334155,
            roughness: 0.3,
            metalness: 0.7
        });

        // Create main office structure
        const mainStructure = new THREE.Group();

        // Outer walls with better dimensions
        const outerWalls = [
            { size: [20, 4, 0.3], position: [0, 2, -10], rotation: [0, 0, 0] },  // Back wall
            { size: [20, 4, 0.3], position: [0, 2, 10], rotation: [0, 0, 0] },   // Front wall
            { size: [0.3, 4, 20], position: [-10, 2, 0], rotation: [0, 0, 0] },  // Left wall
            { size: [0.3, 4, 20], position: [10, 2, 0], rotation: [0, 0, 0] }    // Right wall
        ];

        outerWalls.forEach(wall => {
            const geometry = new THREE.BoxGeometry(...wall.size);
            const mesh = new THREE.Mesh(geometry, wallMaterial);
            mesh.position.set(...wall.position);
            mesh.rotation.set(...wall.rotation);
            mainStructure.add(mesh);
        });

        // Meeting rooms with better dimensions
        const meetingRooms = [
            { size: [6, 3, 6], position: [-7, 1.5, -7] },
            { size: [6, 3, 6], position: [7, 1.5, -7] },
            { size: [6, 3, 6], position: [7, 1.5, 7] }
        ];

        meetingRooms.forEach(room => {
            const roomGroup = new THREE.Group();
            
            // Glass walls
            const walls = [
                { size: [6, 3, 0.1], position: [0, 0, -3], rotation: [0, 0, 0] },
                { size: [6, 3, 0.1], position: [0, 0, 3], rotation: [0, 0, 0] },
                { size: [0.1, 3, 6], position: [-3, 0, 0], rotation: [0, 0, 0] },
                { size: [0.1, 3, 6], position: [3, 0, 0], rotation: [0, 0, 0] }
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
        });

        // Desks with better layout
        const desks = [
            { position: [-3, 0.5, 0], rotation: 0 },
            { position: [0, 0.5, 0], rotation: 0 },
            { position: [3, 0.5, 0], rotation: 0 },
            { position: [-3, 0.5, 3], rotation: 0 },
            { position: [0, 0.5, 3], rotation: 0 },
            { position: [3, 0.5, 3], rotation: 0 }
        ];

        desks.forEach(desk => {
            const deskGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.2);
            const deskMesh = new THREE.Mesh(deskGeometry, deskMaterial);
            deskMesh.position.set(...desk.position);
            deskMesh.rotation.y = desk.rotation;
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
        if (!this.isInitialized) return;
        
        // Update team member positions
        this.teamLocations.forEach((location, memberId) => {
            if (location && location.marker && location.target) {
                location.marker.position.lerp(location.target, 0.1);
            }
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
        if (!this.isInitialized) return;

        // Simulate team member movement
        const teamMembers = [
            { id: 1, name: 'Alice', department: 'Engineering' },
            { id: 2, name: 'Bob', department: 'Design' },
            { id: 3, name: 'Charlie', department: 'Marketing' }
        ];

        teamMembers.forEach(member => {
            if (!this.teamLocations.has(member.id)) {
                const geometry = new THREE.SphereGeometry(0.2);
                const material = new THREE.MeshPhongMaterial({ color: 0x10b981 });
                const marker = new THREE.Mesh(geometry, material);
                marker.position.set(
                    (Math.random() - 0.5) * 15,
                    0.5,
                    (Math.random() - 0.5) * 15
                );
                this.scene.add(marker);

                this.teamLocations.set(member.id, {
                    marker,
                    target: new THREE.Vector3(
                        (Math.random() - 0.5) * 15,
                        0.5,
                        (Math.random() - 0.5) * 15
                    )
                });
            } else {
                const location = this.teamLocations.get(member.id);
                location.target.set(
                    (Math.random() - 0.5) * 15,
                    0.5,
                    (Math.random() - 0.5) * 15
                );
            }
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

    showFallbackContent() {
        this.innerHTML = `
            <div class="office-visualizer fallback">
                <div class="visualizer-header">
                    <h3 class="visualizer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Office Space
                    </h3>
                </div>
                <div class="fallback-content">
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

    disconnectedCallback() {
        // Cleanup
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.isInitialized = false;
        this.renderer?.dispose();
        this.scene?.dispose();
        
        // Remove all event listeners
        window.removeEventListener('resize', this.handleResize);
        this.querySelectorAll('button').forEach(btn => {
            btn.removeEventListener('click', this.handleButtonClick);
        });
    }

    setupFloorButtons() {
        const buttons = this.querySelectorAll('.floor-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const floor = parseInt(button.dataset.floor);
                this.switchToFloor(floor);
                
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    switchToFloor(floor) {
        // Calculate target camera position based on floor
        const baseHeight = 25;
        const floorHeight = 5;
        const targetHeight = baseHeight + ((floor - 1) * floorHeight);
        
        // Smoothly animate camera
        const startPos = this.camera.position.clone();
        const targetPos = new THREE.Vector3(30, targetHeight, 30);
        const duration = 1000; // ms
        const startTime = Date.now();

        const animateCamera = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            // Interpolate camera position
            this.camera.position.lerpVectors(startPos, targetPos, easeProgress);
            
            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        };

        animateCamera();
    }
}

customElements.define('office-visualizer', OfficeVisualizer); 