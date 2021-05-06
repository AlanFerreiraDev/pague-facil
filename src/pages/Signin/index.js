//react
import { useState } from 'react';
import { Link } from 'react-router-dom';

//css
import './signin.css';

//img
import logo from '../../assets/logo.png';
import moeda from '../../assets/spanMoeda.png';

function SignIn() {
  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('CLICOU')
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <h1>Pague Fácil</h1>
          <img src={logo} alt="Pague Fácil Logo" width="10px"/>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Entrar</h2>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value)} />
          <input type="password" placeholder="********" value={password} onChange={ (e) => setPassword(e.target.value)} />
          <button type="submit">Acessar sua Conta</button>
        </form>

        <Link to="/register">
          Faça parte dos <strong>Pag Lovers</strong> e abra uma conta agora  
          <span>
            <img src={moeda} alt="Coracao Pague Facil"/>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn;