//components
import Header from '../../components/Header';
import Title from '../../components/Title';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

//icons and toast
import { TiPlus } from 'react-icons/ti';
import { toast } from 'react-toastify';

//BD
import firebase from '../../services/firebaseConnection';

//styles
import './new.css';

export default function New(){
  const [tipo, setTipo] = useState('Pix');
  const [recebedor, setRecebedor] = useState('');
  const [boleto, setBoleto] = useState('');
  const [valor, setValor] = useState('');

  const { user } = useContext(AuthContext);

  //Para quando logar minhas aplicação puxar os dados do BD
  useEffect(()=> {

  });


  async function handleRegister(e){
    e.preventDefault();

    if(recebedor !== '' && boleto !== '' && valor !== '') {
      await firebase.firestore().collection('payments')
      .add({
        created: new Date(),
        tipo: tipo,
        recebedor: recebedor,
        boleto: boleto,
        valor: valor,
        userId: user.uid
      })
      .then(() => {
        toast.success('Pagamento realizado com sucesso, aguarde a compensação do Recebedor');
        setTipo('Pix');
        setRecebedor('');
        setBoleto('');
        setValor(0);
      })
      .catch((err) => {
        toast.error('Ops, erro ao registar seu pagamento, por favor tente mais tarde.');
        //segurança
        console.log(err);
      })
      
    } else {
      toast.error('Existem campos vazios');
    }

  }

  //Troca Tipo
  function handleChangeSelect(e) {
    setTipo(e.target.value);
    console.log(e.target.value)
  }


  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Novo Pagamento">
          <TiPlus color="#FFF"size={25} />
        </Title>

        <div className="container-new">

          <form className="form-profile-new"  onSubmit={handleRegister} >
            
            <label>Tipo</label>
            <select value={tipo} onChange={handleChangeSelect}>
              <option value="Pix">
                Pix
              </option>
              <option value="Débito">
                Cartão Débito
              </option>
              <option value="Crédito">
                Cartão Crédito
              </option>
            </select>

            <label>Recebedor</label>
            <input type="text" value={recebedor} placeholder="Nome Recebedor" onChange={(e) => setRecebedor(e.target.value)} />

            <label>Boleto</label>
            <input type="text" value={boleto} placeholder="Número Boleto" onChange={(e)=> setBoleto(e.target.value)} />

            <label>Valor</label>

            <input id="currency" type="text" value={valor} placeholder="Valor Pagto." onChange={(e) => setValor(e.target.value) } />
            
            <button type="submit">Pagar</button>

          </form>

        </div>

      </div>
    </div>
  )
}