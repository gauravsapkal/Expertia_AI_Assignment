import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { hasCookie, deleteCookie, getCookie } from 'cookies-next';
import jwt_decode from "jwt-decode";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [date, setdate] = useState("");
  const [todo, settodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tododata, settododata] = useState("");

  useEffect(() => {

    // let token = JSON.parse(localStorage.getItem("token"));

    if (!hasCookie('token'))
      router.push('/login')
    else {
      let token = getCookie('token');
      var decoded = jwt_decode(token);
      setUser(decoded);
      getdata();
    }


  }, []);


  useEffect(() => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let arr = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec"]
    let date = dd + "th " + arr[mm - 1] + ', ' + yyyy;
    setdate(date);

  }, [])


  const getdata = () => {
    setLoading(true);
    let token = getCookie('token');
    fetch('https://expertia-assignment.onrender.com/tasks', {
      headers: {
        Authorization: token
      }
    }).then((res) => res.json()).then((res) => {
      if (res.status == "success")
        settodo(res.data)
      else
        alert('Authorization failed')
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    })
  }





  // style={{
  //   height: "900px",
  //   width: "1440px",
  //   border: "2px solid teal",
  //   margin: "auto",
  //   marginTop:"20px"
  // }}

  const handlesubmit = () => {
    if (tododata == "") {
      alert("Task should not be empty")
    } else {
      let token = getCookie('token');
      setLoading(true)
      fetch('https://expertia-assignment.onrender.com/tasks', {
        method: "POST",
        body: JSON.stringify({
          "task": tododata
        }),
        headers: {
          Authorization: token,
          "Content-type": "application/json"
        }
      }).then((res) => res.json()).then((res) => {
        if (res.status == "success")
          getdata();
        else
          alert("Daily limit exceeded")
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        settododata("");
        setLoading(false);
      })
    }
  }

  const handlelogout = () => {
    deleteCookie("token")
    router.push('/login')
  }
  return (
    <>
      <div className='w-10/12 sm:w-2/6 m-auto mt-14 h-5/6 rounded-md border-solid border-2 border-black'>



        <div>

          <div className='border-solid border-2 border-white w-11/12 m-auto mt-8'>
            
            <h1 className='font-light text-2xl'>Hello</h1>

            <h1 className='font-medium text-3xl mt-1'
            >{user.username}</h1>

            <p className='font-normal text-base mt-3'
            >Good to see you here !</p>

            <p className='text-base font-bold mt-12 mb-8'
            >Tasks for <span>{date}</span></p>

            <div className='border-solid border-2 border-white h-40 mb-8'>
              <ul className='list-disc ml-6 font-normal text-base'>
                {
                  todo.map((elem) => (
                    <li className='mt-1' key={elem._id}>{elem.task}</li>
                  ))
                }
              </ul>
            </div>


            <input type="text" name="mytodo" placeholder='Eg. Need to finish my assignment . . .' value={tododata}
              onChange={(e) => {
                settododata(e.target.value)
              }}
              className="mt-2
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            /> <br />

            <button disabled={loading} onClick={handlesubmit}
            className="w-full bg-black text-white p-1 mt-2 rounded-lg
            hover:bg-gray-700 font-medium text-sm h-9"
            >Add New Task</button><br />

            <button onClick={handlelogout}
            className="w-full mt-2 p-1 rounded-md"
            >Logout</button>

          </div>
        </div>


      </div>
    </>
  )
}
