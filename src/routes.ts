import WeekCard from "./components/WeekCard";
import ContentForm from "./pages/ContentForm";
import Elements from "./pages/Elements"
import Goals from "./pages/Goals"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Weeks from "./pages/Weeks";

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
        component: Home
    },
    {
        path: GOALS_ROUTE,
        component: Goals
    },
    {
        path: ELEMENTS_ROUTE,
        component: Elements
    },
    {
        path: ADDING_ROUTE,
        component: ContentForm,
    },
    {
        path: WEEKS_ROUTE,
        component: Weeks,
    },
    {
        path: WEEK_ROUTE,
        component: WeekCard,
    },
]