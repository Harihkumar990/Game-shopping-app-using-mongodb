import { Fragment } from "react"
import {useAuthContext} from "../contextandreducer/context";

const LIST = ({prop,handleerror}) =>{
    const {getuserdata,productdata,dispatch,sendcartdata} = useAuthContext();
    
    
    
    
    const addtocart = async (e) =>{
    

        let array = productdata.map(elem => elem.id === Number(e.target.dataset.id) ? {...elem , quantity:1}:elem );
        
        let cartarray = array.filter(({id})=> id === Number(e.target.dataset.id )) 
        
        const cartsenddata = {
            id:cartarray[0].id,
            email:getuserdata.email,
            Name:cartarray[0].Name,
            image:cartarray[0].image,
            quantity:cartarray[0].quantity,
            DiscoutedPrice:cartarray[0].DiscoutedPrice
        }
        const answer =  await sendcartdata(cartsenddata);
        
        handleerror(answer)
        
        
        dispatch({
            type:"PRODUCTS",
            payload:array
        })
        dispatch({
            type:"SENDCARTDATA",
            payload:cartarray
        })
    }
    
    
    return(

        <Fragment>
            
            <main className="  shadow-lg shadow-yellow-500 hover:scale-105  overlock-regular h-fit  border lg:w-[30rem] 2xl:w-[60rem]  md:w-[20rem] sm:w-[20rem] w-[10rem] rounded-xl  m-7 p-4 " >
                <span className="text-white  2xl:text-5xl xl:text-lg   " >{prop.Release}</span>
                <img  className="hover:shadow-white hover:shadow-md  2xl:h-[30rem] xl:h-[15rem] lg:h-[10rem]  h-[15rem] 2xl:w-[60rem] xl:w-[30rem] lg:w-[20rem] md:w-[25rem] w-10rem " src={`${prop.image}`} alt="noImage" ></img>
                <section className="flex justify-between scroll  2xl:h-[30rem] lg:h-[15rem] h-[13rem]  flex-col  text-white " >
                    <span className="m-1 2xl:text-7xl xl:text-xl text-xl " ><span className="text-red-500" >Name</span> :  {prop.Name}</span>
                    <span  className="m-1 2xl:text-7xl  xl:text-xl text-xl  break-words  "><span className="text-red-500" >Genre</span> : {prop.Genre}</span>
                    <div className=" 2xl:text-7xl  xl:text-xl  text-xl m-1 " >
                        <span><span className="text-red-500" >Price</span> : {prop.DiscoutedPrice}</span>
                        <small className="line-through " >{prop.Price}</small>
                    </div>
                    <button onClick={addtocart} data-id = {prop.id}  className=" 2xl:text-7xl xl:text-xl w-full text-2xl hover:scale-105 border rounded-xl bg-green-600" >Add To Cart</button>


                </section>
            </main>
        </Fragment>
    )
}


export default LIST;