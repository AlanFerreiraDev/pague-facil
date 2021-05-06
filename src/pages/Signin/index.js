//react
import { useState } from 'react';
import { Link } from 'react-router-dom';

//css
import './sigin.css';

//img
import logo from '../../assets/logo.png';
import moeda from '../../assets/spanMoeda.png';

function SignIn() {
  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <h1>Pague Fácil</h1>
          <img src={logo} alt="Pague Fácil Logo" width="10px"/>
        </div>

        <form>
          <h2>Entrar</h2>
          <input type="text" placeholder="email@email.com" />
          <input type="password" placeholder="********"/>
          <button type="submit">Acessar sua Conta</button>
        </form>

        <Link to="/register">
          Faça Parte dos PagLovers e Crie uma conta agora   
          <span>
            <img src={moeda} alt="Coracao Pague Facil"/>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn;