import './Progress.css'

function Progress({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-label">
        진행률: {progress}%
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Progress

