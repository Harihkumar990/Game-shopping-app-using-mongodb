import { Fragment} from "react";

import Navbar from "../navbar/Navbar";
import { useAuthContext } from "../contextandreducer/context";
import LIST from "./listitems";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () =>{
    const {array,dispatch} = useAuthContext();
    const toastify = (message) =>{
        toast(message)
    }

    return(
        <Fragment>
            <main className="h-screen bg-grey-500" >
                <ToastContainer/>
                <nav className="bg-slate-500 rounded-xl "><Navbar/></nav>
                <section className="flex " >
                    <div className="overflow-y-scroll grid scroll  2xl:grid-cols-4  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 2xl:max-h-[150rem] xl:max-h-[35rem] lg:max-h-[22rem] md:max-h-[40rem] max-h-20rem " >
                        {
                            array.length>0 && array.map(elem => <LIST key={elem._id} prop={elem} handleerror = {toastify} />)
                        }
                        
                    </div>
                    <div className=" 2xl:text-8xl  xl:text-3xl sm:text-lg text-md m-6  flex flex-col p-5 sunshiney-regular text-white " >
                            <button onClick={()=> dispatch({
                                type:"FILTERPRODUCTS",
                                payload:"Action"
                            })} className="m-4  hover:shadow-md p-1  hover:scale-105 hover:shadow-white rounded-xl cursor-pointer bg-red-700 " >Action</button>
                            <button onClick={()=> dispatch({
                                type:"FILTERPRODUCTS",
                                payload:"Adventure"
                            })} className="m-4  hover:shadow-md p-1 px-3  hover:scale-105 hover:shadow-white rounded-xl cursor-pointer bg-red-700">Adventure</button>
                            <button onClick={()=> dispatch({
                                type:"FILTERPRODUCTS",
                                payload:"Fighting"
                            })} className="m-4  hover:shadow-md p-2  hover:scale-105 hover:shadow-white rounded-xl cursor-pointer bg-red-700" >Fighting</button>
                            <button onClick={()=> dispatch({
                                type:"FILTERPRODUCTS",
                                payload:"RPG"
                            })} className="m-4 p-1   hover:shadow-md hover:scale-105 hover:shadow-white rounded-xl cursor-pointer bg-red-700 ">RPG</button>                        
                    </div>
                </section>
            
                
            </main>
        </Fragment>
    )
}

export default Product;