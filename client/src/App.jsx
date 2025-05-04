import './assets/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import AdminEvents from  './components/admin/event/Events.jsx';
import UserEvents from './components/user/Events.jsx';
import Navbar from './components/common/layout/Navbar.jsx';
import Footer from './components/common/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/Protected.Route.jsx';
import View from './components/common/View.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
        <ToastContainer />
        <Navbar/>

       
          

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<ProtectedRoute role="admin"><AdminEvents /></ProtectedRoute> }/>
            <Route path="/user-event" element={<ProtectedRoute role = "user"><UserEvents /></ProtectedRoute> }/>
            <Route path="/view/:id" element={<View />} /> 
          </Routes>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
