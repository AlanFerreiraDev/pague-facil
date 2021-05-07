//hooks
import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';

//alerts
import { toast } from 'react-toastify';

export const AuthContext = createContext({}); 

function AuthProvider({ children }) {
  //hooks
  const [user, setUser] = useState();
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Verifica users no LocalStorage e seta o loading
    const loadStorage = () => {
      const storageUser = localStorage.getItem('PagUser');
  
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoadingAuth(false);
      }
      setLoading(false);
    }
  
    loadStorage();
  }, [])

  //Login User
  async function signIn(email, password) {
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users')
      .doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        email: value.user.email
      }

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success(`Bem vindo  de Volta ao Pague Fácil ${data.nome}`);
    })
    .catch((error) => {
      console.log(error);
      toast.error('Ops, algo deu errado!');
      setLoadingAuth(false);
    })
  }

  //Cadastro User
  async function signUp(nome, email, password) {
    setLoadingAuth(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value) => {
      let uid = value.user.uid;
      // Cadastro no BD
      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: nome,
        avatar: null,
      })
      // Passo p setUser 
      .then( () => {
        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success(`Bem vindo ao Pague Fácil ${data.nome}`);

      })

    })
    .catch((error) => {
      console.log(error);
      toast.error('Ops, algo deu errado!');
      setLoadingAuth(false);
    })

  }

  // Salvar no localStorage
  function storageUser(data) {
    localStorage.setItem('PagUser', JSON.stringify(data));
  }

  //LogOut DB, limpa localStorage e seta estado
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('PagUser');
    setUser(null);
  }

  return (
    // !!user, converte valor para booleano, user = obj
    <AuthContext.Provider 
      value={{ 
        signed: !!user, 
        user, 
        loading, 
        signUp,
        signOut,
        signIn,
        loadingAuth,
        setUser,
        storageUser
      }}
      >
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;