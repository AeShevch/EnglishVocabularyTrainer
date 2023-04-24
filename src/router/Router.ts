type RouteCallback = () => void;

type Route = {
  path: string;
  callback: RouteCallback;
};

export class Router {
  private routes: Route[] = [];

  public addRoute(path: string, callback: RouteCallback): this {
    this.routes.push({ path, callback });

    return this;
  }

  public removeRoute(path: string): void {
    this.routes = this.routes.filter((route) => route.path !== path);
  }

  public navigateTo(path: string): void {
    window.history.pushState(null, ``, path);
    const currentPath = window.location.pathname;

    this.handleRouteChange(currentPath);
  }

  public start(): void {
    window.addEventListener(`popstate`, () => this.handleRouteChange(window.location.pathname));
    this.handleRouteChange(window.location.pathname);
  }

  private handleRouteChange(currentPath: string): void {
    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];

      if (route.path === currentPath) {
        route.callback();

        return;
      }
    }

    console.warn(`No route found for ${currentPath}`);
  }
}
