//react
import { useState } from 'react';
import { Link } from 'react-router-dom';

//css
import './signup.css';

//img
import moeda from '../../assets/spanMoeda.png';

function SignUp() {
  //hooks
  const [nome, setNome] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('CLICOU')
  }

  return (
    <div className="container-center-up">
      <div className="login-up">
        <div className="logo-area-up">
          <h1>Pague Fácil</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Cadastre sua Conta aqui</h2>
          <input type="text" placeholder="Seu Nome" vlaue={nome} onChange={ (e) => setNome(e.target.value)}/>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Sua Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/">
          Já faz parte dos <strong>Pag Lovers ?</strong> Entre 
          <span>
            <img src={moeda} alt="Coracao Pague Facil"/>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp;