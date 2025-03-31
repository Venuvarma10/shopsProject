import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ShopOwnerPage from './Components/ShopOwnerPage/ShopOwnerPage'
import ShopRegister from './Components/ShopRegister/ShopRegister'

function App() {

  return (
    <>
       <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/owners/login" element={<Login />} />
            <Route path="/owners/register" element={<Register />} />
            <Route path="/owners/shopowner" element={<ShopOwnerPage />} />
            <Route path="/owners/shopregister" element={<ShopRegister />} />
          </Routes>
    </Router>
    </>
  )
}

export default App
