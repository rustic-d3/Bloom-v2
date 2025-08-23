import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FeedbackForm from "../components/FeedbackForm";
import { useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
export default function FeedbackPage() {
  const [userId, setUserId] = useState(null);
  const [teacher, setTeacher] = useState([]);

  useEffect(() => {
    const getUserId = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded);
          setUserId(decoded.user_id);
        } catch (err) {
          console.log("an error occured");
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
      } catch (err) {
        console.error("An error occurred fetching teacher:", err);
      }
    };

    getTeacher();
    console.log("userId in feedback form:", userId);
  }, [userId]);
    console.log("teacher in feedback form:", teacher);
  return (
    <>
      <FeedbackForm teacher = {teacher}></FeedbackForm>
    </>
  );
}
