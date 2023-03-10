import {Route,Routes} from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import SinglePage from './pages/SinglePage'

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
          <Route path="/account/:subpage/:action?" element={<AccountPage/>}/>
          <Route path="/account/:subpage/:id" element={<AccountPage/>}/>
          <Route path="/place/:id" element={<SinglePage/>}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
