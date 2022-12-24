import { useEffect, useMemo, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import { setCookie, hasCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import team from '../public/asssets/team.svg'
import Image from 'next/image'
export default function Register() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false);

  let ref = useRef(null)

  const { username, email, password } = user;




  useEffect(() => {

    if (hasCookie('token'))
      router.push('/')

  }, []);


  const handlechange = (e) => {
    let { name, value } = e.target;

    setUser({ ...user, [name]: value });
  }

  const handlesubmit = () => {
    if (username == "" || email == "" || password == "") {
      alert("Please enter all fields");
    } else {
      if (password != ref.current.value) {
        alert("Please confirm your password");
      } else {
        let token = "";
        setLoading(true);
        fetch('https://expertia-assignment.onrender.com/register', {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json"
          }
        }).then((res) => res.json()).then((res) => {

          if (res.status == "success") {
            setCookie('token', res.data.token);
            alert('Registeration successful');
            router.push('/');
          }
          else
            alert("User already exists")
          console.log(res)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          setLoading(false);
        })
      }
    }
  }

  return (
    <>
      <div className='w-10/12 flex justify-center sm:justify-between align-middle m-auto mt-8 border-solid border-2 border-white'>

        <div className='w-full sm:w-5/12 border-solid border-2 border-gray-400 rounded-md p-6'
        >
          <h1 className='font-light text-2xl mb-4'
          >Welcome !</h1>

          <h1 className='font-medium text-3xl mb-2'
          >Sign up to</h1>
          <div className="grid gap-6 mb-4">

            <p className='text-sm mb-6'>Lorem Ipsum is simply </p>

            <div className="mb-0">
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Enter your email' name="email"
                onChange={handlechange} value={email}
              />
            </div>


            <div className="mb-0">
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
                onChange={handlechange} value={password} />
            </div>


            <div className="mb-0">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Confirm your password' ref={ref} name="confirmpassword"
                />
            </div>



            <button className="text-white bg-black hover:bg-gray-700 font-medium rounded-lg text-sm w-full sm:w-auto text-center
              p-1 h-9"
              disabled={loading} onClick={handlesubmit}
            >Register</button>

            <p className='m-auto font-light'
            >Already have an Account ?  <span className='font-semibold text-base'><Link href="/login">Login</Link></span></p>

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
