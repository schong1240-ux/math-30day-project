import { useState, useEffect } from 'react'
import './App.css'
import { programData } from './data/programData'
import DayCard from './components/DayCard'
import DayDetail from './components/DayDetail'
import Progress from './components/Progress'

function App() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [records, setRecords] = useState({})
  const [checklists, setChecklists] = useState({})

  // 데이터 로드 확인
  if (!programData || programData.length === 0) {
    return (
      <div className="App" style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
        <h1>데이터를 불러오는 중...</h1>
      </div>
    )
  }

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedRecords = localStorage.getItem('math30day-records')
    const savedChecklists = localStorage.getItem('math30day-checklists')
    const savedSelectedDay = localStorage.getItem('math30day-selectedDay')
    
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    }
    if (savedChecklists) {
      setChecklists(JSON.parse(savedChecklists))
    }
    if (savedSelectedDay) {
      setSelectedDay(parseInt(savedSelectedDay))
    }
  }, [])

  // 기록 저장
  const saveRecord = (day, recordIndex, value) => {
    const newRecords = {
      ...records,
      [day]: {
        ...records[day],
        [recordIndex]: value
      }
    }
    setRecords(newRecords)
    localStorage.setItem('math30day-records', JSON.stringify(newRecords))
  }

  // 체크리스트 저장
  const toggleChecklist = (day, checklistIndex) => {
    const newChecklists = {
      ...checklists,
      [day]: {
        ...checklists[day],
        [checklistIndex]: !checklists[day]?.[checklistIndex]
      }
    }
    setChecklists(newChecklists)
    localStorage.setItem('math30day-checklists', JSON.stringify(newChecklists))
  }

  // 진행률 계산
  const calculateProgress = () => {
    let completedDays = 0
    programData.forEach(dayData => {
      const dayRecords = records[dayData.day] || {}
      const dayChecklist = checklists[dayData.day] || {}
      const hasRecords = dayData.records.every((_, idx) => dayRecords[idx])
      const hasChecklist = dayData.checklist.every((_, idx) => dayChecklist[idx])
      if (hasRecords || hasChecklist) {
        completedDays++
      }
    })
    return Math.round((completedDays / 30) * 100)
  }

  if (selectedDay) {
    const dayData = programData.find(d => d.day === selectedDay)
    if (!dayData) {
      return (
        <div className="App" style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
          <h1>Day {selectedDay} 데이터를 찾을 수 없습니다.</h1>
          <button onClick={() => setSelectedDay(null)} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            목록으로 돌아가기
          </button>
        </div>
      )
    }
    return (
      <DayDetail
        dayData={dayData}
        onBack={() => {
          setSelectedDay(null)
          localStorage.setItem('math30day-selectedDay', '')
        }}
        records={records[selectedDay] || {}}
        checklist={checklists[selectedDay] || {}}
        onSaveRecord={(recordIndex, value) => saveRecord(selectedDay, recordIndex, value)}
        onToggleChecklist={(checklistIndex) => toggleChecklist(selectedDay, checklistIndex)}
      />
    )
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 아이와 함께하는 수학 30일 프로젝트</h1>
        <Progress progress={calculateProgress()} />
      </header>
      <main className="app-main">
        <div className="days-grid">
          {programData.map((dayData) => {
            const dayRecords = records[dayData.day] || {}
            const dayChecklist = checklists[dayData.day] || {}
            const isCompleted = dayData.checklist.some((_, idx) => dayChecklist[idx]) ||
                               dayData.records.some((_, idx) => dayRecords[idx])
            
            return (
              <DayCard
                key={dayData.day}
                dayData={dayData}
                isCompleted={isCompleted}
                onClick={() => {
                  setSelectedDay(dayData.day)
                  localStorage.setItem('math30day-selectedDay', dayData.day.toString())
                }}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default App

