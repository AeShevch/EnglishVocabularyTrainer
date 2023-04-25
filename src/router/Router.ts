import { Route, RouteCallback, RouteCallbackParams } from "./types";

export class Router {
  private routes: Route<void | RouteCallbackParams>[] = [];

  public addRoute<T extends RouteCallbackParams | void = void>(
    path: string,
    callback: RouteCallback<T>,
    isDynamic = false,
  ): this {
    this.routes.push({ path, callback, isDynamic });

    return this;
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
          const params = match.slice(1).reduce<RouteCallbackParams>(
            (acc, value, index) => ({
              ...acc,
              [route.path.split(`:`)[index + 1]]: value,
            }),
            {},
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
