import ChildrenForm from "../components/ChildrenForm"
import '../styles/AddChildPage.css'

function AddChildPage(){
    return(
        <div className="add-child-body">
            <ChildrenForm route ={'/api/user/register/child/'}></ChildrenForm>
        </div>
    )




}

export default AddChildPage