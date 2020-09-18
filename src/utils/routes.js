import {
    Main,
    Login,
    Logout,
    Facilitator,
} from 'containers';

import {

} from 'components';

export const publicRoutes = [
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
    { path: '/main', component: Main },
];

export const facRoutes = [
    { path: '/facilitator', component: Facilitator },
];

export const userRoutes = [
    { path: '/', component: Main },
];


export const flattenRoutes = (routes = []) => {
    let flat = [];
    routes.forEach((route) => {

        if (route.children) {
            flat = flat.concat(flattenRoutes(route.children));
        } else if (route.routes) {
            flat = flat.concat(flattenRoutes(route.routes));
        }
        if (route.path) {
            flat.push(route);
        }
    });
    return flat;
};
