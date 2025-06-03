"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./ProyectosPage.css"

const ProyectosPage = () => {
  const [proyectos, setProyectos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaLimite: "",
    importancia: "Alta",
  })
  const [tareaData, setTareaData] = useState({
    nombre: "",
    asignado: "",
    fechaLimite: "",
    estado: "Pendiente",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const proyectosGuardados = JSON.parse(localStorage.getItem("proyectos") || "[]")
    setProyectos(proyectosGuardados)
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleTareaInputChange = (e) => {
    setTareaData({
      ...tareaData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Verificar límite de proyectos (máximo 5 para plan estándar)
    const userPlan = localStorage.getItem("userPlan") || "standard"
    if (userPlan === "standard" && proyectos.length >= 5) {
      setShowLimitModal(true)
      return
    }

    const nuevoProyecto = {
      ...formData,
      tareas: [],
    }

    const nuevosProyectos = [...proyectos, nuevoProyecto]
    setProyectos(nuevosProyectos)
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))

    setFormData({
      nombre: "",
      fechaInicio: "",
      fechaLimite: "",
      importancia: "Alta",
    })
  }

  const eliminarProyecto = (index) => {
    const nuevosProyectos = proyectos.filter((_, i) => i !== index)
    setProyectos(nuevosProyectos)
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))
    setShowDeleteModal(false)
  }

  const asignarTarea = (projectIndex) => {
    setSelectedProjectIndex(projectIndex)
    setShowModal(true)
  }

  const handleTareaSubmit = (e) => {
    e.preventDefault()
    if (selectedProjectIndex !== null) {
      const nuevosProyectos = [...proyectos]
      if (!nuevosProyectos[selectedProjectIndex].tareas) {
        nuevosProyectos[selectedProjectIndex].tareas = []
      }
      nuevosProyectos[selectedProjectIndex].tareas.push(tareaData)
      setProyectos(nuevosProyectos)
      localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))

      setTareaData({
        nombre: "",
        asignado: "",
        fechaLimite: "",
        estado: "Pendiente",
      })
      setShowModal(false)
      setSelectedProjectIndex(null)
    }
  }

  const handleNavigateToPlans = () => {
    navigate("/planes")
  }

  return (
    <div className="page-container">
      <Navbar />

      {/* Header */}
      <header className="page-header">
        <div className="header-container">
          <h1>¡Gestiona tus Proyectos!</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="main-container">
        <section className="form-section">
          <h2>Agregar Nuevo Proyecto</h2>

          {/* Formulario para agregar proyecto */}
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Proyecto</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="importancia">Importancia</label>
                <select
                  name="importancia"
                  value={formData.importancia}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fechaInicio">Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaLimite">Fecha Límite</label>
                <input
                  type="date"
                  name="fechaLimite"
                  value={formData.fechaLimite}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Agregar Proyecto
            </button>
          </form>
        </section>

        <section className="projects-list-section">
          <h2>Proyectos Actuales</h2>
          <div className="table-container">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Nombre del Proyecto</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha Límite</th>
                  <th>Importancia</th>
                  <th>Acciones</th>
                  <th>Tareas</th>
                  <th>Asignar Tarea</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="no-projects">
                      No hay proyectos registrados
                    </td>
                  </tr>
                ) : (
                  proyectos.map((proyecto, index) => (
                    <tr key={index}>
                      <td>{proyecto.nombre}</td>
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
                        <button
                          onClick={() => {
                            setSelectedProjectIndex(index)
                            setShowDeleteModal(true)
                          }}
                          className="btn-delete"
                        >
                          Eliminar
                        </button>
                      </td>
                      <td>{proyecto.tareas?.length || 0} tareas</td>
                      <td>
                        <button onClick={() => asignarTarea(index)} className="btn-assign">
                          Asignar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal para asignar tarea */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Asignar Tarea</h2>
            <form onSubmit={handleTareaSubmit}>
              <div className="modal-form-group">
                <label>Nombre de la tarea</label>
                <input
                  type="text"
                  name="nombre"
                  value={tareaData.nombre}
                  onChange={handleTareaInputChange}
                  className="modal-input"
                  placeholder="Nombre de la tarea"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Asignado a</label>
                <input
                  type="text"
                  name="asignado"
                  value={tareaData.asignado}
                  onChange={handleTareaInputChange}
                  className="modal-input"
                  placeholder="Asignado a"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Fecha límite</label>
                <input
                  type="date"
                  name="fechaLimite"
                  value={tareaData.fechaLimite}
                  onChange={handleTareaInputChange}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  value={tareaData.estado}
                  onChange={handleTareaInputChange}
                  className="modal-input"
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-assign-modal">
                  Asignar
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de límite de proyectos */}
      {showLimitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Límite de Proyectos Alcanzado!</h3>
            <p>
              Ya has alcanzado el límite máximo de 5 proyectos. <strong>Actualiza tu plan ahora</strong>
            </p>
            <div className="modal-buttons">
              <button onClick={() => setShowLimitModal(false)} className="btn-cancel">
                Cerrar
              </button>
              <button onClick={handleNavigateToPlans} className="btn-upgrade">
                ¡Actualizar plan!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar este proyecto?</h3>
            <div className="modal-buttons">
              <button
                onClick={() => selectedProjectIndex !== null && eliminarProyecto(selectedProjectIndex)}
                className="btn-confirm-delete"
              >
                Confirmar
              </button>
              <button onClick={() => setShowDeleteModal(false)} className="btn-cancel-delete">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProyectosPage
