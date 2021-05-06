// Pagina criada para controlar a lógica de rotas,caso o user não esteja logado (permissões)
import {Route, Redirect} from 'react-router-dom';

// 
export default function RouterWrapper({
  component: Component,
  isPrivate,
  ...rest
}){

  const loading = false; // carregando
  const signed = false;  // logado

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
      <Redirect to="/carteira" />
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
