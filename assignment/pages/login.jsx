import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { setCookie, hasCookie } from 'cookies-next';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import team from '../public/asssets/team.svg'
import gear from '../public/asssets/gear.gif'
export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);

  const { username, password } = user;




  useEffect(() => {

    if (hasCookie('token'))
      router.push('/')

  }, []);


  const handlechange = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  const handlesubmit = () => {
    if (username == "" || password == "") {
      alert("Please enter all fields");
    } else {
      let token = "";
      setLoading(true);
      fetch('https://expertia-assignment.onrender.com/login', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json"
        }
      }).then((res) => res.json()).then((res) => {

        if (res.status == "success") {
          setCookie('token', res.data.token);
          console.log(res)
          alert('Login successful')
          router.push('/')
        }
        else
          alert("Invalid Credientials")
      }).catch((err) => {
        console.log(err)
      }).finally(() => {
        setLoading(false);
      })

    }
  }

  return (
    <>
      <div className='w-10/12 flex justify-center sm:justify-between align-middle m-auto mt-12 border-solid border-2 border-white'>

        <div className='w-full sm:w-5/12 border-solid border-2 border-gray-400 rounded-md p-6'
        >
          <h1 className='font-light text-2xl mb-7'
          >Welcome !</h1>

          <h1 className='font-medium text-3xl mb-2'
          >Sign in to</h1>
          <div className="grid gap-6 mb-6">

            <p className='text-sm mb-8'>Lorem Ipsum is simply </p>

            <div className="mb-1">
              <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Enter your username' name="username" required
                onChange={handlechange} value={username}
              />
            </div>

            <div className="mb-0">
              <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Enter your password' name="password"
                onChange={handlechange} value={password} required />
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required

                />
              </div>
              <div for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-full flex justify-between">
                <p>Remember me</p> <p><a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a></p></div>
            </div>


            <button className="text-white bg-black hover:bg-gray-700 font-medium rounded-lg text-sm w-full sm:w-auto text-center
            p-1 h-9"
              disabled={loading} onClick={handlesubmit}
            >
              {
                loading ? <Image className= "rounded-lg w-8 h-7 m-auto"
                src={gear}/> : "Login"
              }
            </button>
            



            <p className='m-auto font-light'
            >Don’y have an Account ?  <span className='font-semibold text-base'><Link href="/register">Register</Link></span></p>

          </div>

        </div>



        <div className='w-7/12 hidden align-middle sm:flex'
        >
          <Image src={team} alt='team'
            className='w-full'
          />
        </div>


      </div>
    </>
  )
}
