import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LOGIN_ROUTE } from 'routes';
import 'App.scss'
import Informer from 'components/Informer';
import MainMenu from 'components/MainMenu';
import Search from 'components/Search';
import Login from 'pages/Login';
import { useAuthState } from 'utils/useAuthState';
import Loader from 'components/Loader';
import Main from 'components/Main';

function App() {
  const {user, loading} = useAuthState();

  if (loading) return <div className="loader_main"><Loader/></div>
  return (
    <Router>
      {user && !loading ?
      <>
        <aside className="block sidebar-left sidebar-left_desktop">
          <MainMenu />
          <Informer />
        </aside>
        <main>
          <Search />
          <Main />
        </main>
      </>
      :
      <Switch>
        <Route path={LOGIN_ROUTE} component={Login}/>
        <Redirect to={LOGIN_ROUTE}/>
      </Switch>
      }
    </Router>
  )
}

export default App;