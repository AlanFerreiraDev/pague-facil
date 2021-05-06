//routes
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

//context
import AuthProvider from './contexts/auth.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
