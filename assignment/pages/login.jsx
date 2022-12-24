import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { setCookie, hasCookie } from 'cookies-next';
import Link from 'next/link'
export default function Login() {
  // setCookie('token', 'value', options);
const [ user, setUser ] = useState({
  username:"",
  password:""
})
const [ loading, setLoading ] = useState(false);

const { username, password } = user;




  useEffect(() => {

    if(hasCookie('token'))
    router.push('/')

  }, []);


  const handlechange = (e)=>{
      let { name, value } = e.target;

      setUser({...user, [name]:value});
  }

  const handlesubmit = ()=>{
      if(username=="" || password==""){
        alert("Please enter all fields");
      }else{
         let token = "";
         setLoading(true);
         fetch('https://expertia-assignment.onrender.com/login',{
            method:"POST",
            body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json"
          }
          }).then((res)=>res.json()).then((res)=>{

            if(res.status=="success"){
              setCookie('token', res.data.token);
              alert('Login successful')
              router.push('/')
            }
            else
            alert("Invalid Credientials")
          }).catch((err)=>{
            console.log(err)
          }).finally(()=>{
            setLoading(false);
          })
        
      }
  }

  return (
    <>
      <div className='w-11/12 m-auto mt-6 border-solid border-2 border-indigo-600'>

        <h1 className='text-3xl font-bold underline mt-12'>
          Login
        </h1>

        <div className=''>
          
          <label>User name</label>
          <input type="text" placeholder='Enter your username' name="username"
           onChange={handlechange} value={username}/><br />
          
          <label>Password</label>
          <input type="password" placeholder='Enter your password' name="password" 
          onChange={handlechange} value={password}/><br />

          <button disabled={loading} onClick={handlesubmit}>Login</button><br />

          <p>Don't have an Account ? <span><Link href="/register">Register</Link></span></p>
        </div>


      </div>
    </>
  )
}
