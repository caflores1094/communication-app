import { endpoints } from 'utils';

class SettingsHelper {
    constructor(options = {}) {
        this.options = Object.assign({
            account: endpoints.account,
            project: endpoints.project,
        }, options);
    }

    createManager(options = {}) {
        options = Object.assign({}, this.options, options);
        return new F.manager.Settings({
            settings: {
                run: options,
            },
        });
    }
}

const settingsHelper = new SettingsHelper();
window.settingsHelper = settingsHelper;
export default settingsHelper;
