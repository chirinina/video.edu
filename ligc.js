        document.getElementById('menuBtn').addEventListener('click', function (event) {
            event.stopPropagation(); // Evita que el clic se propague y cierre inmediatamente el menú
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            const sidebar = document.getElementById('sidebar');
            const menuBtn = document.getElementById('menuBtn');
            if (!sidebar.contains(event.target) && !menuBtn.contains(event.target)) {
                sidebar.classList.remove('active');
            }
        });

        const CONFIG = {
        users: [
            { username: "admin", password: "admin123", name: "Administrador", courseId: 0 },
            { username: "user1", password: "user123", name: "Estudiante de", courseId: 1 },
            { username: "user2", password: "user456", name: "Estudiante de", courseId: 2 },
            { username: "echirinina", password: "13071262", name: "Estudiante de", courseId: 4 }
        ],
        courses: [
            {
                id: 1,
                name: "Diplomado en Diseño BIM Avanzado",
                category: "Diplomado",
                folder: "https://drive.google.com/drive/folders/1pY7i4h6eVMCJHftXJ4CGVLgLWq4a03-h",
                modules: [
                    {
                        name: "Módulo 0: Introducción",
                        videos: [
                            {
                                title: "Presentación del Curso",
                                duration: "15:00",
                                url: "https://drive.google.com/file/d/1seGygops0Gg9XnQ0Tm93U3HyumcJxXTN/view",
                                icon: 'bx bx-play-circle'
                            },
                            {
                                title: "Fundamentos del Diseño BIM",
                                duration: "22:30",
                                url: "https://drive.google.com/file/d/17z64K7P8kAqp2pX8pPgIMOgy40rVYCrn/view",
                                icon: 'bx bx-slideshow'
                            }
                        ]
                    },
                    {
                        name: "Módulo 1: Herramientas Básicas",
                        videos: [
                            {
                                title: "Introducción a AutoCAD",
                                duration: "18:45",
                                url: "https://drive.google.com/file/d/1-I8p_CVyWH4v9wS9TibJSfuNyU5s4IIQ/view",
                                icon: 'bx bx-cube'
                            },
                            {
                                title: "Modelado 3D Básico",
                                duration: "25:20",
                                url: "https://drive.google.com/file/d/11ZTW3GndAUtma5_gGx5wYcjZbj13l_9c/view",
                                icon: 'bx bx-shape-polygon'
                            }
                        ]
                    },
                    {
                        name: "Módulo 1: ",
                        videos: [
                            {
                                title: "Introducción a AutoCAD",
                                duration: "18:45",
                                url: "https://drive.google.com/file/d/1-I8p_CVyWH4v9wS9TibJSfuNyU5s4IIQ/view",
                                icon: 'bx bx-cube'
                            },
                            {
                                title: "Modelado 3D Básico",
                                duration: "25:20",
                                url: "https://drive.google.com/file/d/11ZTW3GndAUtma5_gGx5wYcjZbj13l_9c/view",
                                icon: 'bx bx-shape-polygon'
                            }
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Maestría en Derecho Constitucional",
                category: "Maestría",
                folder: "https://drive.google.com/drive/folders/1PX6kSf9gfi7CSaXBCd6KgOOE_oGLGfef",
                modules: [
                    {
                        name: "Módulo 0: Introducción al Derecho",
                        videos: [
                            {
                                title: "Bases Constitucionales",
                                duration: "20:00",
                                url: "https://drive.google.com/file/d/1iWKgGrYKuvsLVgBB9J5r-kQ4R3Tou268/view",
                                icon: 'bx bx-book'
                            }
                        ]
                    },
                    {
                        name: "Módulo 2",
                        videos: [
                            {
                                title: "Bases Constitucionales",
                                duration: "20:00",
                                url: "https://drive.google.com/file/d/1iWKgGrYKuvsLVgBB9J5r-kQ4R3Tou268/view",
                                icon: 'bx bx-book'
                            }
                        ]
                    },
                    {
                        name: "Módulo 3",
                        videos: [
                            {
                                title: "Bases Constitucionales",
                                duration: "20:00",
                                url: "https://drive.google.com/file/d/1iWKgGrYKuvsLVgBB9J5r-kQ4R3Tou268/view",
                                icon: 'bx bx-book'
                            }
                        ]
                    }
                ]
            },
            {
                id: 4,
                name: "Secretariado Inteligente con IA",
                category: "Curso",
                folder: "https://drive.google.com/drive/folders/1F9tA6f2wpH_h8cTWY0qrCVXXBhzcmFeh",
                modules: [
                    {
                        name: "Módulo 0: Introducción a la IA",
                        videos: [
                            {
                                title: "Clase 1: Conceptos Básicos",
                                duration: "18:00",
                                url: "https://drive.google.com/file/d/1vp43J7M1GzkUHtjG6dZIAO6lI-Pju5km/view",
                                icon: 'bx bx-brain'
                            }
                        ]
                    }
                ]
            }
        ]
        };

        class EducationPlatform {
        constructor() {
            this.currentUser = null;
            this.currentCourse = null;
            this.inactivityTimer = null;
            this.init();
        }

        init() {
            this.initAuth();
            this.initInactivityListener();
            document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        }

        initAuth() {
            document.getElementById('loginForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        initInactivityListener() {
            const events = ['mousemove', 'keypress', 'click', 'scroll'];
            events.forEach(event => {
                window.addEventListener(event, () => this.resetInactivityTimer());
            });
        }

        resetInactivityTimer() {
            clearTimeout(this.inactivityTimer);
            this.inactivityTimer = setTimeout(() => {
                this.logout();
                alert('Su sesión ha expirado por inactividad');
            }, 900000); // 15 minutos
        }

        handleLogin() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const user = CONFIG.users.find(u => 
                u.username === username && u.password === password
            );

            if (user) {
                this.currentUser = user;
                this.loadCourse();
                this.showDashboard();
            } else {
                alert('Credenciales incorrectas');
            }
        }

        logout() {
            this.currentUser = null;
            this.currentCourse = null;
            document.querySelector('.auth-container').style.display = 'flex';
            document.getElementById('dashboard').style.display = 'none';
            clearTimeout(this.inactivityTimer);
            document.getElementById('loginForm').reset();
        }

        loadCourse() {
            this.currentCourse = this.currentUser.courseId === 0 
                ? CONFIG.courses[0] 
                : CONFIG.courses.find(c => c.id === this.currentUser.courseId);
        }

        showDashboard() {
            document.querySelector('.auth-container').style.display = 'none';
            document.getElementById('dashboard').style.display = 'grid';
            this.renderCourseInfo();
            this.renderModules();
            this.renderUserInfo();
            this.resetInactivityTimer();
        }

        renderCourseInfo() {
            document.getElementById('courseTitle').textContent = this.currentCourse.name;
            document.getElementById('driveLink').href = this.currentCourse.folder;
        }

        renderUserInfo() {
            document.getElementById('userInfo').textContent = 
                `${this.currentUser.name} | ${this.currentCourse.category}`;
        }

        renderModules() {
            const container = document.getElementById('moduleList');
            container.innerHTML = this.currentCourse.modules
                .map((module, index) => `
                    <li class="module-item" data-module="${index}">
                        <i class='bx bx-video' style="color: #00a5e7;"></i>

                        ${module.name}
                    </li>
                `).join('');

            container.querySelectorAll('.module-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    this.loadModule(parseInt(e.currentTarget.dataset.module));
                });
            });

            this.loadModule(0);
        }

        loadModule(moduleIndex) {
            const module = this.currentCourse.modules[moduleIndex];
            document.getElementById('currentModuleTitle').textContent = module.name;
            this.renderVideos(module.videos);
        }

        renderVideos(videos) {
            const container = document.getElementById('videoGrid');
            container.innerHTML = videos.map(video => `
                <div class="video-card">
                    <div class="video-thumbnail">
                        <i class='bx ${video.icon}' style="font-size: 3rem;"></i>
                    </div>
                    <div class="video-info">
                        <h3>${video.title}</h3>
                        <div class="video-meta">
                            <span style="display: flex; align-items: center; gap: 0.5rem; color: #64748b;">
                                <i class='bx bx-time'></i> ${video.duration}
                            </span>
                            <div style="display: flex; gap: 0.5rem;">
                                <button class="btn btn-primary" 
                                    onclick="window.open('${video.url}', '_blank')">
                                    <i class='bx bx-play'></i> Ver
                                </button>
                                <button class="btn-icon" 
                                        onclick="window.open('${video.url}', '_blank', 'width=800,height=600')" 
                                        style="background: none; border: none;">
                                    <i class='bx bx-expand' style="font-size: 30px; font-weight: bold; color: green;"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        }

         const platform = new EducationPlatform();
            // Función para mostrar/ocultar la sidebar
            function toggleSidebar() {
            document.querySelector('.sidebar').classList.toggle('show');
        }

        // Para mostrarla al cargar la página (opcional)
        window.onload = function() {
            toggleSidebar();  // Esto la muestra automáticamente
        };

        // Alternativamente, puedes activar la sidebar con un botón:
        document.querySelector('.btn-toggle').addEventListener('click', toggleSidebar);

        const togglePassword = document.getElementById("togglePassword");
        const passwordField = document.getElementById("password");
                
        togglePassword.addEventListener("click", function () {
         // Cambiar el tipo del input entre 'password' y 'text'
         const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;
                
        // Cambiar el ícono entre "eye" y "eye-slash"
        this.classList.toggle("fa-eye-slash");
        });
            