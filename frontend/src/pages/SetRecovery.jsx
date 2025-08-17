import { useEffect, useState } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import { startOfWeek, addDays } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import CreateRecoveryForm from "../components/CreateRecoveryForm";
import "../styles/CreateRecoveryForm.css";

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

    const firstWeekStart = startOfWeek(firstDayOfYear, { weekStartsOn: 1 });

    const targetWeekStart = addDays(firstWeekStart, (weekNumber - 1) * 7);

    return addDays(targetWeekStart, dayMap[dayOfWeek]);
  }
  function transformAvailabilities(apiData) {
    const year = new Date().getFullYear();
    return apiData.map((item) => {
      const dateObj = getDateFromWeek(item.week_number, year, item.day_of_week);
      const dateStr = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD

      return {
        date: dateStr,
        times: [item.start_time.slice(0, 5)], // HH:MM
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

  console.log("apidata",apiData);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Set a recovery lesson</h1>
      <div className="main-box">
        <div className="container">
          <div className="flex gap-6">
            <Calendar
              onClickDay={handleDateChange}
              tileDisabled={({ date }) => {
                const dateStr = date.toISOString().split("T")[0];
                return !availabilities.some((a) => a.date === dateStr);
              }}
            />

            <div className="flex flex-col justify-center gap-3">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <button
                    key={time}
                    className="px-6 py-2 rounded-xl bg-white text-black hover:bg-purple-300"
                    onClick={() =>
                      setTime(time)
                    }
                  >
                    {time}
                  </button>
                ))
              ) : (
                <p className="italic">No availabilities</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-400 rounded-xl"
              onClick={() => navigate("/parentDashboard")}
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 rounded-xl">Set</button>
          </div>
        </div>
        <div className="container">
          <CreateRecoveryForm route={"api/create/classrooms/"} date={selectedDate} time={time}></CreateRecoveryForm>
        </div>
      </div>
    </>
  );
}
