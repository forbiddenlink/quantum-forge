// Enhanced Office Visualizer Component - Dream Workplace Edition
class OfficeVisualizer extends HTMLElement {
    constructor() {
        super();
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.officeModel = null;
        this.hotspots = new Map();
        this.teamLocations = new Map();
        this.desks = new Map();
        this.meetingRooms = new Map();
        this.isInitialized = false;
        this.animationFrame = null;
        this.currentFloor = 1;
        this.raycaster = null;
        this.mouse = new THREE.Vector2();
        this.selectedDesk = null;
        this.teamMembers = this.generateTeamData();
    }

    connectedCallback() {
        this.render2DView();
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

    generateTeamData() {
        return [
            { id: 1, name: "Sarah Chen", role: "UX Designer", status: "in-office", desk: "A1", avatar: "👩‍💻" },
            { id: 2, name: "Marcus Johnson", role: "Frontend Dev", status: "remote", desk: "A2", avatar: "👨‍💼" },
            { id: 3, name: "Elena Rodriguez", role: "Product Manager", status: "in-meeting", desk: "B1", avatar: "👩‍💼" },
            { id: 4, name: "David Kim", role: "Backend Dev", status: "in-office", desk: "B2", avatar: "👨‍💻" },
            { id: 5, name: "Lisa Park", role: "Data Analyst", status: "lunch", desk: "C1", avatar: "👩‍🔬" },
            { id: 6, name: "Alex Thompson", role: "DevOps", status: "in-office", desk: "C2", avatar: "👨‍🔧" }
        ];
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
                        Interactive Office Space
                    </h3>
                    <div class="office-stats">
                        <div class="stat-pill">
                            <span class="stat-icon">👥</span>
                            <span class="stat-text">4/6 in office</span>
                        </div>
                        <div class="stat-pill">
                            <span class="stat-icon">🏢</span>
                            <span class="stat-text">2 meetings active</span>
                        </div>
                    </div>
                </div>

                <div id="visualizerCanvas" class="visualizer-canvas">
                    <div class="loading-indicator">
                        <div class="loading-content">
                            <div class="loading-spinner"></div>
                            <span class="loading-text">Loading Your Digital Office...</span>
                            <span class="loading-subtext">Preparing 3D workspace experience</span>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Floor Selector -->
                <div class="floor-selector">
                    <div class="floor-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"></path>
                            <path d="M8 21v-5a2 2 0 012-2h4a2 2 0 012 2v5"></path>
                        </svg>
                        <span>Floors</span>
                    </div>
                    <button class="floor-btn active" data-floor="1">
                        <span class="floor-number">1</span>
                        <span class="floor-label">Main Floor</span>
                        <span class="floor-occupancy">4 people</span>
                    </button>
                    <button class="floor-btn" data-floor="2">
                        <span class="floor-number">2</span>
                        <span class="floor-label">Meeting Hub</span>
                        <span class="floor-occupancy">2 meetings</span>
                    </button>
                    <button class="floor-btn" data-floor="3">
                        <span class="floor-number">3</span>
                        <span class="floor-label">Executive</span>
                        <span class="floor-occupancy">1 person</span>
                    </button>
                </div>

                <!-- Enhanced Legend -->
                <div class="legend">
                    <div class="legend-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                            <path d="m21 12-6-3-6 3-6-3"></path>
                        </svg>
                        <span>Status</span>
                    </div>
                    <div class="legend-items">
                        <div class="legend-item">
                            <span class="legend-dot available"></span>
                            <span>Available</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot occupied"></span>
                            <span>Occupied</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot meeting"></span>
                            <span>In Meeting</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot remote"></span>
                            <span>Remote</span>
                        </div>
                    </div>
                </div>

                <!-- New: Team Panel -->
                <div class="team-panel">
                    <div class="team-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <span>Team</span>
                        <button class="panel-toggle" data-panel="team">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>
                    <div class="team-content">
                        ${this.teamMembers.map(member => `
                            <div class="team-member" data-desk="${member.desk}" data-status="${member.status}">
                                <div class="member-avatar">${member.avatar}</div>
                                <div class="member-info">
                                    <span class="member-name">${member.name}</span>
                                    <span class="member-role">${member.role}</span>
                                </div>
                                <div class="member-status ${member.status}">
                                    ${this.getStatusIcon(member.status)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- New: Desk Info Panel -->
                <div class="desk-info-panel" id="deskInfoPanel" style="display: none;">
                    <div class="desk-info-header">
                        <h4>Desk Information</h4>
                        <button class="close-panel" onclick="this.closest('.desk-info-panel').style.display='none'">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="desk-info-content">
                        <!-- Content will be populated dynamically -->
                    </div>
                </div>

                <!-- Controls -->
                <div class="office-controls">
                    <button class="control-btn" id="resetView" title="Reset View">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M3 21v-5h5"></path>
                        </svg>
                    </button>
                    <button class="control-btn" id="toggleMode" title="Toggle View Mode">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    getStatusIcon(status) {
        const icons = {
            'in-office': '🟢',
            'remote': '🏠',
            'in-meeting': '📞',
            'lunch': '🍽️',
            'away': '⏰'
        };
        return icons[status] || '❓';
    }

    initialize3DView() {
        const container = this.querySelector('#visualizerCanvas');
        if (!container) throw new Error('Canvas container not found');

        const width = container.clientWidth;
        const height = container.clientHeight || 500;

        // Enhanced scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f4f8);
        this.scene.fog = new THREE.Fog(0xf0f4f8, 50, 200);

        // Enhanced camera
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.set(25, 20, 25);
        this.camera.lookAt(0, 0, 0);

        // Enhanced renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;

        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);

        // Enhanced controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 2, 0);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.minDistance = 15;
        this.controls.maxDistance = 60;
        this.controls.maxPolarAngle = Math.PI / 2.2;
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.8;
        this.controls.rotateSpeed = 0.6;

        // Enhanced lighting
        this.setupLighting();

        // Enhanced office model
        this.loadEnhancedOfficeModel();

        // Raycaster for interactions
        this.raycaster = new THREE.Raycaster();
        this.setupInteractions();

        // Resize handler
        window.addEventListener('resize', () => this.handleResize());

        this.isInitialized = true;
        this.animate();
        this.setupEventHandlers();
    }

    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Main directional light (sun)
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(30, 40, 20);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 0.5;
        mainLight.shadow.camera.far = 100;
        mainLight.shadow.camera.left = -30;
        mainLight.shadow.camera.right = 30;
        mainLight.shadow.camera.top = 30;
        mainLight.shadow.camera.bottom = -30;
        this.scene.add(mainLight);

        // Fill light for softer shadows
        const fillLight = new THREE.DirectionalLight(0x7c85d6, 0.3);
        fillLight.position.set(-20, 20, -20);
        this.scene.add(fillLight);

        // Accent lights for warmth
        const accentLight1 = new THREE.PointLight(0xffc658, 0.5, 20);
        accentLight1.position.set(8, 8, 8);
        this.scene.add(accentLight1);

        const accentLight2 = new THREE.PointLight(0xff8a65, 0.4, 15);
        accentLight2.position.set(-8, 6, -8);
        this.scene.add(accentLight2);
    }

    loadEnhancedOfficeModel() {
        this.officeModel = new THREE.Group();
        this.scene.add(this.officeModel);

        // Enhanced materials
        const materials = {
            wall: new THREE.MeshStandardMaterial({
                color: 0xfafafa,
                roughness: 0.7,
                metalness: 0.1
            }),
            glass: new THREE.MeshPhysicalMaterial({
                color: 0x88c999,
                transparent: true,
                opacity: 0.3,
                roughness: 0.1,
                metalness: 0.1,
                transmission: 0.8,
                thickness: 0.5
            }),
            desk: new THREE.MeshStandardMaterial({
                color: 0x8b5a3c,
                roughness: 0.3,
                metalness: 0.1
            }),
            floor: new THREE.MeshStandardMaterial({
                color: 0xf5f5f5,
                roughness: 0.8,
                metalness: 0.05
            })
        };

        // Enhanced ground
        const groundGeometry = new THREE.PlaneGeometry(60, 60);
        const ground = new THREE.Mesh(groundGeometry, materials.floor);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Create enhanced office structure
        this.createOfficeStructure(materials);
        this.createDesks(materials);
        this.createMeetingRooms(materials);
        this.createDecorations();
    }

    createOfficeStructure(materials) {
        // Main office walls
        const walls = [
            { size: [30, 5, 0.3], position: [0, 2.5, -15] },
            { size: [30, 5, 0.3], position: [0, 2.5, 15] },
            { size: [0.3, 5, 30], position: [-15, 2.5, 0] },
            { size: [0.3, 5, 30], position: [15, 2.5, 0] }
        ];

        walls.forEach(wall => {
            const geometry = new THREE.BoxGeometry(...wall.size);
            const mesh = new THREE.Mesh(geometry, materials.wall);
            mesh.position.set(...wall.position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.officeModel.add(mesh);
        });
    }

    createDesks(materials) {
        const deskPositions = [
            { id: 'A1', pos: [-8, 0.5, -8], occupied: true, user: 'Sarah Chen' },
            { id: 'A2', pos: [-4, 0.5, -8], occupied: false, user: 'Marcus Johnson' },
            { id: 'B1', pos: [0, 0.5, -8], occupied: true, user: 'Elena Rodriguez' },
            { id: 'B2', pos: [4, 0.5, -8], occupied: true, user: 'David Kim' },
            { id: 'C1', pos: [8, 0.5, -8], occupied: false, user: 'Lisa Park' },
            { id: 'C2', pos: [-8, 0.5, 0], occupied: true, user: 'Alex Thompson' }
        ];

        deskPositions.forEach(desk => {
            const deskGroup = new THREE.Group();
            
            // Desk surface
            const deskGeometry = new THREE.BoxGeometry(3, 0.1, 1.5);
            const deskMesh = new THREE.Mesh(deskGeometry, materials.desk);
            deskMesh.castShadow = true;
            deskMesh.receiveShadow = true;
            deskGroup.add(deskMesh);

            // Monitor
            const monitorGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.05);
            const monitorMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
            const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
            monitor.position.set(0, 0.35, 0.3);
            deskGroup.add(monitor);

            // Chair
            const chairGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8);
            const chairMaterial = new THREE.MeshStandardMaterial({ 
                color: desk.occupied ? 0x4f46e5 : 0x94a3b8 
            });
            const chair = new THREE.Mesh(chairGeometry, chairMaterial);
            chair.position.set(0, 0.4, -1.2);
            deskGroup.add(chair);

            // Status indicator
            const indicatorGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const indicatorColor = desk.occupied ? 0x10b981 : 0xef4444;
            const indicatorMaterial = new THREE.MeshStandardMaterial({ 
                color: indicatorColor,
                emissive: indicatorColor,
                emissiveIntensity: 0.3
            });
            const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
            indicator.position.set(1.2, 1, 0);
            deskGroup.add(indicator);

            deskGroup.position.set(...desk.pos);
            deskGroup.userData = {
                type: 'desk',
                id: desk.id,
                occupied: desk.occupied,
                user: desk.user
            };

            this.desks.set(desk.id, deskGroup);
            this.officeModel.add(deskGroup);
        });
    }

    createMeetingRooms(materials) {
        const rooms = [
            { id: 'room1', pos: [10, 1.5, 10], size: [6, 3, 6], name: 'Innovation Hub' },
            { id: 'room2', pos: [-10, 1.5, 10], size: [6, 3, 6], name: 'Focus Room' }
        ];

        rooms.forEach(room => {
            const roomGroup = new THREE.Group();
            
            // Glass walls
            const walls = [
                { size: [room.size[0], room.size[1], 0.1], pos: [0, 0, -room.size[2]/2] },
                { size: [room.size[0], room.size[1], 0.1], pos: [0, 0, room.size[2]/2] },
                { size: [0.1, room.size[1], room.size[2]], pos: [-room.size[0]/2, 0, 0] },
                { size: [0.1, room.size[1], room.size[2]], pos: [room.size[0]/2, 0, 0] }
            ];

            walls.forEach(wall => {
                const geometry = new THREE.BoxGeometry(...wall.size);
                const mesh = new THREE.Mesh(geometry, materials.glass);
                mesh.position.set(...wall.pos);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                roomGroup.add(mesh);
            });

            // Conference table
            const tableGeometry = new THREE.BoxGeometry(4, 0.1, 2);
            const table = new THREE.Mesh(tableGeometry, materials.desk);
            table.position.set(0, 0.5, 0);
            table.castShadow = true;
            roomGroup.add(table);

            roomGroup.position.set(...room.pos);
            roomGroup.userData = {
                type: 'meeting-room',
                id: room.id,
                name: room.name,
                capacity: 8,
                available: Math.random() > 0.5
            };

            this.meetingRooms.set(room.id, roomGroup);
            this.officeModel.add(roomGroup);
        });
    }

    createDecorations() {
        // Plants
        const plantGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
        const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x4ade80 });
        
        const plantPositions = [
            [-12, 0.75, -12], [12, 0.75, -12], [0, 0.75, 12], [-6, 0.75, 6], [6, 0.75, 6]
        ];

        plantPositions.forEach(pos => {
            const plant = new THREE.Mesh(plantGeometry, plantMaterial);
            plant.position.set(...pos);
            plant.castShadow = true;
            this.officeModel.add(plant);
        });
    }

    setupInteractions() {
        this.renderer.domElement.addEventListener('click', (event) => {
            this.onMouseClick(event);
        });

        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.onMouseMove(event);
        });
    }

    onMouseClick(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.officeModel.children, true);

        if (intersects.length > 0) {
            let clickedObject = intersects[0].object;
            
            // Find the parent group with userData
            while (clickedObject && !clickedObject.userData.type) {
                clickedObject = clickedObject.parent;
            }

            if (clickedObject && clickedObject.userData.type === 'desk') {
                this.showDeskInfo(clickedObject.userData);
            } else if (clickedObject && clickedObject.userData.type === 'meeting-room') {
                this.showRoomInfo(clickedObject.userData);
            }
        }
    }

    onMouseMove(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.officeModel.children, true);

        // Change cursor for interactive objects
        if (intersects.length > 0) {
            let hoveredObject = intersects[0].object;
            while (hoveredObject && !hoveredObject.userData.type) {
                hoveredObject = hoveredObject.parent;
            }
            
            if (hoveredObject && (hoveredObject.userData.type === 'desk' || hoveredObject.userData.type === 'meeting-room')) {
                this.renderer.domElement.style.cursor = 'pointer';
                return;
            }
        }
        this.renderer.domElement.style.cursor = 'default';
    }

    showDeskInfo(deskData) {
        const panel = this.querySelector('#deskInfoPanel');
        if (!panel) return;

        const content = panel.querySelector('.desk-info-content');
        if (!content) return;
        
        const member = this.teamMembers.find(m => m.desk === deskData.id);
        
        content.innerHTML = `
            <div class="desk-details">
                <div class="desk-header">
                    <h5>Desk ${deskData.id}</h5>
                    <span class="desk-status ${deskData.occupied ? 'occupied' : 'available'}">
                        ${deskData.occupied ? 'Occupied' : 'Available'}
                    </span>
                </div>
                ${member ? `
                    <div class="assigned-user">
                        <div class="user-avatar">${member.avatar}</div>
                        <div class="user-details">
                            <span class="user-name">${member.name}</span>
                            <span class="user-role">${member.role}</span>
                            <span class="user-status ${member.status}">${this.getStatusIcon(member.status)} ${member.status.replace('-', ' ')}</span>
                        </div>
                    </div>
                ` : ''}
                <div class="desk-actions">
                    ${!deskData.occupied ? `
                        <button class="btn-primary book-desk" data-desk="${deskData.id}">
                            📅 Book This Desk
                        </button>
                    ` : `
                        <button class="btn-secondary" disabled>
                            Currently Occupied
                        </button>
                    `}
                </div>
            </div>
        `;
        
        panel.style.display = 'block';
        
        // Ensure panel is within bounds after showing
        requestAnimationFrame(() => {
            this.adjustPanelPositions();
        });
    }

    showRoomInfo(roomData) {
        const panel = this.querySelector('#deskInfoPanel');
        if (!panel) return;

        const content = panel.querySelector('.desk-info-content');
        if (!content) return;
        
        content.innerHTML = `
            <div class="room-details">
                <div class="room-header">
                    <h5>${roomData.name}</h5>
                    <span class="room-status ${roomData.available ? 'available' : 'occupied'}">
                        ${roomData.available ? 'Available' : 'In Use'}
                    </span>
                </div>
                <div class="room-info">
                    <p><strong>Capacity:</strong> ${roomData.capacity} people</p>
                    <p><strong>Equipment:</strong> 4K Display, Video Conferencing</p>
                    <p><strong>Next Available:</strong> ${roomData.available ? 'Now' : '2:30 PM'}</p>
                </div>
                <div class="room-actions">
                    ${roomData.available ? `
                        <button class="btn-primary book-room" data-room="${roomData.id}">
                            📅 Book Meeting Room
                        </button>
                    ` : `
                        <button class="btn-secondary" disabled>
                            Currently in Use
                        </button>
                    `}
                </div>
            </div>
        `;
        
        panel.style.display = 'block';
        
        // Ensure panel is within bounds after showing
        requestAnimationFrame(() => {
            this.adjustPanelPositions();
        });
    }

    setupEventHandlers() {
        // Floor buttons
        this.querySelectorAll('.floor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const floor = parseInt(e.currentTarget.dataset.floor);
                this.switchToFloor(floor);
                
                this.querySelectorAll('.floor-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Control buttons
        this.querySelector('#resetView')?.addEventListener('click', () => {
            this.resetCameraView();
            // Close any open panels when resetting view
            this.closeAllPanels();
        });

        // Team member interactions
        this.querySelectorAll('.team-member').forEach(member => {
            member.addEventListener('click', (e) => {
                const deskId = e.currentTarget.dataset.desk;
                this.focusOnDesk(deskId);
                
                // Close desk info panel before showing new one
                const deskInfoPanel = this.querySelector('#deskInfoPanel');
                if (deskInfoPanel) {
                    deskInfoPanel.style.display = 'none';
                }
            });
        });

        // Panel toggles
        this.querySelectorAll('.panel-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const panel = e.currentTarget.closest('.team-panel, .floor-selector');
                if (panel) {
                    panel.classList.toggle('collapsed');
                    // Update toggle button aria-expanded state
                    e.currentTarget.setAttribute('aria-expanded', 
                        !panel.classList.contains('collapsed'));
                }
                e.stopPropagation();
            });
        });

        // Close panels when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.office-visualizer')) {
                this.closeAllPanels();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllPanels();
            }
        });

        // Prevent panel drag
        this.querySelectorAll('.team-panel, .floor-selector, .legend, .desk-info-panel').forEach(panel => {
            panel.addEventListener('mousedown', (e) => {
                if (e.target.closest('.panel-header, .close-panel')) {
                    e.stopPropagation();
                }
            });
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
                this.adjustPanelPositions();
            }, 100);
        });
    }

    closeAllPanels() {
        const deskInfoPanel = this.querySelector('#deskInfoPanel');
        if (deskInfoPanel) {
            deskInfoPanel.style.display = 'none';
        }
        
        this.querySelectorAll('.team-panel, .floor-selector').forEach(panel => {
            panel.classList.add('collapsed');
            const toggle = panel.querySelector('.panel-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    adjustPanelPositions() {
        const visualizer = this.querySelector('.office-visualizer');
        if (!visualizer) return;

        const bounds = visualizer.getBoundingClientRect();
        const panels = this.querySelectorAll('.team-panel, .floor-selector, .legend, .desk-info-panel');

        panels.forEach(panel => {
            const panelBounds = panel.getBoundingClientRect();
            
            // Ensure panels don't go outside visualizer bounds
            if (panelBounds.right > bounds.right) {
                panel.style.right = '0';
                panel.style.left = 'auto';
            }
            if (panelBounds.left < bounds.left) {
                panel.style.left = '0';
                panel.style.right = 'auto';
            }
            if (panelBounds.bottom > bounds.bottom) {
                panel.style.bottom = '0';
                panel.style.top = 'auto';
            }
            if (panelBounds.top < bounds.top) {
                panel.style.top = '0';
                panel.style.bottom = 'auto';
            }
        });
    }

    focusOnDesk(deskId) {
        const desk = this.desks.get(deskId);
        if (desk) {
            const targetPos = desk.position.clone();
            targetPos.y += 10;
            targetPos.z += 8;
            
            this.animateCameraTo(targetPos, desk.position);
        }
    }

    animateCameraTo(position, lookAt) {
        const startPos = this.camera.position.clone();
        const startLookAt = this.controls.target.clone();
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            this.camera.position.lerpVectors(startPos, position, easeProgress);
            this.controls.target.lerpVectors(startLookAt, lookAt, easeProgress);
            this.controls.update();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    resetCameraView() {
        const targetPos = new THREE.Vector3(25, 20, 25);
        const targetLookAt = new THREE.Vector3(0, 2, 0);
        this.animateCameraTo(targetPos, targetLookAt);
    }

    switchToFloor(floor) {
        this.currentFloor = floor;
        const targetHeight = 20 + ((floor - 1) * 8);
        const targetPos = new THREE.Vector3(25, targetHeight, 25);
        const targetLookAt = new THREE.Vector3(0, (floor - 1) * 5, 0);
        
        this.animateCameraTo(targetPos, targetLookAt);
    }

    animate() {
        if (!this.isInitialized) return;

        this.animationFrame = requestAnimationFrame(() => this.animate());

        if (this.controls) {
            this.controls.update();
        }

        // Animate status indicators
        this.desks.forEach(desk => {
            const indicator = desk.children.find(child => 
                child.geometry && child.geometry.type === 'SphereGeometry'
            );
            if (indicator && desk.userData.occupied) {
                indicator.position.y = 1 + Math.sin(Date.now() * 0.003) * 0.1;
            }
        });

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    handleResize() {
        const container = this.querySelector('#visualizerCanvas');
        const width = container.clientWidth;
        const height = container.clientHeight || 500;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
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
                        Office Space Overview
                    </h3>
                </div>
                <div class="fallback-content">
                    <div class="office-grid">
                        ${this.teamMembers.map(member => `
                            <div class="office-area workspace" data-status="${member.status}">
                                <div class="area-header">
                                    <span class="member-avatar">${member.avatar}</span>
                                    <span class="area-label">${member.name}</span>
                                </div>
                                <span class="status-badge">${member.role}</span>
                                <span class="status-badge ${member.status}">${this.getStatusIcon(member.status)} ${member.status.replace('-', ' ')}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    disconnectedCallback() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.isInitialized = false;
        this.renderer?.dispose();
        this.scene?.clear();
        window.removeEventListener('resize', () => this.handleResize());
    }
}

customElements.define('office-visualizer', OfficeVisualizer); 