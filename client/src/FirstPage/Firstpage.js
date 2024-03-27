import { Fragment, useEffect, useRef } from "react"
import Navbar from "../navbar/Navbar"
import gsap from "gsap"
import SubNavbar from "../navbar/SubNavbar"
import LOGIN from "../registerandlogin/Authenticationpage"

const FirstPage = () =>{
    const comp = useRef();
    useEffect(()=>{
        const ctx = gsap.context(()=>{
            let tl= gsap.timeline();
            tl.from(".animate-1",{
                xPercent:-250,
                ease:"expo"
            })
            .from(".animate-2",{
                yPercent:300,
                ease:"expo",
                stagger:0.7
            })
            .from(".animate-3",{
                opacity:0,
                ease:"expo"
            },1)
            .from(".animate-4",{
                xPercent:250,
                ease:"expo"
            })
        },comp)
        return () => ctx.revert();
    },[])
    return(
        <Fragment>
            
            <div  className="h-screen bg-center bg-no-repeat bg-cover   w-full "  style={{backgroundImage:`url("./content/blackflag.jpg")`}}  >
                <Navbar/>
                <div className=" md:px-12 px-0 md:m-9 m-0  flex justify-between 2xl:h-[60rem]  xl:h-[20rem] h-fit " >
                    <LOGIN/>
                    <SubNavbar/>
                </div>
                <div  ref={comp} className="  sunshiney-regular  md:h-[11rem] h-fit   border-black  flex justify-between lg:w-full md:w-fit w-72 " >
                    <span className=" animate-1 font-bold 2xl:text-9xl  md:text-4xl sm:text-4xl text-2xl h-fit  text-yellow-500  " >Level Up</span>
                    <span className="animate-2 font-bold md:text-4xl  2xl:text-9xl sm:text-3xl text-xl text-green-300   py-16 " >Your Gaming</span>
                    <span className="animate-3 font-bold md:text-3xl 2xl:text-9xl sm:text-4xl text-2xl h-fit text-white   py-5">Experience</span>
                    <span className=" animate-2 font-bold md:text-3xl 2xl:text-9xl sm:text-3xl text-xl h-fit text-white py-12 " >With</span>
                    <span className="animate-4 font-bold md:text-3xl 2xl:text-9xl sm:text-4xl text-xl h-fit " >Urban Games</span>
                </div>
            
            </div>
            
            
        </Fragment>
    )

}

export default FirstPage