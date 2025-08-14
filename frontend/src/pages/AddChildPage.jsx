import ChildrenForm from "../components/ChildrenForm"
import '../styles/AddChildPage.css'
import Navbar from "../components/Navbar";

function AddChildPage(){
    return(
        <>
        <Navbar></Navbar>
        <div className="add-child-body">
            <ChildrenForm route ={'/api/user/register/child/'}></ChildrenForm>
        </div>
        </>
        
    )




}

export default AddChildPage