"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./PremiumPage.css"

const PremiumPage = () => {
  const [totalProyectos, setTotalProyectos] = useState(0)
  const [totalTareas, setTotalTareas] = useState(0)
  const [fechasProximas, setFechasProximas] = useState(0)
  const [proyectos, setProyectos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    // Cargar proyectos desde localStorage
    const proyectosGuardados = JSON.parse(localStorage.getItem("proyectos") || "[]");
    setProyectos(proyectosGuardados);
    setTotalProyectos(proyectosGuardados.length);

    // Calcular tareas pendientes
    const pendientes = proyectosGuardados.reduce((acc, proyecto) => {
      if (proyecto.tareas && Array.isArray(proyecto.tareas)) {
        return acc + proyecto.tareas.filter(t => t.estado === "Pendiente").length;
      }
      return acc;
    }, 0);
    setTotalTareas(pendientes);

    // Calcular tareas con fechas próximas (próximos 3 días)
    const hoy = new Date();
    const tresDiasDespues = new Date();
    tresDiasDespues.setDate(hoy.getDate() + 3);

    let proximas = 0;
    proyectosGuardados.forEach(proyecto => {
      if (proyecto.tareas && Array.isArray(proyecto.tareas)) {
        proyecto.tareas.forEach(tarea => {
          if (tarea.estado === "Pendiente" && tarea.fechaLimite) {
            const fechaLimite = new Date(tarea.fechaLimite);
            if (fechaLimite >= hoy && fechaLimite <= tresDiasDespues) {
              proximas++;
            }
          }
        });
      }
    });
    setFechasProximas(proximas);
  }, [])

  const handleNavigateToPremiumProjects = () => {
    navigate("/proyectos-premium")
  }

  return (
    <div className="page-container">
      <Navbar isPremium={true} />

      <main>
        <div className="main-container">
          {/* Premium Badge */}
          <div className="premium-badge-section">
            <div className="premium-badge">⭐ USUARIO PREMIUM ⭐</div>
          </div>

          {/* Dashboard Section */}
          <section className="dashboard-section">
            <div className="dashboard-grid">
              <div className="dashboard-card premium-card">
                <h2>Proyectos Activos</h2>
                <p>{totalProyectos} proyectos en curso</p>
                <p className="premium-feature">✨ Sin límites</p>
              </div>
              <div className="dashboard-card premium-card">
                <h2>Tareas Pendientes</h2>
                <p>{totalTareas} tareas sin completar</p>
                <p className="premium-feature">✨ Notificaciones premium</p>
              </div>
              <div className="dashboard-card premium-card">
                <h2>Próximas Fechas Límite</h2>
                <p>{fechasProximas} tareas con fechas próximas</p>
                <p className="premium-feature">✨ Alertas prioritarias</p>
              </div>
            </div>
          </section>

          {/* Proyectos Section */}
          <section className="projects-section">
            <h2>Lista de Proyectos Premium</h2>
            <div className="table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Nombre del Proyecto</th>
                    <th>Fecha de Inicio</th>
                    <th>Fecha de Vencimiento</th>
                    <th>Importancia</th>
                    <th>Tareas</th>
                    <th>Acciones</th> {/* Nueva columna */}
                  </tr>
                </thead>
                <tbody>
                  {proyectos.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="no-projects">
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
                        <td>
                          {proyecto.tareas ? proyecto.tareas.length : 0}
                        </td>
                        <td>
                          <div className="actions">
                            <button
                              className="btn-view"
                              title="Ver Proyecto"
                              onClick={() => navigate("/proyectos-premium")}
                            >
                              Ver Proyecto👁️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="add-project-section">
              <button onClick={handleNavigateToPremiumProjects} className="btn-add-premium-project">
                Agregar Proyecto
              </button>
              <p className="no-limits-text">¡Sin límites!</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PremiumPage
