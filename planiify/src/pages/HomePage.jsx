"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./HomePage.css"

const HomePage = () => {
  const [totalProyectos, setTotalProyectos] = useState(0)
  const [totalTareas, setTotalTareas] = useState(5)
  const [fechasProximas, setFechasProximas] = useState(3)
  const [proyectos, setProyectos] = useState([])
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [adminUser, setAdminUser] = useState("")
  const [adminPass, setAdminPass] = useState("")
  const [loginError, setLoginError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    // Cargar proyectos desde localStorage
    const proyectosGuardados = JSON.parse(localStorage.getItem("proyectos") || "[]")
    setProyectos(proyectosGuardados)
    setTotalProyectos(proyectosGuardados.length)

    // Calcular tareas pendientes reales de todos los proyectos
    let tareasPendientes = 0
    let tareasProximas = 0
    const hoy = new Date()
    const en7dias = new Date()
    en7dias.setDate(hoy.getDate() + 7)

    proyectosGuardados.forEach(proyecto => {
      if (proyecto.tareas && Array.isArray(proyecto.tareas)) {
        tareasPendientes += proyecto.tareas.filter(t => t.estado === "Pendiente").length

        tareasProximas += proyecto.tareas.filter(t => {
          if (t.estado !== "Pendiente" || !t.fechaLimite) return false
          const fechaLimite = new Date(t.fechaLimite)
          return fechaLimite >= hoy && fechaLimite <= en7dias
        }).length
      }
    })
    setTotalTareas(tareasPendientes)
    setFechasProximas(tareasProximas)
  }, [])

  const handleNavigateToProjects = () => {
    navigate("/proyectos")
  }

  const handlePremiumAccess = (e) => {
    e.preventDefault()
    setShowPremiumModal(false)
    setLoginError("")
    navigate("/welcome")
  }

  return (
    <div className="page-container">
      <Navbar />

      <main>
        <div className="main-container">
          {/* Dashboard Section */}
          <section className="dashboard-section">
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Proyectos Activos</h2>
                <p>{totalProyectos} proyectos en curso</p>
              </div>
              <div className="dashboard-card">
                <h2>Tareas Pendientes</h2>
                <p>{totalTareas} tareas sin completar</p>
              </div>
              <div className="dashboard-card">
                <h2>Próximas Fechas Límite</h2>
                <p>{fechasProximas} tareas con fechas próximas</p>
              </div>
            </div>
          </section>

          {/* Proyectos Section */}
          <section className="projects-section">
            <h2>Lista de Proyectos</h2>
            <div className="table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Nombre del Proyecto</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Tareas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {proyectos.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="no-projects">
                        No hay proyectos registrados
                      </td>
                    </tr>
                  ) : (
                    proyectos.map((proyecto, index) => (
                      <tr key={index}>
                        <td className="project-name">{proyecto.nombre}</td>
                        <td>{proyecto.fechaInicio}</td>
                        <td>{proyecto.fechaLimite}</td>
                        <td>
                          {/* Mostrar número de tareas asignadas */}
                          {proyecto.tareas ? proyecto.tareas.length : 0}
                        </td>
                        <td>
                          <button
                            className="action-btn view-btn"
                            title="Ver Proyecto"
                            onClick={() => {
                              navigate("/proyectos")
                            }}
                          >
                            Ver Proyecto👁️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="add-project-section">
              <button onClick={handleNavigateToProjects} className="btn-add-project">
                Agregar Proyecto
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

localStorage.setItem("token", "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiaWF0IjoxNzQ5MDgxNjgzLCJleHAiOjE3NDkxNjgwODN9.IPKrUz3euTxdCVyqsmhXsRooxFcXVAoAgZn4ilrGb_I0TFIfn7j0S9_Soge2lsaS")
