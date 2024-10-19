import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Blogs from './Pages/Blogs'
import Addblog from './Pages/Addblog'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    < >
      <BrowserRouter>
      <div className='z-10'>
      <Header />
      </div>
      
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/addblog' element={<Addblog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
    
  )
}

export default App
