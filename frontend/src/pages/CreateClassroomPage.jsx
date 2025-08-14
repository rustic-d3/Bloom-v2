import ClassRoomForm from "../components/ChildrenForm";
import "../styles/AddChildPage.css";
import Navbar from "../components/Navbar";

function AddChildPage() {
  return (
    <>
    <Navbar></Navbar>
      <div className="add-classroom-body">
        <ClassRoomForm route={"api/create/classrooms/"}></ClassRoomForm>
      </div>
    </>
  );
}

export default AddChildPage;
