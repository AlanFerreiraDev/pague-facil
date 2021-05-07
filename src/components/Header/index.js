//react and components
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

//routes
import { Link } from 'react-router-dom';

//assets
import avatar from '../../assets/avatar.png';

//icons
import { IoHome } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

//css
import './header.css';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto de Perfil" />
      </div>

      <Link to="/digital">
        <IoHome color="#FFF" size={24}/>
          Carteira Digital
      </Link>

      <Link to="/digital">
        <FaUser color="#FFF" size={24}/>
          Clientes
      </Link>

    <Link to="/profile">
      <IoSettingsSharp color="#FFF" size={24}/>
        Configurações
    </Link>
    </div>
  )
}