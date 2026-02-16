import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Dashboard2 } from '@app/Dashboard2/Dashboard2';
import { NotFound } from '@app/NotFound/NotFound';

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  element: React.ReactElement;
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    element: <Dashboard />,
    exact: true,
    label: 'Dashboard',
    path: '/',
    title: 'PatternFly Seed | Main Dashboard',
  },
  {
    element: <Dashboard2 />,
    exact: true,
    label: 'Dashboard 2',
    path: '/dashboard2',
    title: 'PatternFly Seed | Dashboard 2',
  },
];

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[],
);

const AppRoutes = (): React.ReactElement => (
  <Routes>
    {flattenedRoutes.map(({ path, element }, idx) => (
      <Route path={path} element={element} key={idx} />
    ))}
    <Route element={<NotFound />} />
  </Routes>
);

export { AppRoutes, routes };
