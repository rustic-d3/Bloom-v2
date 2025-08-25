import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import Rating from "@mui/material/Rating";
import '../styles/ChildFeedback.css';
import api from "../api"; 

export default function ChildFeedback({ feedback, child }) {

    const [selected_child, setSelectedChild] = useState(null);
    const [selected_techer, setTeacher] = useState(null);

  useEffect(() => {
    async function getChild() {
      try {
        if (feedback?.child) {
          const res = await api.get(`api/get/child/${feedback.child}/`);
          setSelectedChild(res.data);
        }
      } catch (err) {
        console.log("An error occurred:", err);
      }
    }
    getChild();
  },[feedback.child]);
  console.log("selected child:", selected_child);

    useEffect(() => {
    async function getTeacher() {
      try {
        if (feedback?.teacher) {
          const res = await api.get(`api/get/teacher-id/${feedback.teacher}/`);
          setTeacher(res.data);
        }
      } catch (err) {
        console.log("An error occurred:", err);
      }
    }
    getTeacher();
  },[feedback.teacher]);
  console.log("selected teacher:", selected_techer);

  return (
    <Card sx={{ maxWidth: 600, margin: "2rem auto", borderRadius: "16px", boxShadow: 3 }}>
      <CardContent>
        {/* Header */}
        <Typography variant="h5" gutterBottom>
          {feedback?.module || "Lesson Feedback"}
        </Typography>

        <Typography variant="body1">
          👦 <strong>Child:</strong> {selected_child?.name ?? "N/A..."}
        </Typography>

        <Typography variant="body1">
          👩‍🏫 <strong>Teacher:</strong> {selected_techer?.name ?? "N/A"}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Ratings */}
        <Typography variant="h6" gutterBottom>Ratings</Typography>
        <div style={{ marginBottom: "0.5rem" }}>
          <Typography variant="body2">Evoluție:</Typography>
          <Rating className="custom-rating" value={feedback?.value1 ?? 0} readOnly />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <Typography variant="body2">Însușire noțiuni de bază:</Typography>
          <Rating className="custom-rating" value={feedback?.value2 ?? 0} readOnly />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <Typography variant="body2">Interacțiune cu colegii:</Typography>
          <Rating className="custom-rating" value={feedback?.value3 ?? 0} readOnly />
        </div>

        <Divider sx={{ my: 2 }} />

        {/* Qualitative Feedback */}
        <Typography variant="h6" gutterBottom>Feedback detaliat</Typography>

        {feedback?.childCommitment && (
          <Typography paragraph>
            <strong>Implicare:</strong> {feedback.childCommitment}
          </Typography>
        )}
        {feedback?.childDifficulties && (
          <Typography paragraph>
            <strong>Dificultăți:</strong> {feedback.childDifficulties}
          </Typography>
        )}
        {feedback?.childVictory && (
          <Typography paragraph>
            <strong>Victorii:</strong> {feedback.childVictory}
          </Typography>
        )}
        {feedback?.childSolutions && (
          <Typography paragraph>
            <strong>Recomandări:</strong> {feedback.childSolutions}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
