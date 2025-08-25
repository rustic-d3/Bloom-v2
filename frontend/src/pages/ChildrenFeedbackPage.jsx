import React, { use, useEffect } from "react";
import { useState } from "react";
import "../styles/ChildrenFeedbackPage.css";
import ChildFeedback from "../components/ChildFeedback";
import api from "../api";
import Navbar from '../components/Navbar'

export default function ChildrenFeedbackPage() {
  const [feedback, setFeedback] = useState({});
  const [children, setChildren] = useState([]);
  const [activeTab, setActiveTab] = useState(null);

  function renderFeedback(){
    if(feedback.child){
        return <ChildFeedback feedback={feedback} child={activeTab} />
    }
    else{
        return(<h1 className="not-found">This child does not have a feedback yet...</h1>)
    }
  }

  useEffect(() => {
    async function getFeedback() {
      try {
        const res = await api.get(`api/get/feedback/child/${activeTab}`);
        setFeedback(res.data);
      } catch (err) {
        console.error("An error occured:", err);
      }
    }
    getFeedback();
  }, [activeTab]);
  console.log("active tab:", activeTab);
  useEffect(() => {
    async function getChidren() {
      try {
        const res = await api.get(`api/get/children/`);
        setChildren(res.data);
      } catch (err) {
        console.error("An error occured:", err);
      }
    }
    getChidren();
  }, []);
  console.log(children);
  console.log(feedback)

  return (
    <>
    <Navbar></Navbar>
      <div className="tabs">
        <ul>
          {children.map((child) => {
            return (
              <li>
                <a
                  href="#"
                  className="link"
                  onClick={() => setActiveTab(child.id)}
                >
                    {child.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      {renderFeedback()}
      
    </>
  );
}
