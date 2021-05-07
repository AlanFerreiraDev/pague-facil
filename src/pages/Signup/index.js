//react
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

//css
import './signup.css';

//img
import moeda from '../../assets/spanMoeda.png';

function SignUp() {
  //hooks
  const [nome, setNome] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    
    if (nome !== "" && email !== "" && password !== "") {
      signUp(nome, email, password)
    }
    
  }

  return (
    <div className="container-center-up">
      <div className="login-up">
        <div className="logo-area-up">
          <h1>Pague Fácil</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Cadastre sua Conta aqui</h2>
          <label htmlFor="nome">Nome:</label>
          <input type="text" placeholder="Seu Nome" value={nome} onChange={ (e) => setNome(e.target.value)}/>

          <label htmlFor="email">Email:</label>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value)} />

          <label htmlFor="password">Senha:</label>
          <input type="password" placeholder="Sua Senha" value={password} onChange={ (e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>

        <Link to="/">
          Já faz parte dos <strong>Pag Lovers ?</strong> Faça o Login Aqui! 
          <span>
            <img src={moeda} alt="Coracao Pague Facil"/>
          </span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp;