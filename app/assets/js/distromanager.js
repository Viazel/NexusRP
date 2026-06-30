const { DistributionAPI } = require('helios-core/common')

const ConfigManager = require('./configmanager')

// Old WesterosCraft url.
// exports.REMOTE_DISTRO_URL = 'http://mc.westeroscraft.com/WesterosCraftLauncher/distribution.json'
exports.REMOTE_DISTRO_URL = 'https://helios-files.geekcorner.eu.org/distribution.json'

// Serveur unique NexusRP
exports.NEXUS_SERVER_HOST = 'nouvelle-terre.fr'
exports.NEXUS_SERVER_PORT = 25565

/**
 * Résout le serveur unique à utiliser dans la distribution.
 * Priorité : adresse correspondant à NEXUS_SERVER_HOST, sinon mainServer.
 *
 * @param {import('helios-core/common').HeliosDistribution} distro
 */
exports.resolveNexusServer = function(distro) {
    for (const serv of distro.servers) {
        const addr = (serv.rawServer.address || '').toLowerCase()
        if (addr.startsWith(exports.NEXUS_SERVER_HOST) || addr.includes(exports.NEXUS_SERVER_HOST)) {
            return serv
        }
    }
    return distro.getMainServer()
}

const api = new DistributionAPI(
    ConfigManager.getLauncherDirectory(),
    null, // Injected forcefully by the preloader.
    null, // Injected forcefully by the preloader.
    exports.REMOTE_DISTRO_URL,
    false
)

exports.DistroAPI = api