import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";
import "../styles/Form.css";
import Rating from "@mui/material/Rating";
import React from "react";

function FeedbackForm({ teacher }) {
  const [children, setChildren] = useState([]);
  const [classrooms, setClassRooms] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [childCommitment, setChildCommitment] = useState("");
  const [childVictory, setChildVictory] = useState("");
  const [childDifficulties, setChildDifficulties] = useState("");
  const [childSolutions, setChildSolutions] = useState("");
  const [studyLesson, setStudyLesson] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const get_children = async () => {
      try {
        const res = await api.get(`api/get/teacher/children/`);
        setChildren(res.data);
      } catch (err) {
        console.log("An error occured!", err);
      }
    };
    get_children();
  }, []);
  console.log("children:", children);

  useEffect(() => {
    const get_classrooms = async () => {
      try {
        const res = await api.get(`api/get/teacher/classrooms/`);
        setClassRooms(res.data);
      } catch (err) {
        console.log("An error occured!", err);
      }
    };
    get_classrooms();
  }, []);
  console.log("classrooms:", classrooms);
  console.log("children:", children);

function renderBasedOnChild() {
  const uniqueSubjects = [...new Set(classrooms.map(cls => cls.subject))];

  return uniqueSubjects.map((subject) => (
    <option key={subject} value={subject}>
      {subject}
    </option>
  ));
}



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        child: selectedChild,
        teacher: teacher.id,
        module: selectedClassroom,
        value1: value1,
        value2: value2,
        value3: value3,
        childCommitment: childCommitment,
        childVictory: childVictory,
        childDifficulties: childDifficulties,
        childSolutions: childSolutions,
        studyLesson: studyLesson,
      };

      const res = await api.post(`api/create/feedback/`, payload);
      console.log("sending:", payload);
    } catch (err) {
      console.error(
        "Error sending feebback classroom:",
        err.response?.data || err
      );
      alert("An error occurred. Check console for details.");
    }
  };

  return (
    <div className="main-container">
      <img src="/bloom-logo.png" alt="logo" className="logo-image" />
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="field">
          <p className="label">Select Child</p>

          <div className="input-field">
            <img src="/images/user.png" alt="" className="icon" />
            <select
              className="form-input"
              value={selectedChild || ""}
              onChange={(e) => setSelectedChild(e.target.value)}
            >
              <option value="" disabled>
                Select a child for recovery
              </option>
              {children.map((child) => {
                return <option value={child.id}>{child.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="field">
          <p className="label">Select Module</p>

          <div className="input-field">
            <img src="/images/user.png" alt="" className="icon" />
            <select
              className="form-input"
              id="selectedClassroom"
              value={selectedClassroom || ""}
              onChange={(e) => {
                setSelectedClassroom(e.target.value);
              }}
            >
              <option value="" disabled>
                Select child's module
              </option>
              {renderBasedOnChild()}
            </select>
          </div>
        </div>
        <div className="field">
          <p className="label">
            Pe o scală de la 1 la 5, pe parcursul modulului elevul a evoluat:
          </p>

          <div className="input-field">
            <Rating
              name="simple-controlled"
              value={value1}
              onChange={(event, newValue) => {
                setValue1(newValue);
              }}
            />
          </div>
        </div>
        <div className="field">
          <p className="label">
            Pe o scală de la 1 la 5, elevul a însușit cu succes noțiunile de
            bază:
          </p>

          <div className="input-field">
            <Rating
              name="simple-controlled"
              value={value2}
              onChange={(event, newValue) => {
                setValue2(newValue);
              }}
            />
          </div>
        </div>
        <div className="field">
          <p className="label">
            Pe o scală de la 1 la 5, elevul a interacționat cu colegii din grup:
          </p>

          <div className="input-field">
            <Rating
              name="simple-controlled"
              value={value3}
              onChange={(event, newValue) => {
                setValue3(newValue);
              }}
            />
          </div>
        </div>
        <div className="field">
          <p className="label">
            Implicarea elevului în rezolvarea sarcinilor și a exercițiilor
            practice:
          </p>

          <div className="input-field">
            <textarea
              value={childCommitment}
              name="implicare"
              onChange={(e) => setChildCommitment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <p className="label">
            Aspecte la care elevul a întâmpinat dificultăți și cum le-a depășit:
          </p>

          <div className="input-field">
            <textarea
              value={childDifficulties}
              name="implicare"
              onChange={(e) => setChildDifficulties(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <p className="label">Victoriile elevului:</p>

          <div className="input-field">
            <textarea
              value={childVictory}
              name="implicare"
              onChange={(e) => setChildVictory(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <p className="label">Recomandări pentru elev:</p>

          <div className="input-field">
            <textarea
              value={childSolutions}
              name="implicare"
              onChange={(e) => setChildSolutions(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="field">
          <p className="label">Tema de studiu:</p>

          <div className="input-field">
            <textarea
              value={studyLesson}
              name="implicare"
              onChange={(e) => setStudyLesson(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="buttons">
          <button
            className="appButton form-button"
            onClick={() => navigate("/teacherDashboard")}
          >
            Cancel
          </button>
          <button
            className=" appButton form-button"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;
