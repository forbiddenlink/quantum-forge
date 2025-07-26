// Enhanced 3D Office Visualizer with Contest-Winning Features
class EnhancedOfficeVisualizer extends HTMLElement {
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
        this.interactiveMode = false;
        this.vrMode = false;
        this.officeData = {
            floors: 3,
            rooms: [],
            teamMembers: [],
            equipment: []
        };
    }

    connectedCallback() {
        this.render2DView();
        this.loadOfficeData();

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
        }, 1000);
    }

    loadOfficeData() {
        // Enhanced office data with more details
        this.officeData = {
            floors: 3,
            rooms: [
                { id: 1, name: 'Conference Room A', floor: 1, capacity: 12, status: 'available', equipment: ['projector', 'whiteboard'] },
                { id: 2, name: 'Open Workspace', floor: 1, capacity: 25, status: 'occupied', equipment: ['standing-desks', 'monitors'] },
                { id: 3, name: 'Quiet Zone', floor: 2, capacity: 8, status: 'available', equipment: ['bean-bags', 'plants'] },
                { id: 4, name: 'Innovation Lab', floor: 2, capacity: 15, status: 'meeting', equipment: ['vr-headsets', '3d-printer'] },
                { id: 5, name: 'Executive Suite', floor: 3, capacity: 6, status: 'occupied', equipment: ['smart-board', 'coffee-station'] }
            ],
            teamMembers: [
                { id: 1, name: 'Sarah Chen', department: 'Design', floor: 1, room: 2, status: 'online', activity: 'Working on UI designs' },
                { id: 2, name: 'Mike Rodriguez', department: 'Engineering', floor: 2, room: 4, status: 'meeting', activity: 'VR prototype demo' },
                { id: 3, name: 'Lisa Thompson', department: 'Product', floor: 3, room: 5, status: 'online', activity: 'Strategy planning' }
            ],
            equipment: [
                { id: 1, name: 'VR Headset', location: 'Innovation Lab', status: 'available' },
                { id: 2, name: '3D Printer', location: 'Innovation Lab', status: 'printing' },
                { id: 3, name: 'Smart Board', location: 'Conference Room A', status: 'available' }
            ]
        };
    }

    render2DView() {
        this.innerHTML = `
            <div class="enhanced-office-visualizer">
                <div class="visualizer-header">
                    <h3 class="visualizer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Interactive Office Space
                    </h3>
                    <div class="visualizer-controls">
                        <button class="control-btn" id="toggle3D" aria-label="Toggle 3D view">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </button>
                        <button class="control-btn" id="toggleVR" aria-label="Toggle VR mode">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                <line x1="8" y1="21" x2="16" y2="21"></line>
                                <line x1="12" y1="17" x2="12" y2="21"></line>
                            </svg>
                        </button>
                        <button class="control-btn" id="toggleInteractive" aria-label="Toggle interactive mode">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 12l2 2 4-4"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div id="visualizerCanvas" class="visualizer-canvas enhanced">
                    <div class="loading-indicator">
                        <div class="loading-spinner"></div>
                        <span class="loading-text">Loading Interactive 3D Office View...</span>
                        <div class="loading-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 0%"></div>
                            </div>
                            <span class="progress-text">0%</span>
                        </div>
                    </div>
                </div>
                
                <div class="floor-selector enhanced">
                    <button class="floor-btn active" data-floor="1">Floor 1</button>
                    <button class="floor-btn" data-floor="2">Floor 2</button>
                    <button class="floor-btn" data-floor="3">Floor 3</button>
                </div>
                
                <div class="office-stats">
                    <div class="stat-item">
                        <span class="stat-icon">👥</span>
                        <span class="stat-value">${this.officeData.teamMembers.length}</span>
                        <span class="stat-label">Team Members</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">🏢</span>
                        <span class="stat-value">${this.officeData.rooms.length}</span>
                        <span class="stat-label">Rooms</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-icon">⚡</span>
                        <span class="stat-value">${this.officeData.equipment.length}</span>
                        <span class="stat-label">Equipment</span>
                    </div>
                </div>
                
                <div class="legend enhanced">
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
                    <div class="legend-item">
                        <span class="legend-dot equipment"></span>
                        Equipment
                    </div>
                </div>
            </div>
        `;
    }

    initialize3DView() {
        const container = this.querySelector('#visualizerCanvas');
        if (!container) return;

        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8fafc);

        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);

        // Add lighting
        this.setupLighting();

        // Create office layout
        this.createOfficeLayout();

        // Add interactive elements
        this.addInteractiveElements();

        // Start animation loop
        this.animate();

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());

        this.isInitialized = true;
        this.updateLoadingProgress(100);
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights for rooms
        this.officeData.rooms.forEach((room, index) => {
            const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
            pointLight.position.set(
                (index % 3 - 1) * 8,
                2,
                Math.floor(index / 3) * 8
            );
            this.scene.add(pointLight);
        });
    }

    createOfficeLayout() {
        // Create floor
        const floorGeometry = new THREE.PlaneGeometry(30, 30);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Create rooms
        this.officeData.rooms.forEach((room, index) => {
            this.createRoom(room, index);
        });

        // Create team members
        this.officeData.teamMembers.forEach(member => {
            this.createTeamMember(member);
        });
    }

    createRoom(room, index) {
        const roomGeometry = new THREE.BoxGeometry(6, 3, 6);
        const roomMaterial = new THREE.MeshLambertMaterial({
            color: this.getRoomColor(room.status),
            transparent: true,
            opacity: 0.8
        });
        const roomMesh = new THREE.Mesh(roomGeometry, roomMaterial);

        roomMesh.position.set(
            (index % 3 - 1) * 8,
            1.5,
            Math.floor(index / 3) * 8
        );
        roomMesh.castShadow = true;
        roomMesh.receiveShadow = true;

        // Add room label
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 256, 64);
        context.fillStyle = '#1f2937';
        context.font = '24px Inter';
        context.textAlign = 'center';
        context.fillText(room.name, 128, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(4, 1);
        const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, 3, 0);
        roomMesh.add(label);

        this.scene.add(roomMesh);

        // Store room reference
        this.hotspots.set(room.id, roomMesh);
    }

    createTeamMember(member) {
        const memberGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const memberMaterial = new THREE.MeshLambertMaterial({
            color: this.getMemberColor(member.status)
        });
        const memberMesh = new THREE.Mesh(memberGeometry, memberMaterial);

        // Position member in their room
        const room = this.officeData.rooms.find(r => r.id === member.room);
        if (room) {
            const roomIndex = this.officeData.rooms.indexOf(room);
            memberMesh.position.set(
                (roomIndex % 3 - 1) * 8 + (Math.random() - 0.5) * 4,
                0.5,
                Math.floor(roomIndex / 3) * 8 + (Math.random() - 0.5) * 4
            );
        }

        memberMesh.castShadow = true;
        this.scene.add(memberMesh);

        // Store member reference
        this.teamLocations.set(member.id, memberMesh);
    }

    getRoomColor(status) {
        const colors = {
            available: 0x22c55e,
            occupied: 0xf59e0b,
            meeting: 0xef4444
        };
        return colors[status] || 0x94a3b8;
    }

    getMemberColor(status) {
        const colors = {
            online: 0x22c55e,
            away: 0xf59e0b,
            meeting: 0xef4444,
            offline: 0x6b7280
        };
        return colors[status] || 0x6b7280;
    }

    addInteractiveElements() {
        // Add click handlers for rooms
        this.hotspots.forEach((mesh, roomId) => {
            mesh.userData = { roomId, type: 'room' };
        });

        // Add raycaster for interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        const canvas = this.renderer.domElement;
        canvas.addEventListener('click', (event) => this.onMouseClick(event));
        canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
    }

    onMouseClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData && object.userData.roomId) {
                this.showRoomDetails(object.userData.roomId);
            }
        }
    }

    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        // Update cursor style
        const canvas = this.renderer.domElement;
        if (intersects.length > 0 && intersects[0].object.userData) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    showRoomDetails(roomId) {
        const room = this.officeData.rooms.find(r => r.id === roomId);
        if (!room) return;

        const members = this.officeData.teamMembers.filter(m => m.room === roomId);
        const equipment = this.officeData.equipment.filter(e => e.location === room.name);

        const details = `
            <div class="room-details">
                <h3>${room.name}</h3>
                <p><strong>Status:</strong> ${room.status}</p>
                <p><strong>Capacity:</strong> ${room.capacity} people</p>
                <p><strong>Floor:</strong> ${room.floor}</p>
                ${members.length > 0 ? `<p><strong>Team Members:</strong> ${members.map(m => m.name).join(', ')}</p>` : ''}
                ${equipment.length > 0 ? `<p><strong>Equipment:</strong> ${equipment.map(e => e.name).join(', ')}</p>` : ''}
            </div>
        `;

        this.showModal(details);
    }

    showModal(content) {
        const modal = document.createElement('div');
        modal.className = 'office-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                ${content}
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    animate() {
        this.animationFrame = requestAnimationFrame(() => this.animate());

        // Rotate camera slowly
        if (this.camera && !this.interactiveMode) {
            this.camera.position.x = Math.cos(Date.now() * 0.001) * 15;
            this.camera.position.z = Math.sin(Date.now() * 0.001) * 15;
            this.camera.lookAt(0, 0, 0);
        }

        // Animate team members
        this.teamLocations.forEach((mesh, memberId) => {
            const member = this.officeData.teamMembers.find(m => m.id === memberId);
            if (member && member.status === 'online') {
                mesh.position.y = 0.5 + Math.sin(Date.now() * 0.003) * 0.1;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        const container = this.querySelector('#visualizerCanvas');
        if (!container || !this.camera || !this.renderer) return;

        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    updateLoadingProgress(progress) {
        const progressFill = this.querySelector('.progress-fill');
        const progressText = this.querySelector('.progress-text');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${progress}%`;
    }

    showFallbackContent() {
        const canvas = this.querySelector('#visualizerCanvas');
        if (!canvas) return;

        canvas.innerHTML = `
            <div class="fallback-content">
                <div class="fallback-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h3>Office Layout</h3>
                <p>Interactive 3D view is loading...</p>
                <div class="office-overview">
                    <div class="floor-plan">
                        <h4>Floor Plan</h4>
                        <div class="room-grid">
                            ${this.officeData.rooms.map(room => `
                                <div class="room-item ${room.status}">
                                    <span class="room-name">${room.name}</span>
                                    <span class="room-status">${room.status}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const toggle3D = this.querySelector('#toggle3D');
        const toggleVR = this.querySelector('#toggleVR');
        const toggleInteractive = this.querySelector('#toggleInteractive');
        const floorBtns = this.querySelectorAll('.floor-btn');

        toggle3D?.addEventListener('click', () => this.toggle3DMode());
        toggleVR?.addEventListener('click', () => this.toggleVRMode());
        toggleInteractive?.addEventListener('click', () => this.toggleInteractiveMode());

        floorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const floor = parseInt(e.target.dataset.floor);
                this.switchToFloor(floor);

                floorBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    toggle3DMode() {
        // Toggle between 2D and 3D views
        console.log('3D mode toggled');
    }

    toggleVRMode() {
        this.vrMode = !this.vrMode;
        const btn = this.querySelector('#toggleVR');
        if (btn) {
            btn.classList.toggle('active', this.vrMode);
        }
        console.log('VR mode:', this.vrMode);
    }

    toggleInteractiveMode() {
        this.interactiveMode = !this.interactiveMode;
        const btn = this.querySelector('#toggleInteractive');
        if (btn) {
            btn.classList.toggle('active', this.interactiveMode);
        }
        console.log('Interactive mode:', this.interactiveMode);
    }

    switchToFloor(floor) {
        // Filter rooms and team members for the selected floor
        const floorRooms = this.officeData.rooms.filter(r => r.floor === floor);
        const floorMembers = this.officeData.teamMembers.filter(m => {
            const memberRoom = this.officeData.rooms.find(r => r.id === m.room);
            return memberRoom && memberRoom.floor === floor;
        });

        console.log(`Switched to floor ${floor}:`, { rooms: floorRooms, members: floorMembers });
    }

    disconnectedCallback() {
        console.log('Enhanced Office Visualizer disconnecting...');

        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // Remove window event listener
        window.removeEventListener('resize', this.onWindowResize);

        // Clean up Three.js resources
        if (this.scene) {
            this.scene.clear();
            this.scene = null;
        }

        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }

        console.log('Enhanced Office Visualizer cleanup complete');
    }
}

customElements.define('enhanced-office-visualizer', EnhancedOfficeVisualizer); 