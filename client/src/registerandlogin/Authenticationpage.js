import { Fragment, useEffect, useRef} from "react"
import { useAuthContext } from "../contextandreducer/context"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gsap from "gsap"
const LOGIN = () =>{
    const {userlogin,userregister,dispatch,userlogindata,newuser,login,signup} = useAuthContext();
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            userlogin ? 
            tl.from(".animate-login",{
                yPercent:-150,
                opacity:0,
                duration:0.5,
                ease:"expo"

            }) : tl.to(".animate-login",{
                yPercent:-150,
                opacity:0,
                duration:0.5,
                ease:"expo"
            })
            

            userregister ? tl.from(".animate-newuser",{
                yPercent:-150,
                opacity:0,
                duration:0.5,
                ease:"expo"
            },0) : tl.to(".animate-newuser",{
                yPercent:-150,
                opacity:0,
                duration:0.5,
                ease:"expo"
            },0)
        },comp)
        
        return () => ctx.revert();
    },[userlogin,userregister])

    
    const handlesubmit = async (e,value) =>{
        e.preventDefault();
        if(value === "login"){
            const aswer = await login(userlogindata)
            toast(aswer.msg);
            localStorage.setItem("token",aswer.idToken)
            dispatch({
                type:"USERAUTH",
                payload:aswer.idToken
            })
        }else if(value === "newuser"){
            const aswer = await signup(newuser)
            toast(aswer.msg);
            localStorage.setItem("token",aswer.idToken)
            dispatch({
                type:"USERAUTH",
                payload:aswer.idToken
            })
        }

       
    }

    const handleexistuser = e =>{
        dispatch({
            type:"LOGIN",
            payload:[e.target.name,e.target.value]
        })
        
    
    }

    const handlenewuser = e =>{
        dispatch({
            type:"NEWUSER",
            payload:[e.target.name,e.target.value]
        })
    }
    
    return(
        <Fragment>
            <main  ref={comp}  className="flex  " > 
            <ToastContainer/>
                <form  onSubmit={(e) => handlesubmit(e,"login")}  className=" 2xl:w-[50rem]  md:w-64 w-36 animate-login border flex bg-blue-300  md:m-3 m-0 md:my-3 my-0 md:p-3 p-0 overlock-regular md:h-56 h-28 2xl:h-[40rem]  rounded-lg justify-between  flex-col" >
                    <span className="text-center bg-red-500 rounded-lg 2xl:text-6xl md:text-2xl text-xl  font-semibold text-white" >LOGIN</span>
                    <input onChange={handleexistuser}  name="email" value={userlogindata.email }  className=" 2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white   rounded-lg  placeholder:text-black"  placeholder="Enter Email" type="text" />
                    <input onChange={handleexistuser}  name="password" value = {userlogindata.password}  className=" 2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white  rounded-lg  placeholder:text-black"  placeholder="Enter Passsword" type="password"  />
                    <button className="border text-xl  rounded-lg bg-red-500 hover:scale-105 2xl:text-6xl hover:shadow-white hover:shadow-lg" >Submit</button>
                </form>
                <form onSubmit={(e)=>handlesubmit(e,"newuser")} className=" 2xl:h-[40rem] 2xl:w-[50rem] animate-newuser border flex bg-blue-300  m-3 my-3  p-3 md:w-80 sm:w-56 w-28 overlock-regular   rounded-lg justify-between  flex-col" >
                    <span className="text-center bg-red-500 rounded-lg 2xl:text-6xl md:text-2xl text-lg font-semibold text-white" >Register New User</span>
                    <input onChange={handlenewuser} name="username" value = {newuser.username} className=" 2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white  border-b-4 rounded-lg  placeholder:text-black"  placeholder="Enter Name" type="text" />
                    <input onChange={handlenewuser} name ="email" value = {newuser.email} className="2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white  border-b-4 rounded-lg  placeholder:text-black"  placeholder="Enter Email" type="text"  />
                    
                    <input onChange={handlenewuser} name = "phonenumber" value={newuser.phonenumber} className=" 2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white  border-b-4 rounded-lg  placeholder:text-black"  placeholder="Enter Phone Number" type="text" />
                    <input onChange={handlenewuser} name="password" value={newuser.password} className="2xl:text-6xl md:text-xl text-lg px-1 focus:outline-none focus:shadow-lg focus:shadow-white  border-b-4 rounded-lg  placeholder:text-black"  placeholder="Enter Passsword" type="password"  />
                    
                    <button className="border text-xl 2xl:text-6xl  rounded-lg bg-red-500 hover:scale-105 hover:shadow-white hover:shadow-lg" >Submit</button>
                </form>
                
            </main>
            
        </Fragment>
    )
}

export default LOGIN