import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import PlanesPage from "./pages/PlanesPage"
import ProyectosPage from "./pages/ProyectosPage"
import CalendarioPage from "./pages/CalendarioPage"
import WelcomePage from "./pages/WelcomePage"
import ProyectosPremiumPage from "./pages/ProyectosPremiumPage"
import PremiumPage from "./pages/PremiumPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/planes" element={<PlanesPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/calendario" element={<CalendarioPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/proyectos-premium" element={<ProyectosPremiumPage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
