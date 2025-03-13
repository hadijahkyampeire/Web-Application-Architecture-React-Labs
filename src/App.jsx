import './App.css'
import Dashboard from './containers/Dashboard';
import { PostProvider } from './context/postContext';


function App() {

  return (
    <PostProvider>
      <Dashboard />
    </PostProvider>
  )
}

export default App
