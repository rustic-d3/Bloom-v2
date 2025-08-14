import '../styles/Schedule.css'

export default function Schedule() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  
  return (
    <div className='availability-schedule-container'>
      {days.map((day, index) => (
        <div className="availability-schedule-time-field" key={index}>
          <div className="availability-schedule-circle">{day}</div>
          
          <div className="availability-schedule-time-input">
            <input type="time" /> <span></span> <input type="time" />
          </div>

          <button className='availability-schedule-option-btn'>
            <img src="/images/x.png" alt="remove" className="availability-schedule-icon" />
          </button>
          <button className='availability-schedule-option-btn'>
            <img src="/images/plus_circle.png" alt="add" className="availability-schedule-icon" />
          </button>
        </div>
      ))}
    </div>
  );
}
