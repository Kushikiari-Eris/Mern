import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const isUserSignedIn = !!localStorage.getItem('token')
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }


  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300 font-bold'>
        
        <Link to='/'><h1 className='text-3xl'>AuthDb</h1></Link>
        <ul className="flex justify-center space-x-8">
          <li>
            <a href="#section1" className="text-white font-semibold hover:text-gray-300">
              Section 1
            </a>
          </li>
          <li>
            <a href="#section2" className="text-white font-semibold hover:text-gray-300">
              Section 2
            </a>
          </li>
          <li>
            <a href="#section3" className="text-white font-semibold hover:text-gray-300">
              Section 3
            </a>
          </li>
        </ul>
        <ul className='flex gap-6'>
          { isUserSignedIn ? (
            <>
            <Link to='/Account'><li>Account</li></Link>
            <li><button onClick={handleSignOut}>Log Out</button></li>
            </>
          ) : (
            <>
            <Link to='/Login'><li>Login</li></Link>
            <Link to='/signup'><li>SignUp</li></Link>
            </>
          ) }
          
        </ul>
        
    </nav>
  )
}

export default Navbar