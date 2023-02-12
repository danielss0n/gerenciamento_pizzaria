import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Admin from './components/pages/admin/Admin'
import Pedidos from './components/pages/admin/Pedidos';


function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/pedidos/:id' element={<Pedidos/>}/>
          <Route path='/admin/pedidos' element={<Pedidos/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
