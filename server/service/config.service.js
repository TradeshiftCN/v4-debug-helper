const path = require('path');
const fs = require('fs');

const requireForce = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
};

class ConfigService {

    /**
     * generate local config files if = not exits
     */
    init(){
        const ruleLocalConfigDir = path.resolve(__dirname, '../../client-configs/local/');
        if(!fs.existsSync(ruleLocalConfigDir)){
            const configFiles = fs.readdirSync(path.resolve(__dirname, '../../client-configs/'));
            fs.mkdirSync(ruleLocalConfigDir);
            configFiles.forEach(fileName => fs.copyFileSync(path.resolve(__dirname, '../../client-configs/'+fileName), ruleLocalConfigDir + path.sep +fileName));
        }
    }

    getSystemConfig() {
        return requireForce('../../client-configs/local/system.config');
    }

    getRuleV4InspectorConfig() {
        return requireForce('../../client-configs/local/rule-v4-inspector.config');
    }

    getRuleMockServerConfig() {
        return requireForce('../../client-configs/local/rule-mock-server.config');
    }
}

module.exports = new ConfigService();
