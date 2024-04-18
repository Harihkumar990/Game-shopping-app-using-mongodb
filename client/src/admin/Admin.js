import { Fragment, useState } from "react";

const Admin = () =>{
   
    const [admindata,setadmindata] = useState([]);
    
    const handleadminpanel = async (value) =>{
        let variable;
        value === "count" ? variable="count" : variable = "countuser"
        try {
           
            const response = await fetch(`http://localhost:5000/Game/${variable}`,{
                method:"GET"
            })
            const {msg} = await response.json();
            setadmindata(msg)
           
            
            

        } catch (error) {
            alert("server Error");
        }
    }
    
    
    return(
        <Fragment>
          <main className="h-screen" >
            <section  className="grid   grid-cols-3" >
                <div className=" flex flex-col gap-10  2xl:text-7xl xl:text-2xl text-md  lg:text-lg m-7" >
                    <button  onClick={() => handleadminpanel("countuser")} className="border w-fit bg-red-500 rounded-2xl p-3" >Total Users</button>
                    <button onClick={() => handleadminpanel("count")} className="border w-fit bg-red-500 rounded-2xl p-3" >Profitable Orders</button>
                </div>
                
                <div className=" col-span-2 2xl:max-h-screen  xl:max-h-[44rem]  lg:max-h-[30rem] max-h-[20rem] text-md overflow-auto " >
                    {
                        admindata && admindata.map(elem => <div key={elem._id.email || elem._id.Name}  className="border-b-4 p-5 rounded-xl  2xl:text-7xl xl:text-3xl lg:text-lg text-md m-5 flex flex-col " >
                            <span className="p-2" > User :{elem._id.email?.length ? elem._id.email : elem._id.Name }</span>
                            <span>TotalAmount:   {elem.totalamount}</span>

                            


                        </div>) 
                    }
                </div>
            </section>
          </main>
        </Fragment>
    )
}

export default Admin;