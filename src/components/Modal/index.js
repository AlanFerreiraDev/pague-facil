//icons
import { FiX } from 'react-icons/fi';

//styles
import './modal.css';

export default function Modal({conteudo, close}){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={ close }>
          <FiX size={23} color="#FFF" />
          Voltar
        </button>

        <div>
          <h2>Detalhes do Pagamento</h2>

          <div className="row">
            <span>
              Tipo: <i>{conteudo.tipo}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Recebedor: <i>{conteudo.recebedor}</i>
            </span>
            <span>
              Cadastrado em: <i>{conteudo.createdFormated}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Valor: <i>{`R$ ${conteudo.valor}`}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}