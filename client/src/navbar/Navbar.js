import { Fragment, useEffect, useRef, useState } from "react";
import {gsap} from "gsap";
import { useAuthContext } from "../contextandreducer/context";
import Modal from "../modal/Modal";
import { NavLink } from "react-router-dom";

const Navbar =  () =>{
    const [shownotification,setnotification] = useState(false);
    const {cartdata,UpdateCart,Remove,order,totalpurchase,Empty} = useAuthContext();
    const [modal,setmodal] = useState(false);
    const [discountprice,setdiscountprice] = useState("");
    const [couponcode,setcouponcode]  = useState("");
    
    const comp = useRef();
    useEffect(()=>{
        
        const ctx = gsap.context(()=>{
            let tl = gsap.timeline();

            tl.from(".animate",{
                yPercent:-120,
                duration:1,
                ease:"power4.out"
                
            })
           
        },comp)

        return () => ctx.revert();
    },[])
    useEffect(()=>{
        

    },[])
    const handleincrease = e =>{
        let item = cartdata.filter(elem => elem.id === e.target.dataset.id);
        item = item.map(elem => {
            return {...elem,quantity:elem.quantity+1}
        })
       const data ={
        id:Number(item[0].id),
        
        quantity:Number(item[0].quantity),
        email:item[0].email
       }
       
       UpdateCart(data);
        

        


    }
    const hadnledecrease = (e) =>{
        let item = cartdata.filter(elem => elem.id === e.target.dataset.id );
        if(item[0].quantity === 1){
            Remove(Number(e.target.dataset.id))
        }else{
            item = item.map(elem => {
                return {...elem,quantity:elem.quantity-1}
            })
           const data ={
            id:Number(item[0].id),
            
            quantity:Number(item[0].quantity),
            email:item[0].email
           }
           
           UpdateCart(data);
        }
    }
    const removeitem = e =>{
        Remove(Number(e.target.dataset.id));
    }
    const handlemodal = () =>{
        setmodal(prev => !prev)
    }
    const ordercartitem = () =>{
        order(cartdata);
        Empty()
    }
    
    const handle = () =>{
        setnotification(prev => !prev);
    }
    const handletotalprice  = e =>{
        e.preventDefault();
        
        let price = cartdata.reduce((acc,curr) => {
            return acc + (curr.DiscoutedPrice * curr.quantity)
        },0)
        
        price =  couponcode === "URBAN200" ? price - 200 : couponcode === "URBAN500" ? price-500 : couponcode==="URBAN700" ? price-700 : couponcode==="URBAN1000" ? price-1000 : "COUPON NOT VALID" ;
        
        setdiscountprice(price);
    }
    const handlecouponcode = e =>{
        setcouponcode(e.target.value);
    }
    
    return(
        <Fragment>
            <main ref={comp} className="lg:w-full w-screen   md:h-fit" >
                <section className="flex   rounded-2xl border-b-4  2xl:h-[10rem] xl:h-[5rem] h-10 animate  border-black overlock-regular justify-between " >
                    <div  className=" lg:m-3 flex  m-6 animate" >
                        <span className=" 2xl:text-8xl xl:text-4xl  text-xl  text-red-700 font-extrabold " >Urban</span>
                        <span className="md:text-2xl 2xl:text-6xl xl:text-xl lg:text-lg text-lg text-white   " >Games</span>
                        <span onClick={handle} className="  md:text-4xl 2xl:text-8xl  lg:text-2xl xl:text-3xl cursor-pointer material-symbols-outlined">notifications</span>
                        {
                            totalpurchase && <span>1</span>
                        }
                        {
                            shownotification && <div className="w-fit bg-white m-2 p-1 rounded-lg  border  text-center font-bold text-xl text-red-500  " >
                                <span>{totalpurchase < 5000 ? "200 OFF By Applying This Code : URBAN200" : totalpurchase<10000 && totalpurchase >=5000 ? "500 OFF By Applying This Code : URBAN500" : totalpurchase >10000 && totalpurchase <=12000 ? "700 OFF By Applying This Code : URBAN700"  : "1000 OFF By Applying This Code : URBAN1000" }</span>
                            </div>
                        }
                    </div>
                    <search className="md:m-3 xl:m-5 lg:-m-1  m-0 animate  " >
                        <input  className="  bg-transparent focus:outline-none placeholder:text-black 2xl:w-[60rem] xl:w-[20rem] lg:w-64 w-36  border-b-4  border-black  rounded-xl px-2 text-black p-1  2xl:text-7xl text-xl mx-3" placeholder="Search" type="text"  />
                        <span className= " 2xl:text-7xl  md:text-3xl lg:text-lg text-2xl relative top-3  text-white material-symbols-outlined ">search</span>
                    </search>
                    <div className="sm:m-5 2xl:m-9 xl:w-fit xl:m-5  lg:m-2 m-0 md:w-20 text-white animate  2xl:w-[10rem]   lg:w-[3rem]  w-fit relative  flex  justify-between " >
                       <NavLink to={"/"} > <span className=" md:text-4xl 2xl:text-8xl  lg:text-2xl xl:text-3xl cursor-pointer  material-symbols-outlined  ">home</span></NavLink>
                       <span  onClick={handlemodal}  className="  2xl:text-8xl md:text-3xl xl:text-3xl  lg:text-xl cursor-pointer  material-symbols-outlined">shopping_cart </span> <span className=" 2xl:bottom-14  xl:bottom-8   bottom-10   2xl:-mx-6  lg:-mx-1   mx-0 right-1 absolute z-10 text-white bg-black  2xl:text-7xl 2xl:w-20 xl:w-5 lg:w-4  lg:text-sm text-lg rounded-full   text-center " >{Array.isArray(cartdata) > 0 ? cartdata.length : 0}</span>
                        
                    </div>
                </section>
            </main>
                        
                        
            {
                modal && 
                <Modal>
                    <main  className="lg:h-screen   h-fit lg:w-screen w-fit absolute flex opacity-90 justify-center z-20 items-center " >
                        
                        <div   className="  bg-slate-400  2xl:w-[250rem]  xl:w-[70rem] lg:w-[50rem] w-fit  2xl:h-[100rem] xl:h-[40rem] lg:h-[20rem] h-fit  overflow-auto scroll " >
                        <button onClick={handlemodal} className="w-full  font-bold border rounded-xl 2xl:text-7xl text-xl bg-red-500 hover:bg-red-800" >X Cancel</button>
                        {
                            Array.isArray(cartdata) ?     <section className="opacity-100 sunshiney-regular " >
                            <div className="m-3   w-full border-b-4 p-6  2xl:text-7xl   text-xl flex justify-between " >
                                <span>Product</span>
                                <span className="mx-16  " >Quantity</span>
                                <span>Price</span>
                                <span>Remove</span>
                            </div>
                            {
                                 cartdata && cartdata.map(elem => <div key={elem.id} className="m-3 p-1 border-b-4  rounded-xl text-2xl justify-between flex " >
                                    <img className=" 2xl:w-[50rem]   w-56"  src={elem.image}  alt="noImage" />
                                    <div className="h-fit m-5 2xl:text-8xl text-xl   relative right-10 flex justify-between 2xl:w-[20rem] w-[5rem] " >
                                        <button data-id = {elem.id} onClick={hadnledecrease} className="border hover:scale-105 rounded-full  2xl:w-20 w-5 bg-red-600" >-</button>
                                        <span>{elem.quantity}</span>
                                        <button  data-id = {elem.id} onClick={handleincrease}  className="border hover:scale-105 rounded-full  2xl:w-20  w-5 bg-red-600" >+</button>
                                    </div>
                                    <span className="h-fit 2xl:text-8xl   m-5" >{elem.DiscoutedPrice * elem.quantity }</span>
                                    <button data-id = {elem.id} onClick={removeitem} className="  2xl:text-8xl border hover:scale-105   bg-red-600 rounded-lg h-fit p-1 m-5" >Remove</button>
                                </div>)
                            }
                            <form onSubmit={handletotalprice}  className="flex m-3 gap-5" >
                                <label className = "text-center" >** Apply Coupon **</label>
                                <input  onChange={handlecouponcode}  value ={couponcode}  placeholder="Enter Coupon Code" type="text"  className="focus:outline-none rounded-md" />
                                <button className="bg-red-600 px-2 rounded-md" >Submit</button>
                            </form>
                            {
                                isNaN(discountprice) ? <span className="m-5 p-3 text-red-800 font-bold " >*** {discountprice}</span> : <span></span>
                            }

                            <div className="border-x-4 p-3 text-xl 2xl:text-8xl font-bold flex justify-between   rounded-lg " >  
                                <span  >Total Price  </span>
                                {
                                   isNaN(discountprice) ? <span>  {   cartdata.reduce((acc,curr) => {
                                        return acc + (curr.DiscoutedPrice * curr.quantity)
                                    },0)    } Rupees </span> : <span>{discountprice} Rupees </span>
                                }

                                
                             </div>
                             <button onClick={ordercartitem} className="2xl:text-8xl  xl:text-xl   font-bold border w-full rounded-xl bg-red-500 hover:bg-red-600 " >Order</button>

                        </section> : <h1 className="  2xl:text-8xl text-center p-10 text-4xl " >{cartdata}</h1>
                        }
                        </div>
                    </main>
                </Modal>
            }
           
        </Fragment>
    )

}

export default Navbar;