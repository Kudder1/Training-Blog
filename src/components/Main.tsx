import { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import { privateRoutes } from '../routes';

const Main = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);

    useEffect(() => {
        if (document.body.classList.contains('burger-open')) {
            document.body.classList.remove('burger-open')
        }
    }, [location])

    return (
        <>
            <div className="main">
                <div className={`main-content main-content_${path ? path : 'home'} block`}>
                <Switch>
                    {privateRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} component={Component} exact={true}/>
                    )}
                    <Redirect to={'/'}/>
                </Switch>
                </div>
            </div>
        </>
    );
};

export default Main;