import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { setCookie, hasCookie } from 'cookies-next';
import Link from 'next/link'
export default function Register() {
  // setCookie('token', 'value', options);
const [ user, setUser ] = useState({
  username:"",
  email:"",
  password:""
})
const [ loading, setLoading ] = useState(false);

let ref = useRef(null)

const { username, email, password } = user;




  useEffect(() => {

    if(hasCookie('token'))
    router.push('/')

  }, []);


  const handlechange = (e)=>{
      let { name, value } = e.target;

      setUser({...user, [name]:value});
  }

  const handlesubmit = ()=>{
      if(username=="" || email=="" || password==""){
        alert("Please enter all fields");
      }else{
        if(password != ref.current.value){
          alert("Please confirm your password");
        }else{
         let token = "";
         setLoading(true);
         fetch('https://expertia-assignment.onrender.com/register',{
            method:"POST",
            body: JSON.stringify(user),
            headers: {
              "Content-type": "application/json"
          }
          }).then((res)=>res.json()).then((res)=>{

            if(res.status=="success"){
              setCookie('token', res.data.token);
              alert('Registeration successful');
              router.push('/');
            }
            else
            alert("User already exists")
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          }).finally(()=>{
            setLoading(false);
          })
        }
      }
  }

  return (
    <>
      <div className='w-11/12 m-auto mt-6 border-solid border-2 border-indigo-600'>

        <h1 className='text-3xl font-bold underline mt-12'>
          Register
        </h1>

        <div className=''>
          <label>Email</label>
          <input type="email" placeholder='Enter your email' name="email"
           onChange={handlechange} value={email}/><br />
          
          <label>User name</label>
          <input type="text" placeholder='Enter your username' name="username"
           onChange={handlechange} value={username}/><br />
          
          <label>Password</label>
          <input type="password" placeholder='Enter your password' name="password" 
          onChange={handlechange} value={password}/><br />
          
          <label>Confirm password</label>
          <input type="password" placeholder='Confirm your password' ref={ref}
           name="confirmpassword"/><br />


          <button disabled={loading} onClick={handlesubmit}>Register</button><br />

          <p>Already have an Account ? <span><Link href="/login">Login</Link></span></p>
        </div>


      </div>
    </>
  )
}
