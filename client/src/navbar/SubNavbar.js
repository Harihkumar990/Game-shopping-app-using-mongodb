import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";

import { useAuthContext } from "../contextandreducer/context";
import { NavLink,useNavigate } from "react-router-dom";
const SubNavbar = () =>{
    const navigate = useNavigate();
    const {dispatch,idToken,getuserdata} = useAuthContext();
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();
            tl.from(".animate",{
                opacity:0,
                xPercent:150,
                duration:0.6,
                stagger:0.3,
                ease:"expo.inOut"
            })
        },comp)

        return () => ctx.revert()
    },[])
    useEffect(()=>{
        const getdata = async () =>{
            try {
                    const response = await fetch("http://localhost:5000/user/userdata",{
                    method:"GET",
                    headers:{
                        "Authorization":idToken
                    }
                    
                })
                if(response.ok){
                    const {userdata }= await response.json();
                    const {username,email} = userdata;
                    
                    dispatch({
                        type:"SETUSERDATA",
                        payload:{
                            username,
                            email
                        }
                    })
                    
                }else{
                    localStorage.removeItem("token")
                }
                
            } catch (error) {
                
            }
        }
       
        getdata()
    },[idToken,dispatch])
    const enteradminpanel = () =>{
        navigate("/admin")
    }
    
    return(
        <Fragment>
            <main ref={comp} className=" m-6   text-2xl  2xl:p-20 lg:p-0  xl:p-5 h-full   text-end flex flex-col justify-between"  >
                <NavLink  to={"/games/filteraction"} ><button  onClick={()=>dispatch({
                    type:"FILTERPRODUCTS",
                    payload:"Action"
                })} className=" animate 2xl:text-8xl  text-2xl text-neutral-700 font-bold rounded-lg hover:shadow-lg hover:shadow-white hover:scale-105 cursor-pointer  px-3  bg-red-600 " >Action</button></NavLink>
                <NavLink to={"/games/filteradventure"} > <button onClick={()=>dispatch({
                    type:"FILTERPRODUCTS",
                    payload:"Adventure"
                })}  className="animate text-2xl  2xl:text-8xl  text-white font-bold rounded-lg hover:shadow-lg hover:shadow-white hover:scale-105 cursor-pointer px-4 p-1  bg-red-600" >Adventure</button></NavLink>
                <NavLink to={"/games/filterfighting"} > <button onClick={()=>dispatch({
                    type:"FILTERPRODUCTS",
                    payload:"Fighting"
                })}  className=" animate text-2xl  2xl:text-8xl  font-bold rounded-lg hover:shadow-lg hover:shadow-white hover:scale-105 cursor-pointer  bg-red-600 px-3 " >Fighting</button></NavLink>
                <NavLink to={"/games/filterrpg"} > <button onClick={()=>dispatch({
                    type:"FILTERPRODUCTS",
                    payload:"RPG"
                })}  className="animate text-2xl  2xl:text-8xl  text-white font-bold rounded-lg hover:shadow-lg hover:shadow-white hover:scale-105 cursor-pointer px-3 p-1 bg-red-600" >RPG</button></NavLink>
                {
                    idToken  ?<>
                        {
                            getuserdata.username === "Harish Admin" ? <span onClick={enteradminpanel}  className= "text-center  2xl:text-8xl  cursor-pointer animate border font-bold rounded-lg hover:shadow-lg hover:scale-105 bg-red-500 hover:shadow-white" >{getuserdata.username}</span> :<span  className= "text-center  2xl:text-8xl  cursor-pointer animate border font-bold rounded-lg hover:shadow-lg hover:scale-105 bg-red-500 hover:shadow-white" >{getuserdata.username}</span>
                        }
                        <span onClick={()=>{
                            dispatch({
                                type:"LOGOUT",
                                payload:""
                            })
                        }}  className= "  2xl:text-8xl  text-center animate border cursor-pointer font-bold rounded-lg hover:shadow-lg hover:scale-105 bg-red-500 hover:shadow-white" >Logout</span>

                    </> : <><button  onClick={()=>{
                                dispatch({
                                    type:"USERLOGIN",
                                    payload:""
                                })
                            }}   className= " 2xl:text-8xl  text-xl animate border font-bold rounded-lg hover:shadow-lg hover:scale-105 bg-red-500 hover:shadow-white" >Login</button>
                            <button  onClick={()=>{
                                dispatch({
                                    type:"USERREGISTER",
                                    payload:""
                                })
                            }} className=" 2xl:text-8xl text-xl animate border font-bold rounded-lg hover:shadow-lg hover:scale-105 bg-red-500 hover:shadow-white" >Register New User</button> 
                            
                     </>
                }
            </main>
        </Fragment>
    )
}

export default SubNavbar;