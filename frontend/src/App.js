import { Routes, Route } from 'react-router-dom';
import Products from './components/Products.js';
import EditProducts from './components/EditProducts.js';
import AddProducts from './components/AddProducts.js';
import UserRoutes from './components/routes/UserRoutes.js';
import AdminRoutes from './components/routes/AdminRoutes.js';
import Login from './components/Login.js';
import Cart from './components/Cart.js';
import Navbar from './components/Navbar.js';
import PageNotFound from './components/PageNotFound.js';
import Register from './components/Register.js';
import AdminRegister from './components/AdminRegister.js';
import AdminLogin from './components/AdminLogin.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='dark'>
      <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <UserRoutes>
            <Login />
          </UserRoutes>
        } />
        <Route path='/products' element={
          <Products />
        } />
        <Route path='/cart' element={
          <Cart />
        } />
        <Route path='/editProduct/:id' element={
          <EditProducts />
        } />
        <Route path='/AddProducts' element={
          <AddProducts />
        } />
        <Route path='/register' element={
          <UserRoutes>
            <Register />
          </UserRoutes>
        } />
        <Route path='/admin-register' element={
          <UserRoutes>
            <AdminRegister />
          </UserRoutes>
        } />
        <Route path='/admin-login' element={
          <AdminRoutes>
            <AdminLogin />
          </AdminRoutes>
        } />
        <Route path='*' element={
            <PageNotFound />
        } />
      </Routes>

    </div>
  );
}

export default App;
