import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'
import JournalScreen from './screens/JournalScreen'
import DreamsScreen from './screens/DreamsScreen'
import QuestsScreen from './screens/QuestsScreen'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen warm-gradient">
        <Routes>
          <Route path="/" element={<AuthScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/dreams" element={<DreamsScreen />} />
          <Route path="/quests" element={<QuestsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
