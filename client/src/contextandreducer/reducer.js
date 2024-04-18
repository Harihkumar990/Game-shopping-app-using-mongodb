const browsereducer = (state,{type,payload}) =>{
    switch(type){
        case "USERLOGIN":
            return{
                ...state,
                userlogin:!state.userlogin,

                userregister:false
            }
        case "USERREGISTER":
            return{
                ...state,
                userlogin:false,
                userregister:!state.userregister
            }
        case "LOGIN":
            return{
                ...state,
                userlogindata:{
                    ...state.userlogindata,
                    [payload[0]]:payload[1]
                }
            }
        case "NEWUSER":
            return{
                ...state,
                newuser:{
                    ...state.newuser,
                    [payload[0]]:payload[1]
                }
            }
        case "TOTAL_PURCHASE":
            return{
                ...state,
                totalpurchase:localStorage.getItem("totalpurchase") || payload
            }
        
        case "USERAUTH":
            return{
                ...state,
                idToken:payload,
                newuser:{
                    username:"",
                    email:"",
                    phonenumber:"",
                    password:""
                },
                userlogindata:{
                    email:"",
                    password:""
                }

            }
        case "SETUSERDATA":
       
        return{
            ...state,
            getuserdata:{
                ...state.getuserdata,

                username:payload.username,
                email:payload.email
            },
            userlogin:false,
            userregister:false
        
        }
        case "LOGOUT":
            localStorage.removeItem("token")
            localStorage.removeItem("totalpurchase")
            return{

                ...state,
                idToken:"",
                getuserdata:{
                    username:"",
                    email:""
                },
                cartdata:{
                    id:""
                },
                totalpurchase:""
            }
        case "PRODUCTS":
            return{
                ...state,
                productdata:payload
            }
        case "FILTERPRODUCTS":
            
            return{
                ...state,
                array:state.productdata.filter(elem => elem.Genre.replace(/\s/g, "").split(",").includes(payload))
            }
        case "SETCARTDATA":
            
            return{
                ...state,
               cartdata:payload
            }
        
        case "ORDER":
            return{
                ...state,
                message:payload
            }
        case "ADMIN":{
            console.log(payload)
            return{
                ...state,
                admindata:payload
            }
        }
            
        default:
            return state;
    }
}

export default browsereducer