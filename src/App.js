//context
import AuthProvider from './contexts/auth.js';

//routes
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

//alert
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
