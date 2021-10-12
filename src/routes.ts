import WeekPage from "./pages/WeekPage";
import ContentForm from "./pages/ContentForm";
import Elements from "./pages/Elements"
import Goals from "./pages/Goals"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Weeks from "./pages/Weeks";
import { WithWeek } from "./utils/WeekHOC";

export const LOGIN_ROUTE = '/login';
export const GOALS_ROUTE = '/goals';
export const ELEMENTS_ROUTE = '/elements';
export const ADDING_ROUTE = '/new';
export const WEEKS_ROUTE = '/weeks';
export const WEEK_ROUTE = '/weeks/:id';

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Login
    }
]

export const privateRoutes = [
    {
        path: '/',
        Component: WithWeek(Home)
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
    {
        path: WEEKS_ROUTE,
        Component: Weeks,
    },
    {
        path: WEEK_ROUTE,
        Component: WithWeek(WeekPage),
    },
]