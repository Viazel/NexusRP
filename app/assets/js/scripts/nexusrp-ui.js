/**
 * NexusRP Launcher UI — Navigation par onglets, profil mock, paramètres simplifiés
 * Ce module gère uniquement l'enveloppe visuelle ; la logique Helios reste dans landing.js
 */

// ── Données profil (mock — à remplacer par votre API) ────────────────────────
const NexusProfileData = {
    rpName: '—',
    wallet: 0,
    grade: 'Citoyen',

    /**
     * Charge les données RP depuis votre API.
     * Exemple d'intégration future :
     *   const res = await fetch(`https://api.nexusrp.fr/player/${uuid}`)
     *   const data = await res.json()
     *   NexusProfileData.rpName = data.rpName
     *   NexusProfileData.wallet = data.wallet
     *   NexusProfileData.grade = data.grade
     */
    async loadFromAPI(uuid) {
        // Mock data pour démonstration
        NexusProfileData.rpName = 'Jean Dupont'
        NexusProfileData.wallet = 12500
        NexusProfileData.grade = 'Citoyen'
        NexusUI.updateProfileUI()
    }
}

// ── Navigation par onglets ───────────────────────────────────────────────────
const NexusUI = {

    currentTab: 'home',

    init() {
        // Bind navigation sidebar
        document.querySelectorAll('.nexusNavItem').forEach(btn => {
            btn.addEventListener('click', () => {
                NexusUI.switchTab(btn.getAttribute('data-tab'))
            })
        })

        // Bouton paramètres avancés → ouvre la vue settings Helios
        const fullSettingsBtn = document.getElementById('nexusOpenFullSettings')
        if (fullSettingsBtn) {
            fullSettingsBtn.addEventListener('click', async () => {
                await prepareSettings()
                switchView(getCurrentView(), VIEWS.settings)
            })
        }

        this.initRamSlider()
        this.initDataPath()
        this.applyHeroBackground()
    },

    /**
     * Bascule entre les onglets avec animation fade/slide.
     * @param {string} tabId — 'home' | 'profile' | 'settings'
     */
    switchTab(tabId) {
        if (tabId === this.currentTab) return

        const panels = {
            home: document.getElementById('nexusTabHome'),
            profile: document.getElementById('nexusTabProfile'),
            settings: document.getElementById('nexusTabSettings')
        }

        const currentPanel = panels[this.currentTab]
        const nextPanel = panels[tabId]
        if (!nextPanel) return

        // Mise à jour sidebar
        document.querySelectorAll('.nexusNavItem').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId)
        })

        // Animation sortie
        if (currentPanel) {
            currentPanel.classList.add('leaving')
            currentPanel.classList.remove('active')
            setTimeout(() => currentPanel.classList.remove('leaving'), 350)
        }

        // Animation entrée
        setTimeout(() => {
            nextPanel.classList.add('active')
        }, 50)

        this.currentTab = tabId
    },

    /**
     * Met à jour l'affichage du profil RP (mock data).
     */
    updateProfileUI() {
        const rpName = document.getElementById('nexusProfileRpName')
        const wallet = document.getElementById('nexusProfileWallet')
        const grade = document.getElementById('nexusProfileGrade')

        if (rpName) rpName.textContent = NexusProfileData.rpName
        if (wallet) wallet.textContent = NexusProfileData.wallet.toLocaleString('fr-FR') + ' $'
        if (grade) grade.textContent = NexusProfileData.grade
    },

    /**
     * Met à jour le statut serveur visuel (point vert/rouge).
     */
    updateServerDot(isOnline) {
        const dot = document.getElementById('nexusServerDot')
        if (dot) dot.classList.toggle('offline', !isOnline)
    },

    /**
     * Applique l'image de fond immersive pour Nouvelle Terre.
     */
    applyHeroBackground() {
        const heroBg = document.getElementById('nexusHeroBg')
        if (!heroBg) return

        const bkid = document.body.getAttribute('bkid')
        if (bkid) {
            heroBg.style.backgroundImage = `
                linear-gradient(135deg, rgba(7, 11, 20, 0.55) 0%, rgba(7, 11, 20, 0.85) 60%, rgba(7, 11, 20, 0.95) 100%),
                url('assets/images/backgrounds/${bkid}.jpg')
            `
            heroBg.style.backgroundSize = 'cover'
            heroBg.style.backgroundPosition = 'center'
        }
    },

    /**
     * Slider RAM simplifié — synchronisé avec ConfigManager.
     */
    initRamSlider() {
        const slider = document.getElementById('nexusRamSlider')
        const label = document.getElementById('nexusRamValue')
        if (!slider || !label) return

        const serverId = ConfigManager.getSelectedServer()
        if (serverId) {
            const currentRam = ConfigManager.getMaxRAM(serverId)
            if (currentRam) {
                const ramGb = parseFloat(currentRam.replace('G', ''))
                if (!isNaN(ramGb)) {
                    slider.value = ramGb
                    label.textContent = ramGb.toFixed(1).replace('.0', '') + ' Go'
                }
            }
        }

        if (slider.dataset.bound) return
        slider.dataset.bound = 'true'

        slider.addEventListener('input', () => {
            const val = parseFloat(slider.value)
            label.textContent = val.toFixed(1).replace('.0', '') + ' Go'
        })

        slider.addEventListener('change', () => {
            const val = parseFloat(slider.value)
            const serverId = ConfigManager.getSelectedServer()
            if (serverId) {
                ConfigManager.setMaxRAM(serverId, val + 'G')
                ConfigManager.save()
            }
            // Sync avec le slider Helios si présent
            const helioSlider = document.getElementById('settingsMaxRAMRange')
            if (helioSlider) {
                helioSlider.setAttribute('value', val)
                const helioLabel = document.getElementById('settingsMaxRAMLabel')
                if (helioLabel) helioLabel.textContent = val.toFixed(1) + 'G'
            }
        })
    },

    /**
     * Affiche le chemin du répertoire de données.
     */
    initDataPath() {
        const el = document.getElementById('nexusDataPath')
        if (el) el.textContent = ConfigManager.getDataDirectory()
    },

    /**
     * Rafraîchit les paramètres après connexion / chargement distro.
     */
    refresh() {
        this.initRamSlider()
        this.initDataPath()
        this.applyHeroBackground()
        this.updateProfileUI()
    }
}

// Exposer globalement pour landing.js
window.NexusUI = NexusUI
window.NexusProfileData = NexusProfileData

// Initialisation (script chargé en fin de landing.ejs)
NexusUI.init()
NexusUI.updateProfileUI()
