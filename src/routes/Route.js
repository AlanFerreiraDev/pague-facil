// Pagina criada para controlar a lógica de rotas,caso o user não esteja logado (permissões)
//react
import { useContext } from 'react';

//routes
import {Route, Redirect} from 'react-router-dom';

//context
import { AuthContext } from '../contexts/auth';

export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}){

  const { signed, loading } = useContext(AuthContext);

  if(loading) {
    return(
      <div></div>
    )
  }

  if(!signed && isPrivate) {
    return (
      <Redirect to="/" />
    )
  }

  if(signed && !isPrivate) {
    return (
      <Redirect to="/digital" />
    )
  }

  return(
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )}
    />
  )
}
