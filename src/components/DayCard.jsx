import './DayCard.css'

function DayCard({ dayData, isCompleted, onClick }) {
  return (
    <div 
      className={`day-card ${isCompleted ? 'completed' : ''}`}
      onClick={onClick}
    >
      <div className="day-number">Day {dayData.day}</div>
      <h3 className="day-title">{dayData.title}</h3>
      <div className="day-point">{dayData.point.split('\n')[0]}</div>
      {isCompleted && <div className="completed-badge">✓ 완료</div>}
    </div>
  )
}

export default DayCard

