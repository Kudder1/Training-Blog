import ContentForm from "./pages/ContentForm";
import Elements from "./pages/Elements"
import Goals from "./pages/Goals"
import Home from "./pages/Home"
import Login from "./pages/Login"

export const LOGIN_ROUTE = '/login';
export const GOALS_ROUTE = '/goals';
export const ELEMENTS_ROUTE = '/elements';
export const ADDING_ROUTE = '/new';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
]

export const privateRoutes = [
    {
        path: '/',
        Component: Home
    },
    {
        path: GOALS_ROUTE,
        Component: Goals
    },
    {
        path: ELEMENTS_ROUTE,
        Component: Elements
    },
    {
        path: ADDING_ROUTE,
        Component: ContentForm,
    },
]