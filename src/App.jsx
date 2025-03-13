import './App.css'
import NavBar from './containers/NavBar'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';


function App() {
  const { loggedInUser, isAuthenticated } = useAuth();

  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} loggedInUser={loggedInUser}/>
      <AppRoutes />
    </>
  )
}

export default App
