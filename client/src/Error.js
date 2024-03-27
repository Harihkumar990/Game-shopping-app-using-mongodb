import { Fragment } from "react"
import { NavLink } from "react-router-dom";

const Error = () =>{
    return(
        <Fragment>
            <main className="h-screen  grid place-content-center" >
                <span className="text-[11rem] text-center " >404</span>
                <span className="text-4xl text-center " >Sorry, Page Not Found</span>
                <span className="text-2xl text-center text-white " >The link you followed probably broken or the page had been removed</span>
                <NavLink to={"/"} className="text-4xl border rounded-3xl m-20 text-center bg-red-600 hover:scale-105 " > Home  </NavLink>
            </main>
        </Fragment>
    )
}

export default Error;