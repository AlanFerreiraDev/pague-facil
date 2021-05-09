//react
// import React, { useRef } from 'react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

//validations
// import { Form } from '@unform/web';
// import Input from '../../components/Form/Input';
// import * as Yup from 'yup';


//img
import logo from '../../assets/logo.png';
import moeda from '../../assets/spanMoeda.png';

//css
import './signin.css';

function SignIn() {
  //hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const formRef = useRef(null);

  const { signIn, loadingAuth } = useContext(AuthContext);

//   //validation
//   async function handleSubmitInput(data, { reset }) {
      
//     try {
//       const schema = Yup.object().shape({
//         email: Yup
//         .string()
//         .email('Digite um e-mail válido')
//         .required('O E-mail é obrigatório'),
//         password: Yup
//         .string()
//         .min(6 , 'A senha precisa ter mais que 5 caracteres')
//         .max(10, 'A senha precisa ter menos de 11 caracteres')
//       });
//       await schema.validate(data, {
//         // Para fazer a validação completa e não parar no primeiro erro
//         abortEarly: false,
//       })

//       console.log(data);

//       formRef.current.setErrors({});

//        reset();

//       // signIn(email, password)


//       } catch(err) {
//       //confere se é erro de validação mesmo
//       if (err instanceof Yup.ValidationError) {

//         const errorMessages = {};

//         err.inner.forEach(error => {
//           errorMessages[error.path] = error.message;
//         })

//         formRef.current.setErrors(errorMessages);

//         console.log(err);
//     }
//   }
// }

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
        const position = random(10, 85);
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

      {/* <Form ref={formRef} onSubmit={handleSubmit}>
          <h2>Entrar</h2>
          <label htmlFor="email">Email: </label>
          <Input type="email" name="email" placeholder="nome@email.com" value={email} />
          <label htmlFor="password">Senha: </label>
          <input type="password" name="password" placeholder="Sua Senha" value={password} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar sua Conta'}</button>
      </Form> */}

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