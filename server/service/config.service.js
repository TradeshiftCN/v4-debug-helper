const path = require('path');
const fs = require('fs');
const fse = require('fs-extra')
const os = require('os');

const requireForce = (fileName) => {
    const moduleName = `${localConfigDir}/${fileName}`
    delete require.cache[require.resolve(moduleName)];
    return require(moduleName);
};

const localConfigDir = `${os.homedir()}/.ts-middleman/config`;

class ConfigService {

    /**
     * generate local config files if not exits
     */
    init(){
        const ruleLocalConfigDir = localConfigDir;
        if(!fs.existsSync(ruleLocalConfigDir)){
            const configFiles = fs.readdirSync(path.resolve(__dirname, '../configs/'));
            fse.mkdirpSync(ruleLocalConfigDir);
            fse.copySync(path.resolve(__dirname, '../configs'), ruleLocalConfigDir);
        }
    }

    getSystemConfig() {
        return requireForce('system.config.json');
    }

    getRuleV4InspectorConfig() {
        return requireForce('rule-v4-inspector.config.json');
    }

    getRuleMockServerConfig() {
        return requireForce('rule-mock-server.config.json');
    }

    saveConfig(configName, value){
        const content = JSON.stringify(value, null, 4);
        fs.writeFileSync(path.resolve(__dirname, `${localConfigDir}/${configName}.json`), content);
    }

    restoreToInit() {
        fse.removeSync(localConfigDir);
        this.init();
    }
}

module.exports = new ConfigService();
