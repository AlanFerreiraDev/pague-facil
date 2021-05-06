//hooks
import { useState, useEffect, createContext } from 'react';
import firebase from '../services/firebaseConnection';

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

  return (
    // !!user, converte valor para booleano, user = obj
    <AuthContext.Provider value={{ signed: !!user, user, loading }}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider;