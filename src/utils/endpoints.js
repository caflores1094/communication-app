/* eslint-disable new-cap */
const model = '';
const { host, accountPath, projectPath, protocol, versionPath, isLocalhost } = F.service.URL();
const isLocal = isLocalhost();
const account = isLocal ? 'forio-dev' : accountPath;
const project = isLocal ? 'communication-app' : projectPath;

const endpoints = {
    host,
    versionPath,
    protocol,
    model,
    isLocal,
    account,
    project,
    isDemo: project.endsWith('-demo'),
    isTrial: project.endsWith('-trial'),
};

export default endpoints;
