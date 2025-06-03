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
  const navigate = useNavigate()

  useEffect(() => {
    // Cargar proyectos desde localStorage
    const proyectosGuardados = JSON.parse(localStorage.getItem("proyectos") || "[]")
    setProyectos(proyectosGuardados)
    setTotalProyectos(proyectosGuardados.length)
  }, [])

  const handleNavigateToProjects = () => {
    navigate("/proyectos")
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
                          <button className="btn-view">Ver</button>
                          <button className="btn-edit">Editar</button>
                          <button className="btn-delete">Eliminar</button>
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
