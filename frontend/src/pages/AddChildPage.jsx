import ChildrenForm from "../components/ChildrenForm"
import '../styles/AddChildPage.css'
import Navbar from "../components/Navbar";

function AddChildPage(){
    return(
        <>
        <Navbar></Navbar>
        <div className="form-layout-container">
            <ChildrenForm route ={'/api/user/register/child/'}></ChildrenForm>
        </div>
        </>
        
    )




}

export default AddChildPage