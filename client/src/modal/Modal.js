import { Fragment } from "react"
import ReactDOM  from "react-dom" 

const Modal = ({children}) =>{
    return(
        <Fragment>
            {
                ReactDOM.createPortal(
                    <main  >
                        <div>
                            {children}
                        </div>
                    </main>,
                    document.getElementById("modal-root")
                )
            }
        </Fragment>
    )   
}

export default Modal;