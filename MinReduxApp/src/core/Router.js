export class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', this.handleRoute.bind(this));
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    handleRoute() {
        const path = window.location.pathname;
        this.routes[path]()
    }
}
