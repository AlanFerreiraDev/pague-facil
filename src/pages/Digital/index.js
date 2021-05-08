//components
import Header from '../../components/Header';
import Title from '../../components/Title';
import { useState } from 'react';

//routes
import { Link } from 'react-router-dom';

//icons
import { MdPayment } from 'react-icons/md';
import { TiPlus } from 'react-icons/ti';
import { FiSearch, FiEdit2 } from 'react-icons/fi';

//styles
import './digital.css';

export default function Digital() {
  const [pagamentos, setPagamentos] = useState([1]);

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
                <tr>
                  <td data-label="Tipo">Pix</td>
                  <td data-label="Recebedor">Renner</td>
                  {/*<td data-label="Status">
                    <span className="badge" style={{backgroundColor: '#5cb85c' }}>Em aberto</span>
            </td> */}
                  <td data-label="Data">20/06/2021</td>
                  <td data-label="Valor">R$ 100,00</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#3583f6' }}>
                      <FiSearch color="#FFF" size={17} />
                    </button>
                    <button className="action" style={{backgroundColor: '#F6a935' }}>
                      <FiEdit2 color="#FFF" size={17} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </>
        )}


        
      </div>
    </div>
  )
}