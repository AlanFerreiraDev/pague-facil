//React
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

//components
import Header from '../../components/Header';

export default function Digital() {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <h1>PAGINA CARTEIRA DIGITAL</h1>    
    </div>
  )
}