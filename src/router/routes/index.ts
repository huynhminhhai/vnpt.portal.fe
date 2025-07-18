import type { ElegantConstRoute } from '@soybean-react/vite-plugin-react-router';
import type { RouteObject } from 'react-router-dom';

import { transformElegantRoutesToReactRoutes } from '../elegant/transform';

/**
 * Get auth react routes
 *
 * @param routes Elegant routes
 */
export function getReactRoutes(route: ElegantConstRoute[]) {
  return transformElegantRoutesToReactRoutes(route);
}

function isGroup(id?: string) {
  if (!id) return false;

  return id.endsWith(')');
}

/**
 * 
 *
 * @param {Array} routes 
 * @param {Object | null} parent 
 * @param {Array} authRoutes 
 * @returns {Array} 
 */
// eslint-disable-next-line max-params
export function filterRoutes(
  routes: RouteObject[],
  parent: string | null = null,
  authRoutes: Router.SingleAuthRoute[] = [],
  cacheRoutes: string[] = [],
  parentPath: string = ''
) {
  return routes.reduce((acc, route) => {
    const noPermission = route.handle && route.handle.constant;

    const newRoute = { ...route };

    const isRouteGroup = route.id?.startsWith('(') && route.id.endsWith(')');

    if (newRoute.handle?.keepAlive) {
      cacheRoutes.push(route.path || '');
    }
    if (newRoute.children && newRoute.children.length > 0) {
      newRoute.children = filterRoutes(newRoute.children, route.id, authRoutes, cacheRoutes, route.path);
    }

    if (!noPermission) {
      if (isRouteGroup || newRoute.children?.[0]?.index) {
        const children = newRoute.children
          ?.map(item => {
            if (item.handle?.constant || isGroup(item.id) || item.children?.[0]?.index) {
              return item;
            }
            return null;
          })
          .filter(Boolean) as RouteObject[];

        newRoute.children = children;

        acc.push(newRoute);
      } else {
        authRoutes.push({
          parent: parent || null,
          parentPath,
          route: newRoute
        });
      }
    } else {
      acc.push(newRoute);
    }
    return acc;
  }, [] as RouteObject[]);
}
