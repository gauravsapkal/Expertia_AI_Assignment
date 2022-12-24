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

    if(!hasCookie('token'))
    router.push('/login')
    else{
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
        setLoading(false);
      })
    }
  }

  const handlelogout = ()=>{
    deleteCookie("token")
    router.push('/login')
  }
  return (
    <>
      <div className='w-11/12 m-auto mt-6 border-solid border-2 border-indigo-600'>

        <h1 className='text-3xl font-bold underline mt-12'>
          Home
        </h1>

        <div>
          <h1>Hello</h1>
          <h1>{user.username}</h1>
          <p>Good to see you here</p>

          <h1>Tasks for <span>{date}</span></h1>

          <div>
            <ul>
              {
                todo.map((elem) => (
                  <li key={elem._id}>{elem.task}</li>
                ))
              }
            </ul>
          </div>


          <input type="text" name="mytodo" placeholder='Eg. Need to finish my assignment . . .' value={tododata}
            onChange={(e) => {
              settododata(e.target.value)
            }}
          /> <br />
          <button disabled={loading} onClick={handlesubmit}>Add New Task</button><br />

          <button onClick={handlelogout}>Logout</button>

        </div>


      </div>
    </>
  )
}
