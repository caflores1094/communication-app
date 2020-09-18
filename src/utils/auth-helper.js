import { endpoints } from 'utils';

class BaseAuthHelper {
    constructor() {
        this.authManager = new F.manager.AuthManager();
        this.session = this.getSessionData();
    }

    getSessionData() {
        return this.authManager.getCurrentUserSessionInfo();
    }

    login(creds, group = null) {
        const { account, project } = endpoints;
        return this.authManager.login({
            account,
            project,
            userName: creds.username,
            password: creds.password,
            groupId: group,
        });
    }

    isLoggedIn() {
        const { account, project } = endpoints;
        const session = this.session;
        return session && session.account === account && session.project === project && session.auth_token;
    }

    isFacilitator() {
        return this.session && this.session.isFac;
    }

    logout() {
        return this.authManager.logout();
    }
}

const authHelper = new BaseAuthHelper();
export default authHelper;
