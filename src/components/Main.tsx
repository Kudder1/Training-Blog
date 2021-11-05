import { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, NavLink } from 'react-router-dom';
import { ADDING_ROUTE, privateRoutes } from 'routes';
import { Location } from "history";

const Main = () => {
    const location = useLocation<Location>();
    const path = location.pathname.split('/')[1];
    useEffect(() => {
        if (document.body.classList.contains('burger-open')) {
            document.body.classList.remove('burger-open')
        }
    }, [location])

    return (
        <>
            <div className="main main-bg">
                <div className={`main-content main-content_${path ? path : 'home'} block`}>
                <Switch>
                    {privateRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} component={Component} exact={true}/>
                    )}
                    <Redirect to={'/'}/>
                </Switch>
                </div>
                <NavLink title="Add something new!" className="add-new" to={{pathname: ADDING_ROUTE, state: { from: path }}}>+</NavLink>
            </div>
        </>
    );
};

export default Main;