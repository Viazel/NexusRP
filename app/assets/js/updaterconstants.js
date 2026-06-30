/**
 * Configuration du système de mise à jour automatique (electron-updater).
 * Repo GitHub des releases : https://github.com/Viazel/NexusRP
 */
exports.GITHUB_OWNER = 'Viazel'
exports.GITHUB_REPO = 'NexusRP'

/** Nom des artefacts générés par electron-builder (productName) */
exports.PRODUCT_NAME = 'NexusRP'

/**
 * URL de téléchargement manuel du .dmg macOS (electron-updater utilise le .zip).
 * @param {string} version Version sans préfixe v (ex. 1.0.0)
 */
exports.getDarwinDmgUrl = function(version) {
    const arch = process.arch === 'arm64' ? '-arm64' : '-x64'
    return `https://github.com/${exports.GITHUB_OWNER}/${exports.GITHUB_REPO}/releases/download/v${version}/${exports.PRODUCT_NAME}-setup-${version}${arch}.dmg`
}

exports.getFeedConfig = function() {
    return {
        provider: 'github',
        owner: exports.GITHUB_OWNER,
        repo: exports.GITHUB_REPO,
        releaseType: 'release'
    }
}
