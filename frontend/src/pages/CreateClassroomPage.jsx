import ClassRoomForm from "../components/ClassRoomForm";
import "../styles/AddChildPage.css";
import Navbar from "../components/Navbar";
import '../styles/CreateClassroomPage.css'

function AddChildPage() {
  return (
    <>
    <Navbar></Navbar>
      <div className="form-layout-container">
        <ClassRoomForm route={"/api/create/classrooms/"}></ClassRoomForm>
      </div>
    </>
  );
}

export default AddChildPage;
