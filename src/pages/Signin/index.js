//react
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

//css
import './signin.css';

//img
import logo from '../../assets/logo.png';
import moeda from '../../assets/spanMoeda.png';

function SignIn() {
  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {
      signIn(email, password)
    }
  }

  function squares() {
      const ulSquares = document.querySelector('ul.squares');

      for(let i = 0; i < 11; i++) {
        const li = document.createElement('li');

        const random = (min, max) => Math.random() * (max - min) + min;

        const size = Math.floor(random(10, 120));
        const position = random(-10, 100);
        const delay = random(5, 0.1);
        const duration = random(24, 12);

        li.style.width = `${size}px`;
        li.style.height = `${size}px`;
        li.style.left = `${position}%`;
        li.style.right = `${position}%`;
        li.style.animationDelay = `${delay}s`;
        li.style.animationDuration = `${duration}s`;
        li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`

        ulSquares.appendChild(li);
      }
  }
  
  return (
    <div className="container-center" onLoad={squares}>
      <div className="login">
        <div className="logo-area">
          <h1>Pague Fácil</h1>
          <img src={logo} alt="Pague Fácil Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Entrar</h2>
          <label htmlFor="email">Email: </label>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value)} />

          <label htmlFor="password">Senha: </label>
          <input type="password" placeholder="Sua Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar sua Conta'}</button>
        </form>

        <Link to="/register">
          Faça parte dos <strong>Pag Lovers</strong> e abra uma conta agora  
          <span>
            <img src={moeda} alt="Coracao Pague Facil"/>
          </span>
        </Link>
      </div>

      <ul className="squares">
        <li></li>
      </ul>
    </div>
  )
}

export default SignIn;