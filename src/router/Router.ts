import { Nullable } from "../types";

import { Route, RouteCallback, RouteCallbackParams } from "./types";

/**
 * A lightweight router that allows to register
 * and handle routes for single-page applications.
 */
export class Router {
  private routes: Route<void | RouteCallbackParams>[] = [];

  public onBeforePageChange: Nullable<(currentPath: string) => void> = null;

  public addRoute<T extends RouteCallbackParams | void = void>(
    path: string,
    callback: RouteCallback<T>,
    isDynamic = false
  ): this {
    this.routes.push({ path, callback, isDynamic });

    return this;
  }

  public navigateTo(path: string): void {
    window.history.pushState(null, "", path);

    this.handleRouteChange(window.location.pathname);
  }

  public start(): void {
    window.addEventListener("popstate", () =>
      this.handleRouteChange(window.location.pathname)
    );
    this.handleRouteChange(window.location.pathname);
  }

  private handleRouteChange(currentPath: string): void {
    if (this.onBeforePageChange) this.onBeforePageChange(currentPath);

    for (let i = 0; i < this.routes.length; i += 1) {
      const route = this.routes[i];

      if (route.isDynamic) {
        const pattern = new RegExp(
          `^${route.path.replace(/:\w+/g, "([\\w-]+)")}$`
        );
        const match = currentPath.match(pattern);

        if (match) {
          const params = match.slice(1).reduce<RouteCallbackParams>(
            (acc, value, index) => ({
              ...acc,
              [route.path.split(":")[index + 1]]: value,
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
