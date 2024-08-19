import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Account from './pages/Account';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')

  return (
    <div className="App">
      <Navbar/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/account' element={<Account/>} />
        {isUserSignedIn && <Route path='/account' element={<Account/>}/>}
    </Routes>
    </div>
    
  );
}

export default App;
