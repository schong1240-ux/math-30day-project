import './DayDetail.css'

function DayDetail({ dayData, onBack, records, checklist, onSaveRecord, onToggleChecklist }) {
  return (
    <div className="day-detail">
      <button className="back-button" onClick={onBack}>
        ← 목록으로
      </button>
      
      <div className="detail-header">
        <div className="detail-day-number">Day {dayData.day}</div>
        <h1 className="detail-title">{dayData.title}</h1>
      </div>

      <section className="detail-section">
        <h2 className="section-title">✓ 오늘의 포인트</h2>
        <div className="point-box">
          {dayData.point.split('\n').map((line, idx) => (
            <p key={idx} className="point-text">{line}</p>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2 className="section-title">❇ 실천 가이드</h2>
        <ul className="guide-list">
          {dayData.guide.map((guide, idx) => (
            <li key={idx} className="guide-item">
              {guide.split('\n').map((line, lineIdx) => (
                <span key={lineIdx}>
                  {line}
                  {lineIdx < guide.split('\n').length - 1 && <br />}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-section">
        <h2 className="section-title">⭕ 오늘의 대화 예시</h2>
        <div className="example-box">
          <div className="example-child">
            <span className="example-label">아이:</span>
            <span className="example-text">{dayData.example.child}</span>
          </div>
          <div className="example-parent">
            <span className="example-label">부모:</span>
            <span className="example-text">{dayData.example.parent}</span>
          </div>
        </div>
      </section>

      <section className="detail-section">
        <h2 className="section-title">🗽 오늘의 기록</h2>
        <div className="records-box">
          {dayData.records.map((recordLabel, idx) => (
            <div key={idx} className="record-item">
              <label className="record-label">{recordLabel}</label>
              <textarea
                className="record-input"
                value={records[idx] || ''}
                onChange={(e) => onSaveRecord(idx, e.target.value)}
                placeholder="기록을 작성해주세요..."
                rows="3"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h2 className="section-title">📋 체크리스트</h2>
        <div className="checklist-box">
          {dayData.checklist.map((item, idx) => (
            <label key={idx} className="checklist-item">
              <input
                type="checkbox"
                checked={checklist[idx] || false}
                onChange={() => onToggleChecklist(idx)}
                className="checklist-checkbox"
              />
              <span className={checklist[idx] ? 'checklist-text checked' : 'checklist-text'}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DayDetail

