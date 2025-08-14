import Navbar from "../components/Navbar";
import TeacherInfoContainer from '../components/TeacherInfoContainer';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useNavigate } from "react-router-dom";
import '../styles/SetAvailabilityPage.css';
import Schedule from "../components/Schedule";

export default function SetAvailabilityPage() {
    const [teacher, setTeacher] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserId = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    console.log(decoded);
                    setUserId(decoded.user_id);
                } catch (err) {
                    console.log("An error occured");
                }
            }
        };

        getUserId();
    }, []);

    useEffect(() => {
        const getTeacher = async () => {
            if (!userId) return;
            try {
                const res = await api.get(`api/get/teacher/${userId}/`);
                setTeacher(res.data);
                console.log("Teacher data:", res.data);
            } catch (err) {
                console.error("An error occurred fetching teacher:", err);
            }
        };

        getTeacher();
    }, [userId]);

    return (
        <>
            <Navbar />

            <div className="availability-main">
                <div className="availability-heading">
                    <h1 className="availability-title">Set availability</h1>
                    <button
                        className="availability-back"
                        onClick={() => navigate('/TeacherDashboard')}
                    >
                        <img src="/images/arrow_back.png" alt="" className="availability-icon" />
                    </button>
                </div>

                <div className="availability-content">
                    <div className="availability-card">
                        <TeacherInfoContainer teacher={teacher} />
                    </div>
                    <div className="availability-schedule">
                        <Schedule />
                    </div>
                </div>
            </div>
        </>
    );
}
