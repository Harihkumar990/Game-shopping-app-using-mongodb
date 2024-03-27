import {Fragment} from "react"
import FirstPage from "./FirstPage/Firstpage";
import Error from "./Error";
import { useAuthContext } from "./contextandreducer/context";
import { Routes,Route } from "react-router";
import Product from "./products/Product";
const App = () =>{
  const {array} = useAuthContext();
  return(
    <Fragment>
        <main className="bg-gray-600" >
         
          <Routes>
              <Route path="/" element = {<FirstPage/>} ></Route>
              {
                array.length>0 && <Route path="/games/:id" element ={<Product/>}/>
              }
              <Route path="*" element = {<Error/>} />
              
          </Routes>
        </main>
    </Fragment>
  )
}

export default App;
