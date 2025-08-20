import { useEffect, useState } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import { startOfWeek, addDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import CreateRecoveryForm from "../components/CreateRecoveryForm";
import "../styles/SetRecoveryForm.css";
import Navabr from "../components/Navbar";

export default function SetRecovery() {
  const navigate = useNavigate();
  const [availabilities, setAvailabilities] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [time, setTime] = useState(null);
  const location = useLocation();
  const teacherData = location.state || {};
  const dayMap = { SUN: 0, MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6 };
  function getDateFromWeek(weekNumber, year, dayOfWeek) {
    const firstDayOfYear = new Date(year, 0, 1);

    const firstWeekStart = startOfWeek(firstDayOfYear);

    const targetWeekStart = addDays(firstWeekStart, (weekNumber - 1) * 7);

    return addDays(targetWeekStart, dayMap[dayOfWeek]);
  }
  function transformAvailabilities(apiData) {
    const year = new Date().getFullYear();
    return apiData.map((item) => {
      const dateObj = getDateFromWeek(item.week_number, year, item.day_of_week);

      const dateStr = dateObj.toLocaleDateString("en-CA");

      return {
        date: dateStr,
        times: [item.start_time.slice(0, 5)],
      };
    });
  }
  console.log(teacherData.id);

  useEffect(() => {
    if (!teacherData.id) return;
    async function getAvailabilities() {
      try {
        const res = await api.get(
          `api/get/allAvailabilities/${teacherData.id}`
        );
        const transformed = transformAvailabilities(res.data);
        setAvailabilities(transformed);
        setApiData(res.data);
      } catch (err) {
        console.log("Something went off:", err);
      }
    }
    getAvailabilities();
  }, [teacherData.id]);

  const handleDateChange = (date) => {
    const dateStr = date.toLocaleDateString("en-CA");
    setSelectedDate(dateStr);

    const found = availabilities.find((a) => a.date === dateStr);
    setAvailableTimes(found ? found.times : []);
  };

  console.log("transormedData", availabilities);

  return (
    <>
    <Navabr></Navabr>
      <div className="main-box">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Set a recovery lesson
        </h1>

        <div className="main-section w-full max-w-5xl flex flex-col md:flex-row gap-8 p-6">
          {/* Calendar + Times */}
          <div className="flex flex-col items-center gap-6 flex-1 calendar-container">
            <Calendar
              className="bc-calendar"
              prev2Label={null}
              next2Label={null}
              onClickDay={handleDateChange}
              tileDisabled={({ date }) => {
                const dateStr = date.toLocaleDateString("en-CA");
                return !availabilities.some((a) => a.date === dateStr);
              }}
            />

            <div className="time-pills justify-center">
              {availableTimes.length ? (
                availableTimes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`time-pill ${
                      time === t ? "time-pill--active" : ""
                    }`}
                  >
                    {t}
                  </button>
                ))
              ) : (
                <p className="no-times">No availabilities</p>
              )}
            </div>

          </div>

          {/* Form */}
          <div className="create-recovery-form">
            <CreateRecoveryForm
              route={"api/create/classrooms/"}
              date={selectedDate}
              time={time}
            />
          </div>
        </div>
      </div>
    </>
  );
}
