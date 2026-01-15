import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import Overview from './components/dashboard/Overview'
import FinanceLayout from './components/finance/FinanceLayout'
import RRHHLayout from './components/rrhh/RRHHLayout'


import { FinanceProvider } from './context/FinanceContext'

function App() {
  return (
    <Router>
      <FinanceProvider>
        <div className="flex min-h-screen bg-[#fdfdff] overflow-hidden selection:bg-indigo-100 selection:text-indigo-900 font-sans">
          {/* Ambient Background */}
          <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/60 blur-[120px] pointer-events-none animate-pulse-slow z-0"></div>
          <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-cyan-50/60 blur-[100px] pointer-events-none animate-float z-0"></div>

          <Sidebar />

          <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
            <TopBar />

            <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/finanzas/*" element={<FinanceLayout />} />
                <Route path="/rrhh/*" element={<RRHHLayout />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </FinanceProvider>
    </Router>
  )
}

export default App
