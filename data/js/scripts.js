// ========================================
// SCRIPT ANTI-DEBUG COMPLET
// ========================================

(function() {
    'use strict';
    
    // === DÉSACTIVATION CLIC DROIT ET SÉLECTION ===
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('❌ Clic droit désactivé !');
        return false;
    });

    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // CSS pour désactiver la sélection
    document.addEventListener('DOMContentLoaded', function() {
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
    });

    // === DÉSACTIVATION RACCOURCIS CLAVIER ===
    document.addEventListener('keydown', function(e) {
        // F12 (DevTools)
        if (e.keyCode === 123) {
            e.preventDefault();
            alert('🚫 F12 désactivé !');
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            alert('🚫 DevTools désactivés !');
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            alert('🚫 Console désactivée !');
            return false;
        }
        
        // Ctrl+U (Code source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            alert('🚫 Code source bloqué !');
            return false;
        }
        
        // Ctrl+Shift+C (Inspecteur)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            alert('🚫 Inspecteur désactivé !');
            return false;
        }
        
        // Ctrl+A (Sélectionner tout)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            alert('🚫 Sélection désactivée !');
            return false;
        }
    });

    // === DÉTECTION DEVTOOLS PAR TAILLE ===
    let devToolsOpen = false;
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devToolsOpen) {
                devToolsOpen = true;
                alert('🚨 DevTools détectés ! Page rechargée.');
                window.location.reload();
            }
        } else {
            devToolsOpen = false;
        }
    }, 500);

    // === DÉTECTION CONSOLE PAR TIMING ===
    function detectConsole() {
        let start = performance.now();
        console.clear();
        let end = performance.now();
        if (end - start > 100) {
            alert('🚨 Console ouverte détectée !');
            window.location.href = 'about:blank';
        }
    }
    setInterval(detectConsole, 2000);

    // === ANTI-DEBUGGER ===
    function antiDebugger() {
        setInterval(function() {
            debugger;
        }, 100);
    }
    
    // Activer l'anti-debugger (attention : peut ralentir)
    antiDebugger();

    // === DÉTECTION BREAKPOINTS ===
    function detectBreakpoints() {
        let start = performance.now();
        let dummy = 0;
        for (let i = 0; i < 1000; i++) {
            dummy += i;
        }
        let end = performance.now();
        
        if (end - start > 50) {
            console.log('🚨 Breakpoint détecté !');
            window.location.reload();
        }
    }
    setInterval(detectBreakpoints, 3000);

    // === PROTECTION VARIABLES ===
    let isProtected = true;
    Object.defineProperty(window, 'isProtected', {
        get: function() { return true; },
        set: function() { 
            alert('🚨 Tentative de modification !');
            window.location.reload();
            return true;
        },
        configurable: false
    });

    // === BROUILLAGE CONSOLE ===
    let consoleSpam = setInterval(function() {
        console.clear();
        console.log('%c🛡️ ACCÈS REFUSÉ', 'color: red; font-size: 30px; font-weight: bold;');
        console.log('%c' + '█'.repeat(80), 'color: red;');
        console.log('%c' + '█'.repeat(80), 'color: red;');
        console.log('%c' + '█'.repeat(80), 'color: red;');
        console.log('%c🚫 DEBUG INTERDIT 🚫', 'color: red; font-size: 20px;');
    }, 1000);

    // === PROTECTION TOSTRING ===
    let originalToString = Function.prototype.toString;
    Function.prototype.toString = function() {
        if (this === detectConsole || this === antiDebugger || this === detectBreakpoints) {
            alert('🚨 Analyse de code détectée !');
            return 'function() { [Code Protégé] }';
        }
        return originalToString.call(this);
    };

    // === DÉTECTION MODIFICATION DOM ===
    let originalHTML = '';
    document.addEventListener('DOMContentLoaded', function() {
        originalHTML = document.documentElement.outerHTML;
    });
    
    setInterval(function() {
        if (originalHTML && document.documentElement.outerHTML !== originalHTML) {
            console.log('🚨 DOM modifié !');
            // Optionnel : recharger la page
            // window.location.reload();
        }
    }, 5000);

    // === VÉRIFICATION JAVASCRIPT ACTIF ===
    let jsRunning = true;
    setInterval(function() {
        jsRunning = true;
    }, 100);
    
    setTimeout(function() {
        if (!jsRunning) {
            document.body.innerHTML = '<h1 style="color:red;">❌ JavaScript Requis</h1>';
        }
    }, 2000);

    // === OBSCURCISSEMENT CODE ===
    let obscuredCode = btoa(`
        // Code sensible obscurci
        setInterval(function() {
            if (window.console && window.console.firebug) {
                alert('Firebug détecté !');
            }
        }, 1000);
    `);
    
    try {
        eval(atob(obscuredCode));
    } catch(e) {
        console.log('Erreur décodage');
    }

    // === DÉTECTION OUTILS EXTERNES ===
    // Détection Firebug
    if (window.console && window.console.firebug) {
        alert('🚨 Firebug détecté !');
        window.location.href = 'about:blank';
    }

    // Détection extensions communes
    setTimeout(function() {
        if (window.chrome && window.chrome.extension) {
            // Extension Chrome détectée
            console.log('Extension Chrome détectée');
        }
    }, 1000);

    // === MESSAGES DE PROTECTION ===
    console.clear();
    console.log('%c🛡️ SYSTÈME DE PROTECTION ACTIF', 'color: #ff6b6b; font-size: 16px; font-weight: bold;');
    console.log('%cToute tentative de debug est surveillée', 'color: #ffa726; font-size: 12px;');
    
    // Message d'avertissement
    alert('🛡️ Page protégée contre le debug');

    // === NETTOYAGE AU DÉCHARGEMENT ===
    window.addEventListener('beforeunload', function() {
        clearInterval(consoleSpam);
    });

})();