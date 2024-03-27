import { useContext,createContext, useReducer, useEffect } from "react";
import browsereducer from "./reducer";

const initialvalue ={
    userlogin:false,
    userregister:false,
    userlogindata:{
        email:"",
        password:""
    },
    newuser:{
        username:"",
        email:"",
        phonenumber:"",
        password:""
    },
    idToken:localStorage.getItem("token"),
    getuserdata:{
        username:"",
        email:""
    },
    productdata :[],
    array:[],
    cartdata:"",
    total:"",
    message:""


}


const AuthContext = createContext(initialvalue);

const AuthProvider = ({children}) =>{

    
    const [{userlogin,total,message,array,cartdata,productdata,userregister,newuser,userlogindata,idToken,getuserdata},dispatch] = useReducer(browsereducer,initialvalue);

    
    
    useEffect(()=>{
        const getdata =async () =>{
            try {
                const response = await fetch("http://localhost:5000/Game/data",{
                    method:"POST"
                })
               const {msg} = await response.json();
            
               if(response.ok){
                dispatch({
                    type:"PRODUCTS",
                    payload:msg
                })
               }
                
               
            } catch (error) {
                console.log(error)
            }
        }

        getdata();
        
        
    },[])
    
    const login =async (data) =>{
        
        try {
            const response = await fetch("http://localhost:5000/user/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            if(response.ok){
                const {msg,idToken} = await response.json();
                
                return {msg,idToken}
            }else{
                const {msg} =await response.json();
                return msg
            }
        } catch (error) {
            console.log(error)
        }
    }
    const signup =async (data) =>{
        
        try {
            const response = await fetch("http://localhost:5000/user/signup",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            console.log(response)
            if(response.ok){
                const {msg,idToken} = await response.json();
                
                return {msg,idToken}
            }else{
                const {msg} =await response.json();
                return msg
            }
        } catch (error) {
            console.log(error)
        }
    }
    const sendcartdata =async (data) =>{
        try {
            const response = await fetch("http://localhost:5000/Game/cart",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            if(!response.ok){
                const {msg} = await response.json();
                return msg
            }else{
                const {msg} = await response.json();
                return msg
            }
            
        } catch (error) {
            alert("Something Wrong")
        }
    }
    
    const UpdateCart = async (data) =>{
        try {
            const response = await fetch("http://localhost:5000/Game/update",{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
        } catch (error) {
            console.log("False")
        }
    }

    const Remove = async (id) =>{
        try {
            
            const response = await fetch(`http://localhost:5000/Game/remove/${id}`,{
                method:"POST"
            })
            console.log(response)

        } catch (error) {
         console.log(error)   
        }
    }
    const order = async (data) =>{
        try {
            const response = await fetch("http://localhost:5000/Game/order",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"

                },
                body:JSON.stringify(data)
            })
            const {msg} = await response.json()
            dispatch({
                type:"ORDER",
                payload:msg
            })
            
        } catch (error) {
            console.log("error")
        }
    }

    const Empty =async () =>{
        try {
            await fetch("http://localhost:5000/Game/empty",{
                method:"POST"
            })
        } catch (error) {
            console.log("Error")
        }
    }

    useEffect(()=>{
        
       if(idToken && getuserdata.email.length){
            const getcartdata = async () =>{
                try {
                    const response = await fetch(`http://localhost:5000/Game/cartdata/${getuserdata.email}`,{
                        method:"GET",
                        
                    })
                    const {msg} = await response.json();
                
                    if(response.ok){
                        dispatch({
                            type:"SETCARTDATA",
                            payload:msg
                        })
                    }else{

                        dispatch({
                            type:"SETCARTDATA",
                            payload:msg
                        })        

            
                    }

                   
                } catch (error) {
                    console.log("error")
                }
            }
            getcartdata()
       } 
       
    },[getuserdata,sendcartdata,idToken,Empty,UpdateCart,Remove,order])

   
    
    

    return(
        <AuthContext.Provider value = {{signup,Empty,message,order,Remove,UpdateCart,sendcartdata,total,cartdata,array,productdata,userlogin,userregister,newuser,getuserdata,userlogindata,idToken,dispatch,login}} >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () =>{
    const usehook = useContext(AuthContext);
    if(!usehook){
        alert("Server error try after some time")
    }

    return usehook
}

export {useAuthContext,AuthProvider};