/**
 * NexusRP — Téléchargement depuis GitHub Releases
 * Détecte l'OS et lie les boutons à la dernière release.
 */

const GITHUB_REPO = 'Viazel/NexusRP'
const RELEASES_PAGE = `https://github.com/${GITHUB_REPO}/releases`

const OS_LABELS = {
    windows: { label: 'Télécharger pour Windows', sub: 'Installateur .exe', icon: '🪟' },
    'mac-x64': { label: 'Télécharger pour macOS', sub: 'Intel (.dmg)', icon: '🍎' },
    'mac-arm64': { label: 'Télécharger pour macOS', sub: 'Apple Silicon (.dmg)', icon: '🍎' },
    linux: { label: 'Télécharger pour Linux', sub: 'AppImage', icon: '🐧' },
    unknown: { label: 'Choisir une plateforme', sub: 'Voir les options ci-dessous', icon: '⬇' }
}

const ASSET_PATTERNS = {
    windows: /NexusRP-setup-[\d.]+\.exe$/i,
    'mac-x64': /NexusRP-setup-[\d.]+-x64\.dmg$/i,
    'mac-arm64': /NexusRP-setup-[\d.]+-arm64\.dmg$/i,
    linux: /NexusRP-setup-[\d.]+\.AppImage$/i
}

function detectOS() {
    const ua = navigator.userAgent
    const platform = (navigator.userAgentData?.platform || navigator.platform || '').toLowerCase()

    if (platform.includes('win') || ua.includes('Windows')) return 'windows'
    if (platform.includes('mac') || ua.includes('Mac')) return isAppleSilicon() ? 'mac-arm64' : 'mac-x64'
    if (platform.includes('linux') || ua.includes('Linux')) return 'linux'
    return 'unknown'
}

function isAppleSilicon() {
    try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl')
        const ext = gl?.getExtension('WEBGL_debug_renderer_info')
        if (ext) {
            const renderer = gl.getParameter(ext.UNMASKED_RENDERER_INFO_WEBGL)
            if (/apple m[1-9]/i.test(renderer)) return true
        }
    } catch (_) { /* ignore */ }
    return /Mac OS X.*\(.*ARM/.test(navigator.userAgent)
}

async function fetchLatestRelease() {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`)
    if (!res.ok) throw new Error(`GitHub API: ${res.status}`)
    return res.json()
}

function mapAssets(assets) {
    const map = {}
    for (const [os, pattern] of Object.entries(ASSET_PATTERNS)) {
        const asset = assets.find(a => pattern.test(a.name))
        if (asset) map[os] = asset
    }
    return map
}

function setDownloadLink(el, asset) {
    if (!el) return

    if (asset) {
        el.href = asset.browser_download_url
        el.classList.remove('disabled')
        el.removeAttribute('aria-disabled')
    } else {
        el.href = RELEASES_PAGE
        el.classList.add('disabled')
        el.setAttribute('aria-disabled', 'true')
    }
}

function updateHeroButton(os, assetMap, version) {
    const mainBtn = document.getElementById('downloadMain')
    const label = document.getElementById('downloadLabel')
    const sublabel = document.getElementById('downloadSublabel')
    const icon = document.getElementById('downloadIcon')
    const versionEl = document.getElementById('heroVersion')

    const info = OS_LABELS[os] || OS_LABELS.unknown
    const asset = os !== 'unknown' ? assetMap[os] : null

    if (icon) icon.textContent = info.icon
    if (label) label.textContent = asset ? info.label : (os === 'unknown' ? info.label : 'Fichier indisponible')
    if (sublabel) {
        sublabel.textContent = asset
            ? info.sub
            : (os === 'unknown' ? 'Faites défiler pour choisir votre OS' : 'Voir GitHub Releases')
    }
    if (versionEl) versionEl.textContent = version ? `Version ${version}` : ''

    if (mainBtn) {
        mainBtn.dataset.state = 'ready'

        if (asset) {
            mainBtn.href = asset.browser_download_url
            mainBtn.classList.remove('disabled')
        } else if (os === 'unknown') {
            mainBtn.href = '#telecharger'
            mainBtn.classList.remove('disabled')
        } else {
            mainBtn.href = RELEASES_PAGE
            mainBtn.classList.remove('disabled')
        }
    }
}

function highlightRecommendedCard(os) {
    document.querySelectorAll('.download-card').forEach(card => {
        card.classList.remove('recommended')
    })

    if (os === 'unknown') return

    const card = document.querySelector(`.download-card[data-os="${os}"]`)
    if (card) card.classList.add('recommended')
}

function showError() {
    const label = document.getElementById('downloadLabel')
    const sublabel = document.getElementById('downloadSublabel')
    const mainBtn = document.getElementById('downloadMain')

    if (label) label.textContent = 'Release indisponible'
    if (sublabel) sublabel.textContent = 'Consultez GitHub Releases'

    if (mainBtn) {
        mainBtn.href = RELEASES_PAGE
        mainBtn.classList.remove('disabled')
    }

    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.href = RELEASES_PAGE
        btn.textContent = 'Voir sur GitHub'
        btn.classList.remove('disabled')
    })
}

async function init() {
    const detectedOS = detectOS()

    try {
        const release = await fetchLatestRelease()
        const version = release.tag_name?.replace(/^v/, '') || release.name
        const assetMap = mapAssets(release.assets || [])

        updateHeroButton(detectedOS, assetMap, version)
        highlightRecommendedCard(detectedOS)

        document.querySelectorAll('.download-btn').forEach(btn => {
            setDownloadLink(btn, assetMap[btn.dataset.os])
        })
    } catch (err) {
        console.error('NexusRP download:', err)
        showError()
    }
}

document.addEventListener('DOMContentLoaded', init)
