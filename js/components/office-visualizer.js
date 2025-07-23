// Enhanced Office Visualizer Component - Dream Workspace Edition
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
        this.mouse = null; // Will be initialized when THREE.js is available
        this.selectedDesk = null;
        this.teamMembers = this.generateTeamData();
        this.officeStats = this.generateOfficeStats();
    }

    connectedCallback() {
        console.log('Office Visualizer: connectedCallback called');
        
        try {
            // Always show the Dream Workspace Hub design
            console.log('Office Visualizer: Rendering Dream Workspace Hub');
            this.renderDreamWorkspace();
            console.log('Office Visualizer: Dream Workspace Hub rendered successfully');
        } catch (error) {
            console.error('Error in connectedCallback:', error);
            this.showFallbackContent();
        }
    }

    generateTeamData() {
        return [
            { id: 1, name: "Sarah Chen", role: "UX Designer", status: "in-office", desk: "A1", avatar: "👩‍💻", department: "Design", location: "Main Floor" },
            { id: 2, name: "Marcus Johnson", role: "Frontend Dev", status: "remote", desk: "A2", avatar: "👨‍💼", department: "Engineering", location: "Remote" },
            { id: 3, name: "Elena Rodriguez", role: "Product Manager", status: "in-meeting", desk: "B1", avatar: "👩‍💼", department: "Product", location: "Meeting Hub" },
            { id: 4, name: "David Kim", role: "Backend Dev", status: "in-office", desk: "B2", avatar: "👨‍💻", department: "Engineering", location: "Main Floor" },
            { id: 5, name: "Lisa Park", role: "Data Analyst", status: "lunch", desk: "C1", avatar: "👩‍🔬", department: "Analytics", location: "Main Floor" },
            { id: 6, name: "Alex Thompson", role: "DevOps", status: "in-office", desk: "C2", avatar: "👨‍🔧", department: "Engineering", location: "Main Floor" },
            { id: 7, name: "Maria Garcia", role: "Marketing Lead", status: "in-office", desk: "D1", avatar: "👩‍💼", department: "Marketing", location: "Main Floor" },
            { id: 8, name: "James Wilson", role: "Sales Director", status: "in-meeting", desk: "D2", avatar: "👨‍💼", department: "Sales", location: "Meeting Hub" }
        ];
    }

    generateOfficeStats() {
        return {
            totalDesks: 24,
            occupiedDesks: 18,
            availableDesks: 6,
            meetingRooms: 8,
            activeMeetings: 3,
            availableRooms: 5,
            totalFloors: 3,
            currentFloor: 1,
            departments: 6,
            remoteWorkers: 4,
            inOfficeWorkers: 14
        };
    }

    renderDreamWorkspace() {
        console.log('🎉 DREAM WORKSPACE HUB V2 LOADED! 🎉');
        console.log('Office Visualizer: Starting renderDreamWorkspace');
        
        // Ensure the component is visible
        this.style.display = 'block';
        this.style.visibility = 'visible';
        this.style.opacity = '1';
        
        this.innerHTML = `
            <div class="dream-workspace">
                <!-- Enhanced Background Elements -->
                <div class="workspace-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
                
                <!-- Workspace Header -->
                <div class="workspace-header">
                    <div class="header-content">
                        <h2 class="workspace-title">
                            <svg class="workspace-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Dream Workspace Hub
                        </h2>
                        <p class="workspace-subtitle">Your perfect digital workspace - where innovation meets collaboration</p>
                        <div class="workspace-status">
                            <span class="status-indicator online"></span>
                            <span class="status-text">All systems operational • ${this.officeStats.inOfficeWorkers} team members active</span>
                        </div>
                    </div>
                    
                    <!-- Workspace Stats -->
                    <div class="workspace-stats">
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.occupiedDesks}/${this.officeStats.totalDesks}</span>
                            <span class="stat-label">Desks Active</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.activeMeetings}</span>
                            <span class="stat-label">Live Meetings</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.availableRooms}</span>
                            <span class="stat-label">Rooms Free</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.remoteWorkers}</span>
                            <span class="stat-label">Remote Team</span>
                        </div>
                    </div>
                </div>

                <!-- Main Workspace Content -->
                <div class="workspace-content">
                    <!-- Live Activity Feed -->
                    <div class="activity-feed-section">
                        <div class="section-header">
                            <h3>Live Activity Feed</h3>
                            <span class="live-indicator">LIVE</span>
                        </div>
                        <div class="activity-stream">
                            <div class="activity-item">
                                <div class="activity-avatar">👩‍💻</div>
                                <div class="activity-content">
                                    <span class="activity-user">Sarah Chen</span>
                                    <span class="activity-action">joined the Design Review meeting</span>
                                    <span class="activity-time">2 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">👨‍💼</div>
                                <div class="activity-content">
                                    <span class="activity-user">Marcus Johnson</span>
                                    <span class="activity-action">completed task "Update homepage"</span>
                                    <span class="activity-time">5 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">👩‍💼</div>
                                <div class="activity-content">
                                    <span class="activity-user">Elena Rodriguez</span>
                                    <span class="activity-action">shared document "Q4 Strategy"</span>
                                    <span class="activity-time">8 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">🎉</div>
                                <div class="activity-content">
                                    <span class="activity-user">Team Achievement</span>
                                    <span class="activity-action">reached 100% project completion</span>
                                    <span class="activity-time">12 min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions Hub -->
                    <div class="quick-actions-hub">
                        <div class="section-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div class="actions-grid">
                            <button class="action-card primary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                <span>New Project</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                <span>Schedule Meeting</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <span>Create Document</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span>Invite Team</span>
                            </button>
                        </div>
                    </div>

                    <!-- Team Spotlight -->
                    <div class="team-spotlight-section">
                        <div class="section-header">
                            <h3>Team Spotlight</h3>
                            <span class="spotlight-badge">This Week</span>
                        </div>
                        <div class="spotlight-grid">
                            ${this.teamMembers.slice(0, 4).map(member => `
                                <div class="spotlight-card ${member.status}">
                                    <div class="member-avatar-large">${member.avatar}</div>
                                    <div class="member-info">
                                        <h4 class="member-name">${member.name}</h4>
                                        <p class="member-role">${member.role}</p>
                                        <div class="member-status-indicator">
                                            <span class="status-dot ${member.status}"></span>
                                            <span class="status-text">${member.status.replace('-', ' ')}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Office Map -->
                    <div class="office-map-section">
                        <div class="section-header">
                            <h3>Office Map</h3>
                            <span class="map-status">${this.officeStats.inOfficeWorkers} people in office</span>
                        </div>
                        <div class="office-grid">
                            <!-- Meeting Rooms -->
                            <div class="office-area">
                                <h4>Meeting Rooms</h4>
                                <div class="room-list">
                                    <div class="room available">
                                        <div class="room-info">
                                            <span class="room-name">Room A</span>
                                            <span class="room-status">Available</span>
                                        </div>
                                        <button class="book-btn">Book</button>
                                    </div>
                                    <div class="room occupied">
                                        <div class="room-info">
                                            <span class="room-name">Room B</span>
                                            <span class="room-status">In Use</span>
                                        </div>
                                        <button class="book-btn" disabled>Occupied</button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Workstations -->
                            <div class="office-area">
                                <h4>Workstations</h4>
                                <div class="desk-list">
                                    <div class="desk occupied">
                                        <div class="desk-info">
                                            <span class="desk-name">A1</span>
                                            <span class="desk-user">👩‍💻 Sarah Chen</span>
                                        </div>
                                    </div>
                                    <div class="desk occupied">
                                        <div class="desk-info">
                                            <span class="desk-name">A2</span>
                                            <span class="desk-user">👨‍💻 David Kim</span>
                                        </div>
                                    </div>
                                    <div class="desk available">
                                        <div class="desk-info">
                                            <span class="desk-name">A3</span>
                                            <span class="desk-status">Available</span>
                                        </div>
                                        <button class="book-btn">Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Events -->
                    <div class="events-wrapper">
                        <div class="events-section">
                            <div class="section-header">
                                <h3>Upcoming Events</h3>
                                <span class="events-count">3 today</span>
                            </div>
                            <div class="events-content">
                                <div class="event-card">
                                    <time class="event-time">10:00</time>
                                    <div class="event-details">
                                        <h4>Design Review</h4>
                                        <p>Room A • 5 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                                <div class="event-card">
                                    <time class="event-time">2:30</time>
                                    <div class="event-details">
                                        <h4>Standup</h4>
                                        <p>Virtual • 12 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                                <div class="event-card">
                                    <time class="event-time">4:00</time>
                                    <div class="event-details">
                                        <h4>Client Demo</h4>
                                        <p>Hub • 8 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resources Hub -->
                    <div class="resources-section">
                        <div class="section-header">
                            <h3>Quick Resources</h3>
                        </div>
                        <div class="resources-grid">
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <span>Employee Handbook</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 12l2 2 4-4"/>
                                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                                </svg>
                                <span>IT Support</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <span>Training Portal</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <polyline points="16 6 12 2 8 6"/>
                                    <line x1="12" y1="2" x2="12" y2="15"/>
                                </svg>
                                <span>Benefits Info</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ensure the component is visible
        this.style.display = 'block';
        this.style.visibility = 'visible';
        this.style.opacity = '1';
        this.style.minHeight = '700px';
        
        console.log('Office Visualizer: Dream workspace rendered successfully');
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
        const panel = this.querySelector('#infoPanel');
        if (!panel) return;

        const content = panel.querySelector('.info-content');
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
        const panel = this.querySelector('#infoPanel');
        if (!panel) return;

        const content = panel.querySelector('.info-content');
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
                const deskInfoPanel = this.querySelector('#infoPanel');
                if (deskInfoPanel) {
                    deskInfoPanel.style.display = 'none';
                }
            });
        });

        // Panel toggles
        this.querySelectorAll('.panel-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const panel = e.currentTarget.closest('.team-panel, .floor-panel');
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
            if (!e.target.closest('.dream-workspace')) {
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
        this.querySelectorAll('.team-panel, .floor-panel, .legend-panel').forEach(panel => {
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

        // Action buttons
        this.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleAction(action);
            });
        });

        // Toggle mode button
        this.querySelector('#toggleMode')?.addEventListener('click', () => {
            this.toggleViewMode();
        });
    }

    handleAction(action) {
        switch (action) {
            case 'book-desk':
                this.showNotification('Desk booking feature coming soon!', 'info');
                break;
            case 'schedule-meeting':
                this.showNotification('Meeting scheduler will be available soon!', 'info');
                break;
            case 'find-colleague':
                this.showNotification('Colleague finder feature coming soon!', 'info');
                break;
            case 'workspace-map':
                this.showNotification('Interactive workspace map coming soon!', 'info');
                break;
            default:
                console.log('Action not implemented:', action);
        }
    }

    toggleViewMode() {
        const canvas = this.querySelector('#visualizerCanvas');
        if (canvas) {
            canvas.classList.toggle('enhanced-mode');
            this.showNotification('View mode toggled!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `workspace-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to workspace
        const workspace = this.querySelector('.dream-workspace');
        if (workspace) {
            workspace.appendChild(notification);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 3000);
        }
    }

    closeAllPanels() {
        const deskInfoPanel = this.querySelector('#infoPanel');
        if (deskInfoPanel) {
            deskInfoPanel.style.display = 'none';
        }
        
        this.querySelectorAll('.team-panel, .floor-panel').forEach(panel => {
            panel.classList.add('collapsed');
            const toggle = panel.querySelector('.panel-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    adjustPanelPositions() {
        const visualizer = this.querySelector('.dream-workspace');
        if (!visualizer) return;

        const bounds = visualizer.getBoundingClientRect();
        const panels = this.querySelectorAll('.team-panel, .floor-panel, .legend-panel');

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

    handleResize = () => {
        if (this.renderer && this.camera) {
            const container = this.querySelector('#visualizerCanvas');
            if (container) {
                const width = container.clientWidth;
                const height = container.clientHeight || 500;
                this.camera.aspect = width / height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(width, height);
            }
        }
    }

    showFallbackContent() {
        console.log('Office Visualizer: Showing fallback content');
        
        this.innerHTML = `
            <div class="dream-workspace fallback" style="display: block; visibility: visible; opacity: 1; min-height: 700px;">
                <div class="workspace-header">
                    <div class="header-content">
                        <h2 class="workspace-title">
                            <svg class="workspace-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Dream Workspace Hub
                        </h2>
                        <p class="workspace-subtitle">Your perfect digital workspace - where innovation meets collaboration</p>
                        <div class="workspace-status">
                            <span class="status-indicator online"></span>
                            <span class="status-text">All systems operational • ${this.officeStats.inOfficeWorkers} team members active</span>
                        </div>
                    </div>
                    
                    <!-- Workspace Stats -->
                    <div class="workspace-stats">
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.occupiedDesks}/${this.officeStats.totalDesks}</span>
                            <span class="stat-label">Desks Active</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.activeMeetings}</span>
                            <span class="stat-label">Live Meetings</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.availableRooms}</span>
                            <span class="stat-label">Rooms Free</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${this.officeStats.remoteWorkers}</span>
                            <span class="stat-label">Remote Team</span>
                        </div>
                    </div>
                </div>
                
                <div class="workspace-content">
                    <!-- Live Activity Feed -->
                    <div class="activity-feed-section">
                        <div class="section-header">
                            <h3>Live Activity Feed</h3>
                            <span class="live-indicator">LIVE</span>
                        </div>
                        <div class="activity-stream">
                            <div class="activity-item">
                                <div class="activity-avatar">👩‍💻</div>
                                <div class="activity-content">
                                    <span class="activity-user">Sarah Chen</span>
                                    <span class="activity-action">joined the Design Review meeting</span>
                                    <span class="activity-time">2 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">👨‍💼</div>
                                <div class="activity-content">
                                    <span class="activity-user">Marcus Johnson</span>
                                    <span class="activity-action">completed task "Update homepage"</span>
                                    <span class="activity-time">5 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">👩‍💼</div>
                                <div class="activity-content">
                                    <span class="activity-user">Elena Rodriguez</span>
                                    <span class="activity-action">shared document "Q4 Strategy"</span>
                                    <span class="activity-time">8 min ago</span>
                                </div>
                            </div>
                            <div class="activity-item">
                                <div class="activity-avatar">🎉</div>
                                <div class="activity-content">
                                    <span class="activity-user">Team Achievement</span>
                                    <span class="activity-action">reached 100% project completion</span>
                                    <span class="activity-time">12 min ago</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Actions Hub -->
                    <div class="quick-actions-hub">
                        <div class="section-header">
                            <h3>Quick Actions</h3>
                        </div>
                        <div class="actions-grid">
                            <button class="action-card primary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 5v14M5 12h14"/>
                                </svg>
                                <span>New Project</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                                <span>Schedule Meeting</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <span>Create Document</span>
                            </button>
                            <button class="action-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span>Invite Team</span>
                            </button>
                        </div>
                    </div>

                    <!-- Team Spotlight -->
                    <div class="team-spotlight-section">
                        <div class="section-header">
                            <h3>Team Spotlight</h3>
                            <span class="spotlight-badge">This Week</span>
                        </div>
                        <div class="spotlight-grid">
                            ${this.teamMembers.slice(0, 4).map(member => `
                                <div class="spotlight-card ${member.status}">
                                    <div class="member-avatar-large">${member.avatar}</div>
                                    <div class="member-info">
                                        <h4 class="member-name">${member.name}</h4>
                                        <p class="member-role">${member.role}</p>
                                        <div class="member-status-indicator">
                                            <span class="status-dot ${member.status}"></span>
                                            <span class="status-text">${member.status.replace('-', ' ')}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Upcoming Events -->
                    <div class="events-section">
                        <div class="section-header">
                            <h3>Upcoming Events</h3>
                            <span class="events-count">${this.officeStats.activeMeetings} today</span>
                        </div>
                        <div class="events-list">
                            <div class="event-card">
                                <div class="event-time">10:00 AM</div>
                                <div class="event-details">
                                    <h4>Design Review Meeting</h4>
                                    <p>Conference Room A • 5 participants</p>
                                </div>
                                <button class="join-btn">Join</button>
                            </div>
                            <div class="event-card">
                                <div class="event-time">2:30 PM</div>
                                <div class="event-details">
                                    <h4>Weekly Standup</h4>
                                    <p>Virtual Meeting • 12 participants</p>
                                </div>
                                <button class="join-btn">Join</button>
                            </div>
                            <div class="event-card">
                                <div class="event-time">4:00 PM</div>
                                <div class="event-details">
                                    <h4>Client Presentation</h4>
                                    <p>Meeting Hub • 8 participants</p>
                                </div>
                                <button class="join-btn">Join</button>
                            </div>
                        </div>
                    </div>

                    <!-- Office Map -->
                    <div class="office-map-section">
                        <div class="section-header">
                            <h3>Office Map</h3>
                            <span class="map-status">${this.officeStats.inOfficeWorkers} people in office</span>
                        </div>
                        <div class="office-grid">
                            <!-- Meeting Rooms -->
                            <div class="office-area">
                                <h4>Meeting Rooms</h4>
                                <div class="room-list">
                                    <div class="room available">
                                        <div class="room-info">
                                            <span class="room-name">Room A</span>
                                            <span class="room-status">Available</span>
                                        </div>
                                        <button class="book-btn">Book</button>
                                    </div>
                                    <div class="room occupied">
                                        <div class="room-info">
                                            <span class="room-name">Room B</span>
                                            <span class="room-status">In Use</span>
                                        </div>
                                        <button class="book-btn" disabled>Occupied</button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Workstations -->
                            <div class="office-area">
                                <h4>Workstations</h4>
                                <div class="desk-list">
                                    <div class="desk occupied">
                                        <div class="desk-info">
                                            <span class="desk-name">A1</span>
                                            <span class="desk-user">👩‍💻 Sarah Chen</span>
                                        </div>
                                    </div>
                                    <div class="desk occupied">
                                        <div class="desk-info">
                                            <span class="desk-name">A2</span>
                                            <span class="desk-user">👨‍💻 David Kim</span>
                                        </div>
                                    </div>
                                    <div class="desk available">
                                        <div class="desk-info">
                                            <span class="desk-name">A3</span>
                                            <span class="desk-status">Available</span>
                                        </div>
                                        <button class="book-btn">Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Upcoming Events -->
                    <div class="events-container">
                        <div class="events-section">
                            <div class="section-header">
                                <h3>Upcoming Events</h3>
                                <span class="events-count">3 today</span>
                            </div>
                            <div class="events-list">
                                <div class="event-card">
                                    <div class="event-time">10:00</div>
                                    <div class="event-details">
                                        <h4>Design Review</h4>
                                        <p>Room A • 5 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                                <div class="event-card">
                                    <div class="event-time">2:30</div>
                                    <div class="event-details">
                                        <h4>Standup</h4>
                                        <p>Virtual • 12 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                                <div class="event-card">
                                    <div class="event-time">4:00</div>
                                    <div class="event-details">
                                        <h4>Client Demo</h4>
                                        <p>Hub • 8 people</p>
                                    </div>
                                    <button class="join-btn">Join</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Resources Hub -->
                    <div class="resources-section">
                        <div class="section-header">
                            <h3>Quick Resources</h3>
                        </div>
                        <div class="resources-grid">
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                </svg>
                                <span>Employee Handbook</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 12l2 2 4-4"/>
                                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
                                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
                                </svg>
                                <span>IT Support</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                                <span>Training Portal</span>
                            </a>
                            <a href="#" class="resource-card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <polyline points="16 6 12 2 8 6"/>
                                    <line x1="12" y1="2" x2="12" y2="15"/>
                                </svg>
                                <span>Benefits Info</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Ensure the component is visible
        this.style.display = 'block';
        this.style.visibility = 'visible';
        this.style.opacity = '1';
        this.style.minHeight = '700px';
        
        console.log('Office Visualizer: Fallback content displayed');
    }

    disconnectedCallback() {
        console.log('Office Visualizer disconnecting...');
        
        // Cancel animation frame
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        // Clean up Three.js scene
        if (this.scene) {
            this.scene.clear();
            this.scene = null;
        }
        
        // Clean up renderer
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer = null;
        }
        
        // Remove window event listeners
        window.removeEventListener('resize', this.handleResize);
        
        console.log('Office Visualizer cleanup complete');
    }
}

customElements.define('office-visualizer', OfficeVisualizer);
console.log('Office Visualizer component registered successfully'); 