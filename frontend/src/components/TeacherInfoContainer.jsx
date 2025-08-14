import { useNavigate } from "react-router-dom";
import "../styles/TeacherInfoContainer.css";

function TeacherInfoContainer({ teacher }) {
  const navigate = useNavigate()
  return (
    <div className="mainSection">
      <div className="photo-section">
        <img
          src="/images/teacherAvatar.png"
          alt="teacher-avatar"
          className="teacherAvatar"
        />
      </div>
      <div className="info-section">
        <h1 className="title">Name: {teacher.name}</h1>
        <div className="descriptionContainer">
          <div className="description">
            <h2>Description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
              repudiandae?
            </p>
          </div>
          <div className="buttonSection">
            <button onClick={()=>{navigate('/availability')}}>
              <img src="/images/calendar.png" alt="" /> Set availability
            </button>
            <button>
              Set description
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoContainer;
