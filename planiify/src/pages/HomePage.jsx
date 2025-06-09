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
    // Cambia estas credenciales por las que desees
    if (adminUser === "admin" && adminPass === "1234") {
      // acceso permitido
      setShowPremiumModal(false)
      setLoginError("")
      navigate("/welcome")
    } else {
      setLoginError("Credenciales incorrectas")
    }
  }

  return (
    <div className="page-container">
      <Navbar />

      {/* Botón premium flotante */}
      <button
        className="btn-premium"
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          padding: "6px 14px",
          fontSize: "0.95em",
          borderRadius: "16px",
          background: "#ffd700",
          color: "#222",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 8px #0001"
        }}
        onClick={() => setShowPremiumModal(true)}
      >
        Premium
      </button>

      {/* Modal de acceso premium */}
      {showPremiumModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 340 }}>
            <h3>Acceso Admin</h3>
            <form onSubmit={handlePremiumAccess}>
              <div className="modal-form-group">
                <label>Usuario</label>
                <input
                  type="text"
                  value={adminUser}
                  onChange={e => setAdminUser(e.target.value)}
                  className="modal-input"
                  autoFocus
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={adminPass}
                  onChange={e => setAdminPass(e.target.value)}
                  className="modal-input"
                  required
                />
              </div>
              {loginError && (
                <div style={{ color: "#dc2626", marginBottom: 8, fontSize: "0.95em" }}>
                  {loginError}
                </div>
              )}
              <div className="modal-buttons" style={{ marginTop: 10 }}>
                <button type="submit" className="btn-assign-modal">
                  Acceder
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setShowPremiumModal(false)
                    setLoginError("")
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                    <th>Importancia</th>
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
                          <span className={`priority-badge priority-${proyecto.importancia.toLowerCase()}`}>
                            {proyecto.importancia}
                          </span>
                        </td>
                        <td className="actions">
                          <button
                            className="btn-go-project"
                            onClick={() => navigate(`/proyectos?proyecto=${encodeURIComponent(proyecto.nombre)}`)}
                          >
                            Ir a proyecto
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
