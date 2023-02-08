import {Route,Routes} from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

axios.defaults.baseURL='http://localhost:5000'
axios.defaults.withCredentials=true
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path="/account/:subpage?" element={<AccountPage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
