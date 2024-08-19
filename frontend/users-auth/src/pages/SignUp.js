import React, { useState, useEffect} from 'react' //usestate and useEffect para ma connect yung API, potek diko gets
import axios from 'axios'
import { useNavigate} from 'react-router-dom'//para kapag nag signup ka ma redirect ka sa mismong acc mo
import signUpImage2 from '../assets/images/signUpImage2.jpg'

function SignUp() {
  const [user, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  }, [])
  
  const fetchUsers = () => {
    axios
    .get('http://localhost:3001/register')
    .then((res) =>{
      //console.log(res.data)
    })
  }

  const handleRegister = (event) => {
    event.preventDefault();
    axios
    .post('http://localhost:3001/register', { email, username, password })
    .then(() =>{
      alert('Registration Successful')
      setEmail('')
      setUsername('')
      setPassword('')
      fetchUsers()
      navigate('/Login')
    })
    .catch((error) =>{
      console.log('Unable to Refister User')
    })
  }


  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex flex-col justify-center items-center'>
        <h2 className='mt-8 text-3xl font-bold mb-8'>SIGN UP</h2>
          <form className='text-center border rounded-lg w-[600px] h-[400px] p-9' onSubmit={handleRegister}>
              {/*Email Input*/}
              <label>Email</label>
              <br/>
              <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
              <br/>
              <br/>
              {/*Username Input*/}
              <label>Username</label>
              <br/>
              <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              <br/>
              <br/>
              {/*Password Input*/}
              <labe>Password</labe>
              <br/>
              <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              <br/>
              <br/>
              {/*Button*/}
              <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>Sign Up</button>
          </form>
      </div>
      <div className='w-[50%] h-[100%] flex justify-center items-center'>
        <img src={signUpImage2} alt=''></img>
         
      </div>
    </div>
  )
}

export default SignUp