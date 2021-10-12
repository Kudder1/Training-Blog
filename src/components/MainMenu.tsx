import { NavLink } from 'react-router-dom';
import { ELEMENTS_ROUTE, GOALS_ROUTE, WEEKS_ROUTE } from '../routes';
import Burger from './Burger';

const MainMenu = () => {
    return (
    <nav>
        <div className="main-menu-heading">
          <h3>Menu</h3>
          <Burger />
        </div>
        <ul className="main-menu">
          <li><NavLink to="/" exact={true}>Main</NavLink></li>
          <li><NavLink to={ELEMENTS_ROUTE}>Elements</NavLink></li>
          <li><NavLink to={GOALS_ROUTE}>Goals</NavLink></li>
          <li><NavLink to={WEEKS_ROUTE}>Weeks</NavLink></li>
        </ul>
      </nav>
    );
};

export default MainMenu;