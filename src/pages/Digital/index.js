//components
import Header from '../../components/Header';
import Title from '../../components/Title';
import { useState, useEffect } from 'react';

//routes
import { Link } from 'react-router-dom';

//BD
import firebase from '../../services/firebaseConnection';

//date-format
import { format } from 'date-fns';

//modal
import Modal from '../../components/Modal';

//icons
import { MdPayment } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';
import { FiSearch } from 'react-icons/fi';

//styles
import './digital.css';

//Referencia de Busca no BD
const listRef = firebase.firestore().collection('payments').orderBy('created', 'desc');

export default function Digital() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(()=> {

    async function loadPagamentos() {
      await listRef.limit(5)
      .get()
      //snapshot para entrar na documentação do firebase
      .then((snapshot)=> {
        updateState(snapshot)
  
      })
      .catch((err)=> {
        console.log(`Erro: ${err}`);
        setLoadingMore(false);
      })
  
      setLoading(false);
  
    }

    loadPagamentos();

    return () => {

    }
  }, []);


  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if(!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          boleto: doc.data().boleto,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          recebedor: doc.data().recebedor,
          tipo: doc.data().tipo,
          userId: doc.data().userId,
          valor: doc.data().valor
        })
      })
      //buscar ultimo item buscado
      const lastDoc = snapshot.docs[snapshot.docs.length -1];
      //pega todos os pagamentos e se carregou mais acrescenta as listas a mais
      setPagamentos(pagamentos => [...pagamentos, ...lista])
      setLastDocs(lastDoc);

    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  //botão Mais Pagtos.
  async function handleMore() {
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5)
    .get()
    .then((snapshot)=> {
      updateState(snapshot);
    })
  }

  //modal
  function togglePostModal(item) {
    setShowPostModal(!showPostModal); //Fica trocando de true para false
    setDetail(item);
    console.log(item);
  }

  //renderização condicional
  if(loading) {
    return(
      <div>
        <Header/>
          <div className="content">
            <Title name="Operações">
              <MdPayment color="#FFF" size={25}/>
            </Title>
          </div>

          <div className="container digital" >
            <span>Buscando Pagamentos ...</span>     
          </div>   
      </div>
    )
  }
  

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Operações">
          <MdPayment color="#FFF" size={25}/>
        </Title>

        {pagamentos.length === 0 ? (       
          <div className="container digital">
            <span>Nenhum Pagamento Realizado...</span>
    
              <Link to="/new" className="new">
                  <TiPlus color="#FFF" size={25}/>
                  Novo Pagamento
              </Link>
            </div>
            ) : (
            <>
            <div className="container digital">
              <Link to="/new" className="new">
                <TiPlus color="#FFF" size={25}/>
                Novo Pagamento
              </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Recebedor</th>
                  {/*<th scope="col">Status</th>*/}
                  <th scope="col">Data</th>
                  <th scope="col">Valor</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {pagamentos.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Tipo">{item.tipo}</td>
                      <td data-label="Recebedor">{item.recebedor}</td>
                      <td data-label="Data">{item.createdFormated}</td>
                      <td data-label="Valor">{item.valor}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583f6' }} onClick={ () => togglePostModal(item)}>
                          <FiSearch color="#FFF" size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
           {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando Dados...</h3>}
           {!loadingMore && !isEmpty && <button className="btn-more" onClick={handleMore}>Buscar mais Pagamentos</button>}
          </>
        )}       
      </div>
      {showPostModal && (
        <Modal
          conteudo={detail}
          close={togglePostModal} 
        />
      )}
    </div>
  )
}