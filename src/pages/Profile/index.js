//components, hooks and context
import { useState, useContext } from 'react';
import Header from '../../components/Header';
import Title from '../../components/Title';
import { AuthContext } from '../../contexts/auth';

//BD
import firebase from '../../services/firebaseConnection';

//style
import './profile.css';

 //icons
import { IoSettingsSharp } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

//avatar 
import avatar from '../../assets/avatar.png';

export default function Profile(){
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  //Preview da Imagem
  function handleFile(e) {
    if(e.target.files[0]) {
      const image = e.target.files[0];

      if(image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        alert("Envie uma imagem do tipo PNG ou jPEG");
        setImageAvatar(null);
        return null;
      }
    }
  }

  //Salvar Imagem (firebase)
  async function handleUpload() {
    const currentUid = user.uid;
    // Salvo no BD (storage)
    // const uploadTask = await firebase.storage()
    await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then( async ()=> {
      console.log("Foto Enviada com Sucesso!");

      // Busco a Url para salvar no FireStore
      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then( async (url)=> {
        let urlFoto = url;

        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          avatarUrl: urlFoto,
          nome: nome
        })
        .then(()=> {
          let data = {
            ...user,
            avatarUrl: urlFoto,
            nome: nome
          };
          setUser(data);
          storageUser(data);
        })
      })
    })

  }

  // Editar nome e salvar imagem
  async function handleSave(e) {
    e.preventDefault();

    if(imageAvatar === null && nome !== '') {
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then(() => {
        let data = {
          ...user,
          nome: nome
        };

        setUser(data);
        storageUser(data);

      })
    } else if (nome !== '' && imageAvatar !== null) {
      handleUpload();
    }
  }

  return(
    <div>
      <Header/>
      <div className="content">
        <Title name="Meu perfil">
          <IoSettingsSharp color="#FFF" size={25} />
        </Title>

        <div className="container-profile">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar-profile">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile}/> <br />
              {avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="Foto de Perfil do Usuário" />
                :
                <img src={avatarUrl} width="250" height="250" alt="Foto de Perfil do Usuário" />
              }
            </label>

            <label>Nome</label> 
            <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />

            <label>Email</label> 
            <input type="text" value={email} disabled={true} /> 

            <button type="submit">Salvar</button>

          </form>
        </div>

        <div className="content-logout-profile">
          <button className="logout-btn" onClick={() => signOut()} >
            Sair
          </button>
        </div>
    </div> 
  </div>
  )
}