"use client"

import { useState, useEffect } from "react"
import { FiEye } from "react-icons/fi";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./ProyectosPremiumPage.css"

const ProyectosPremiumPage = () => {
  const [proyectos, setProyectos] = useState([])
  const [showModal, setShowModal] = useState(false)
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
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailProject, setDetailProject] = useState(null)
  const [showEditProjectModal, setShowEditProjectModal] = useState(false)
  const [editProjectData, setEditProjectData] = useState({
    nombre: "",
    importancia: "Alta",
    fechaInicio: "",
    fechaLimite: "",
  })
  const [editProjectIndex, setEditProjectIndex] = useState(null)
  const [showEditTareaModal, setShowEditTareaModal] = useState(false)
  const [editTareaData, setEditTareaData] = useState({
    nombre: "",
    asignado: "",
    fechaLimite: "",
    estado: "Pendiente",
  })
  const [editTareaProjectIdx, setEditTareaProjectIdx] = useState(null)
  const [editTareaIdx, setEditTareaIdx] = useState(null)
  // Nuevo estado para eliminar tarea
  const [showDeleteTareaModal, setShowDeleteTareaModal] = useState(false)
  const [deleteTareaInfo, setDeleteTareaInfo] = useState({ projectIdx: null, tareaIdx: null })

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
    e.preventDefault();

    const nuevoProyecto = {
      ...formData,
      tareas: [],
      premium: true, // <--- Marca el proyecto como premium
    };

    const nuevosProyectos = [...proyectos, nuevoProyecto];
    setProyectos(nuevosProyectos);
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));

    setFormData({
      nombre: "",
      fechaInicio: "",
      fechaLimite: "",
      importancia: "Alta",
    })
  }

  // Eliminar proyecto
  const eliminarProyecto = (index) => {
    const nuevosProyectos = proyectos.filter((_, i) => i !== index)
    setProyectos(nuevosProyectos)
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))
    setShowDeleteModal(false)
  }

  // Editar tarea
  const editarTarea = (projectIdx, tareaIdx) => {
    const tarea = proyectos[projectIdx].tareas[tareaIdx]
    setEditTareaData({ ...tarea })
    setEditTareaProjectIdx(projectIdx)
    setEditTareaIdx(tareaIdx)
    setShowEditTareaModal(true)
  }

  // Eliminar tarea
  const eliminarTarea = (projectIdx, tareaIdx) => {
    const nuevosProyectos = [...proyectos]
    nuevosProyectos[projectIdx].tareas.splice(tareaIdx, 1)
    setProyectos(nuevosProyectos)
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))
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

  // Handler para guardar edición de proyecto
  const handleEditProjectSubmit = (e) => {
    e.preventDefault()
    if (editProjectIndex !== null) {
      const nuevosProyectos = [...proyectos]
      nuevosProyectos[editProjectIndex] = {
        ...nuevosProyectos[editProjectIndex],
        ...editProjectData,
      }
      setProyectos(nuevosProyectos)
      localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))
      setShowEditProjectModal(false)
      setEditProjectIndex(null)
    }
  }

  // Handler para guardar edición de tarea
  const handleEditTareaSubmit = (e) => {
    e.preventDefault()
    if (editTareaProjectIdx !== null && editTareaIdx !== null) {
      const nuevosProyectos = [...proyectos]
      nuevosProyectos[editTareaProjectIdx].tareas[editTareaIdx] = { ...editTareaData }
      setProyectos(nuevosProyectos)
      localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos))
      setShowEditTareaModal(false)
      setEditTareaProjectIdx(null)
      setEditTareaIdx(null)
    }
  }

  // Nuevo handler para confirmar eliminación de tarea
  const confirmarEliminarTarea = () => {
    if (deleteTareaInfo.projectIdx !== null && deleteTareaInfo.tareaIdx !== null) {
      eliminarTarea(deleteTareaInfo.projectIdx, deleteTareaInfo.tareaIdx)
      setShowDeleteTareaModal(false)
      setDeleteTareaInfo({ projectIdx: null, tareaIdx: null })
    }
  }

  // Handler para confirmar eliminación de proyecto
  const confirmarEliminarProyecto = () => {
    if (selectedProjectIndex !== null) {
      eliminarProyecto(selectedProjectIndex)
      setShowDeleteModal(false)
      setSelectedProjectIndex(null)
    }
  }

  return (
    <div className="page-container">
      <Navbar isPremium={true} />

      {/* Header */}
      <header className="page-header premium-header">
        <div className="header-container">
          <h1>¡Gestiona tus Proyectos!</h1>
          <p className="premium-message">
            <strong>¡Ahora eres premium, puedes agregar y gestionar tus proyectos sin límites!🤩</strong>
          </p>
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

            <button type="submit" className="submit-buttonpy">
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
                    <td colSpan={8} className="no-projects">
                      No hay proyectos registrados
                    </td>
                  </tr>
                ) : 
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
                      <td>
                        {/* Botón Ver */}
                        <button
                          className="btn-view"
                          title="Ver detalles"
                          style={{
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 10px",
                            marginRight: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                          }}
                          onClick={() => {
                            setDetailProject(proyecto);
                            setShowDetailModal(true);
                          }}
                        >
                          Ver
                        </button>
                        {/* Botón Editar */}
                        <button
                          className="btn-edit"
                          title="Editar"
                          style={{
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 10px",
                            marginRight: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                          }}
                          onClick={() => {
                            setEditProjectData({
                              nombre: proyecto.nombre,
                              importancia: proyecto.importancia,
                              fechaInicio: proyecto.fechaInicio,
                              fechaLimite: proyecto.fechaLimite,
                            });
                            setEditProjectIndex(index);
                            setShowEditProjectModal(true);
                          }}
                        >
                          Editar
                        </button>
                        {/* Botón Eliminar */}
                        <button
                          className="btn-delete"
                          title="Eliminar"
                          style={{
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            fontWeight: "bold"
                          }}
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedProjectIndex(index);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                      <td>
                        {proyecto.tareas && proyecto.tareas.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: 16 }}>
                            {proyecto.tareas.map((tarea, idx) => (
                              <li key={idx} style={{ fontSize: "0.95em", marginBottom: 8 }}>
                                <strong>{tarea.descripcion || tarea.nombre}</strong><br />
                                <span>Asignado a: {tarea.asignado}</span><br />
                                <span>Fecha límite: {tarea.fechaLimite}</span><br />
                                <span>Estado: {tarea.estado}</span>
                                <div style={{ marginTop: 4 }}>
                                  <button
                                    style={{ marginRight: 8 }}
                                    className="btn-delete-task"
                                    onClick={() => {
                                      setShowDeleteTareaModal(true)
                                      setDeleteTareaInfo({ projectIdx: index, tareaIdx: idx })
                                    }}
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    className="btn-edit-task"
                                    title="Editar tarea"
                                    style={{ background: "none", border: "none", cursor: "pointer", verticalAlign: "middle", marginRight: 8 }}
                                    onClick={() => editarTarea(index, idx)}
                                  >
                                    ✏️
                                  </button>
                                  {tarea.estado === "Pendiente" && (
                                    <button
                                      className="btn-complete-task"
                                      title="Completar tarea"
                                      style={{
                                        background: "none",
                                        border: "none",
                                        color: "#10b981",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        padding: "0.2rem 0.6rem",
                                        borderRadius: "0.3rem",
                                        marginRight: "0.3rem",
                                        verticalAlign: "middle",
                                        transition: "color 0.2s, transform 0.2s, background 0.2s"
                                      }}
                                      onClick={() => {
                                        const nuevosProyectos = [...proyectos];
                                        nuevosProyectos[index].tareas[idx].estado = "Completada";
                                        setProyectos(nuevosProyectos);
                                        localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));
                                      }}
                                    >
                                      Completar
                                    </button>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span style={{ color: "#888" }}>Sin tareas</span>
                        )}
                      </td>
                      <td>
                        <button onClick={() => asignarTarea(index)} className="btn-assign">
                          Asignar
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal de detalle del proyecto */}
      {showDetailModal && detailProject && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 500 }}>
            <h2>Detalle del Proyecto</h2>
            <div style={{ marginBottom: 16 }}>
              <strong>Nombre:</strong> {detailProject.nombre}<br />
              <strong>Importancia:</strong> {detailProject.importancia}<br />
              <strong>Fecha de Inicio:</strong> {detailProject.fechaInicio}<br />
              <strong>Fecha Límite:</strong> {detailProject.fechaLimite}<br />
            </div>
            <div>
              <strong>Tareas:</strong>
              {detailProject.tareas && detailProject.tareas.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {detailProject.tareas.map((tarea, idx) => (
                    <li key={idx} style={{ marginBottom: 8 }}>
                      <strong>{tarea.descripcion || tarea.nombre}</strong><br />
                      <span>Asignado a: {tarea.asignado}</span><br />
                      <span>Fecha límite: {tarea.fechaLimite}</span><br />
                      <span>Estado: {tarea.estado}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ color: "#888" }}>Sin tareas</span>
              )}
            </div>
            <div className="modal-buttons" style={{ marginTop: 20 }}>
              <button
                className="btn-cancel"
                onClick={() => setShowDetailModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar proyecto */}
      {showEditProjectModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Proyecto</h2>
            <form onSubmit={handleEditProjectSubmit}>
              <div className="modal-form-group">
                <label>Nombre del Proyecto</label>
                <input
                  type="text"
                  name="nombre"
                  value={editProjectData.nombre}
                  onChange={e => setEditProjectData({ ...editProjectData, nombre: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Importancia</label>
                <select
                  name="importancia"
                  value={editProjectData.importancia}
                  onChange={e => setEditProjectData({ ...editProjectData, importancia: e.target.value })}
                  className="modal-input"
                  required
                >
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div className="modal-form-group">
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={editProjectData.fechaInicio}
                  onChange={e => setEditProjectData({ ...editProjectData, fechaInicio: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Fecha Límite</label>
                <input
                  type="date"
                  name="fechaLimite"
                  value={editProjectData.fechaLimite}
                  onChange={e => setEditProjectData({ ...editProjectData, fechaLimite: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-assign-modal">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditProjectModal(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar este proyecto?</h3>
            <div className="modal-buttons">
              <button
                onClick={confirmarEliminarProyecto}
                className="btn-confirm-delete"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false)
                  setSelectedProjectIndex(null)
                }}
                className="btn-cancel-delete"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar tarea */}
      {showEditTareaModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Tarea</h2>
            <form onSubmit={handleEditTareaSubmit}>
              <div className="modal-form-group">
                <label>Nombre de la tarea</label>
                <input
                  type="text"
                  name="nombre"
                  value={editTareaData.nombre}
                  onChange={e => setEditTareaData({ ...editTareaData, nombre: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Asignado a</label>
                <input
                  type="text"
                  name="asignado"
                  value={editTareaData.asignado}
                  onChange={e => setEditTareaData({ ...editTareaData, asignado: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Fecha límite</label>
                <input
                  type="date"
                  name="fechaLimite"
                  value={editTareaData.fechaLimite}
                  onChange={e => setEditTareaData({ ...editTareaData, fechaLimite: e.target.value })}
                  className="modal-input"
                  required
                />
              </div>
              <div className="modal-form-group">
                <label>Estado</label>
                <select
                  name="estado"
                  value={editTareaData.estado}
                  onChange={e => setEditTareaData({ ...editTareaData, estado: e.target.value })}
                  className="modal-input"
                  required
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-assign-modal">
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditTareaModal(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación de tarea */}
      {showDeleteTareaModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar esta tarea?</h3>
            <div className="modal-buttons">
              <button
                onClick={confirmarEliminarTarea}
                className="btn-confirm-delete"
              >
                Confirmar
              </button>
              <button
                onClick={() => {
                  setShowDeleteTareaModal(false)
                  setDeleteTareaInfo({ projectIdx: null, tareaIdx: null })
                }}
                className="btn-cancel-delete"
              >
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

export default ProyectosPremiumPage
