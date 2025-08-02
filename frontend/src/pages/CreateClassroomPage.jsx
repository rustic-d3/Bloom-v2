import ClassRoomForm from "../components/ChildrenForm"
import '../styles/AddChildPage.css'

function AddChildPage(){
    return(
        <div className="add-classroom-body">
            <ClassRoomForm route={"api/create/classrooms/"}></ClassRoomForm>
        </div>
    )




}

export default AddChildPage