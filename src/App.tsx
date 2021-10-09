import { BrowserRouter as Router, NavLink } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ADDING_ROUTE, LOGIN_ROUTE } from './routes';
import './App.scss'
import Informer from './components/Informer';
import MainMenu from './components/MainMenu';
import Search from './components/Search';
import Login from './pages/Login';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';
import Main from './components/Main';
import { auth } from '.';

function App() {
  const [ user, loading ] = useAuthState(auth);
  
  if (loading) {
    return <Loader/>
  }
  return (
    <Router>
      {user ?
      <>
        <aside className="block sidebar-left sidebar-left_desktop">
          <MainMenu />
          <Informer />
        </aside>
        <main>
          <Search />
          <Main />
        </main>
        <NavLink title="Add something new!" className="add-new" to={ADDING_ROUTE}>+</NavLink>
      </>
      :
      <Switch>
        <Route path={LOGIN_ROUTE} component={Login}/>.
        <Redirect to={LOGIN_ROUTE}/>
      </Switch>
      }
    </Router>
  )
}

export default App;