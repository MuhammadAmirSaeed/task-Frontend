
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import ProductForm from './components/ProductForm'
import Login from './Auth/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/Products'

function App() {


  return (
    <>
      {/* <ProductForm/> */}
    
    <BrowserRouter>
      <Routes>
      <Route path='/products' element ={<Products/>} />
        <Route path ="/" element={<Login/>} />
        <Route element={<ProtectedRoute />}>
        <Route path='/add-products'  element={<ProductForm/>} />
        </Route>
       
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
