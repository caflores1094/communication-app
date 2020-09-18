const request = require('request-promise-native');
const env = require('./env.json');

const ACCOUNT = process.env.ACCOUNT || env.ACCOUNT;
const PROJECT = process.env.PROJECT || env.PROJECT;

class EpicenterHelper {
    constructor() {
        this.token = null;
        this.expires = this.time();
    }

    time(expires = 0) {
        return (Date.now() / 1000) + expires;
    }

    getHeaders(headers = {}) {
        return Object.assign({}, {
            authorization: `Bearer ${this.token}`,
            'content-type': 'application/json',
        }, headers);
    }

    getCookieOptions(req) {
        return {
            domain: `.${req.hostname}`,
            path: env.LOCAL ? '/' : `/app/${ACCOUNT}/${PROJECT}`,
        };
    }

    /**
     * Handles logging in if necessary, then doing whatever request is given
     * @param  {string} method       POST, GET, etc
     * @param  {string} url          URL to call
     * @param  {string} [body=null]  (Optional) Any body to include (defaults to application/json-like string)
     * @param  {Object} [headers={}] (Optional) Overwrite default headers
     * @return {Promise}             Promise resulting from call
     */
    handleRequest(method, url, body = null, headers = {}) {
        return this.login().then(() => {
            const options = {
                method,
                url,
                headers: this.getHeaders(headers),
            };
            if (body) options.body = JSON.stringify(body);

            return request(options).then((data) => {
                if (data) { return JSON.parse(data); }
                return null;
            }).catch((error) => {
                console.error(`Error when ${method}-ing to ${url}`);
                return Promise.reject(error);
            });
        });
    }

    /**
     * Login to Epicenter using the Project token if necessary
     * @return {Promise} Promise returned by request to login, or a resolved promise with the current token if available
     */
    login() {
        if (!this.token || this.expires <= this.time()) {
            const token = Buffer.from(`${env.APP_CLIENT_ID}:${env.APP_CLIENT_SECRET}`).toString('base64');
            const options = {
                url: `${env.API_HOST}/oauth/token`,
                headers: { authorization: `Basic ${token}`, 'content-type': 'application/x-www-form-urlencoded' },
                body: 'grant_type=client_credentials',
            };

            return request.post(options).then((data) => {
                data = JSON.parse(data);
                this.token = data.access_token;
                this.expires = this.time(data.expires);
            }).catch((e) => {
                console.error('Error at epicenter-helper login');
            });
        } else {
            return Promise.resolve(this.token);
        }
    }

    /**
     * Get a list of associated worlds in a group within a project and account
     * @param  {string} account Epicenter account
     * @param  {string} project Epicenter project
     * @param  {string} group   Epicenter group name
     * @return {Promise}        Promise from the request
     */
    getWorldsInGroup(account, project, group) {
        return this.handleRequest(
            'get',
            `${env.API_HOST}/multiplayer/world?account=${account}&project=${project}&group=${group}`
        );
    }

    /**
     * Get a list of users within a given group id
     * @param  {string} groupId Epicenter group id
     * @return {Promise}        Promise from the request
     */
    getUsersInGroup(groupId) {
        return this.handleRequest(
            'get',
            `${env.API_HOST}/member/local/${groupId}`
        );
    }

    /**
     * Get the settings for a group id within the project and account
     * @param  {string} account Epicenter account
     * @param  {string} project Epicenter project
     * @param  {string} groupId Epicenter group id
     * @return {Promise}        Promise from the request
     */
    getSettingsForGroup(account, project, groupId) {
        return this.handleRequest(
            'get',
            `${env.API_HOST}/data/${account}/${project}/settings_group_${groupId}/?sort=key&direction=desc`
        );
    }
}

module.exports = EpicenterHelper;
