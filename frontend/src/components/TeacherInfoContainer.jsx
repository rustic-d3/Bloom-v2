import { useNavigate } from "react-router-dom";
import "../styles/TeacherInfoContainer.css";

function TeacherInfoContainer({ teacher, isTeacherAccount }) {
  function renderButtons() {
    if (isTeacherAccount) {
      return (
        <div className="buttonSection">
          <button
            onClick={() => {
              navigate("/availability");
            }}
          >
            <img src="/images/calendar.png" alt="" /> Set availability
          </button>
          <button>Set description</button>
        </div>
      );
    } else {
      return (
        <div className="buttonSection">
          <button
            onClick={() => {
              navigate("/set-lesson");
            }}
          >
            <img src="/images/calendar.png" alt="" /> Set lesson
          </button>
          <button
            onClick={() => {
              navigate("/child-feedabck");
            }}
          >
            Child's Feedback{" "}
          </button>
        </div>
      );
    }
  }
  const navigate = useNavigate();
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
          {renderButtons()}
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoContainer;
