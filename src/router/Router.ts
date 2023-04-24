type RouteCallback<T extends { [key: string]: string } | void> = (
  params: T extends void ? Record<string, never> : T,
) => void;

type Route<T extends { [key: string]: string } | void> = {
  path: string;
  callback: RouteCallback<T>;
  isDynamic?: boolean;
};

export class Router {
  private routes: Route<void>[] = [];

  public addRoute<T extends { [key: string]: string } | void>(
    path: string,
    callback: RouteCallback<T>,
    isDynamic = false
  ): this {
    this.routes.push({ path, callback, isDynamic });

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

      if (route.isDynamic) {
        const pattern = new RegExp(`^${route.path.replace(/:\w+/g, `([\\w-]+)`)}$`);
        const match = currentPath.match(pattern);

        if (match) {
          const params = match.slice(1).reduce(
            (acc, value, index) => ({
              ...acc,
              [route.path.split(`:`)[index + 1]]: value
            }),
            {}
          );

          route.callback(params);

          return;
        }
      } else if (route.path === currentPath) {
        route.callback();

        return;
      }
    }

    console.warn(`No route found for ${currentPath}`);
  }
}
