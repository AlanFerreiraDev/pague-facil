//routes component
import {Switch} from 'react-router-dom';
import Route from './Route';

//pages
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Digital from '../pages/Digital';
import Profile from '../pages/Profile';


export default function Routes() {

  // Rotas Privadas para entrar na regra do Route.js
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/digital" component={Digital} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
    </Switch>
  )
}

