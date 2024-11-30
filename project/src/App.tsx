import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'))
const Trade = React.lazy(() => import('./pages/Trade'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Leaderboard = React.lazy(() => import('./pages/Leaderboard'))

const App: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="trade" element={<Trade />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </React.Suspense>
  )
}

export default App