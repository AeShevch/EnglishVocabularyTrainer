export type RouteCallbackParams = { [key: string]: string };

export type RouteCallback<T extends RouteCallbackParams | void = void> = (
  params: T extends void ? void : T
) => void;

export type Route<T extends RouteCallbackParams | void = void> = {
  path: string;
  callback: RouteCallback<T>;
  isDynamic?: boolean;
};
