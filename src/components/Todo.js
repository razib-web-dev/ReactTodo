import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { Alert, AlertTitle } from '@mui/material';
import { ImCross } from 'react-icons/im';
const Todo = () => {
    const db = getDatabase();
    let [todo,setTodo]=useState("")
    let [todoadderr,setTodoerr] = useState("")
    let [todoarr,setTodoarr] =useState([])
    let [change,setChange]=useState("")
    let [modalopen,setModalopen] =useState(false)
    let [todoUpdate,setTodoUpdate] = useState("")
    let [editid,setEditid] =useState("")
    let [editerr,setEditerr]= useState("")
    let [successmsg,setSuccessmsg] = useState("")

    let heandelChange=(e)=>(
        setTodo(e.target.value),
        setTodoerr(""),
        setSuccessmsg("")
    )

    let heandelSumit=()=>{
        if (!todo){
            setTodoerr("Please enter your Value")
        }else{
            set(push(ref(db, 'users/')), {
                username: todo,
            }).then(()=>{
                setChange(!change)
                setTodo("")
                setSuccessmsg("Success Add Task")
            })
        }
    }

    useEffect(()=>{
        let todoArr=[]
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            snapshot.forEach((item)=>{
                let todoinfo={
                    id: item.key,
                    username: item.val().username
                }
                todoArr.push(todoinfo)
            })
            setTodoarr(todoArr)
        });
    }, [change])

    let heandelDelete =(id)=>{
        const userRef = ref(db, 'users/'+id);
        remove(userRef).then(() => {
            setChange(!change)
        })
    }
    let heandelModaledit=(id)=>{
        setModalopen(true)
        setEditid(id)
    }
    let heandelChangeUpdate=(e)=>{
        setTodoUpdate(e.target.value)
        setEditerr("")
    }

    let heandelSumitUpdate=()=>{
        if (!todoUpdate){
            setEditerr("Please enter your Value")
        }else{
            const userRef = ref(db, 'users/' + editid);
            update(userRef, {
                username: todoUpdate
            }).then(() => {
                setChange(!change)
                setModalopen(false)
            })
        }
        
    }
 
  return (
    <div className='mainbody'>
          <div className='todo'>
              <div className='todo_box'>
                  <h1 style={{ textAlign:"center" }}>To App</h1>
                  {successmsg ?
                      <Alert severity="success">
                          <AlertTitle>Success</AlertTitle>
                          This is a success alert — <strong>{successmsg}</strong>
                      </Alert>
                      :""
                  }
                 
                  <h4></h4>
                  <div className='todo_input'>
                      <input placeholder='Task Add' onChange={heandelChange} value={todo} />
                      <p style={{ color:"red",marginTop:"5px" }}>{todoadderr}</p>
                      <button onClick={heandelSumit}>Add</button>
                  </div>
                  <div className='todo_show_main'>
                      {todoarr.map(item => (
                          <div className='todo_show'>
                             <div className='toto_item'>
                                  <span>{item.username}</span>
                             </div>
                              <div className='icon'>
                                  <button onClick={() => heandelDelete(item.id)}><AiOutlineDelete /></button>
                                </div>
                                 <div className='icon iconbg'>
                                   <button onClick={()=>heandelModaledit(item.id)}><AiOutlineEdit /></button>
                                </div>
                          </div>
                      ))}

                  </div>
              </div>
          </div>
          {modalopen &&
          <div className='modal'>

              <div className='modalbutton'>
                      <button onClick={() => setModalopen(false)}> <ImCross/> </button>
              </div>
                  <div className='todo'>
                      <div className='todo_box edittodo'>
                          <h1 style={{ textAlign: "center" }}>To App</h1>
                          <div className='todo_input updatebutton'>
                              <input placeholder='Task Add' onChange={heandelChangeUpdate} value={todoUpdate} />
                              <p style={{ color: "red",marginTop:"5px" }}>{editerr}</p>
                              <button onClick={heandelSumitUpdate}>Update</button>
                          </div>
                      </div>
                  </div>
          </div>
            }
    </div>
  )
}

export default Todo
