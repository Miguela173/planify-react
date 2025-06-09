"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FiTrash, FiEdit2, FiEye } from "react-icons/fi";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./ProyectosPage.css"

const ProyectosPage = () => {
  const [proyectos, setProyectos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showLimitModal, setShowLimitModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null)
  const [taskToDelete, setTaskToDelete] = useState({ projectIdx: null, taskIdx: null });
  const [editTaskData, setEditTaskData] = useState({
    nombre: "",
    asignado: "",
    fechaLimite: "",
    estado: "Pendiente",
  });
  const [editTaskIndex, setEditTaskIndex] = useState({ projectIdx: null, taskIdx: null });
  const [editProjectData, setEditProjectData] = useState({
    nombre: "",
    importancia: "",
    fechaInicio: "",
    fechaLimite: "",
  });
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    fechaInicio: "",
    fechaLimite: "",
    importancia: "",
  })
  const [tareaData, setTareaData] = useState({
    nombre: "",
    asignado: "",
    fechaLimite: "",
    estado: "Pendiente",
  })
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailProject, setDetailProject] = useState(null);
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
    e.preventDefault();

    const nuevoProyecto = {
      nombre: formData.nombre,
      importancia: formData.importancia,
      fechaInicio: formData.fechaInicio,
      fechaLimite: formData.fechaLimite,
      tareas: [],
    };

    const nuevosProyectos = [...proyectos, nuevoProyecto];
    setProyectos(nuevosProyectos);
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));

    // Guardar la fecha y la importancia en localStorage para el calendario
    const fechasCalendario = JSON.parse(localStorage.getItem("fechasCalendario") || "[]");
    fechasCalendario.push({
      fecha: formData.fechaLimite,
      importancia: formData.importancia,
    });
    localStorage.setItem("fechasCalendario", JSON.stringify(fechasCalendario));

    // Limpiar el formulario
    setFormData({
      nombre: "",
      fechaInicio: "",
      fechaLimite: "",
      importancia: "",
    });
  }

  const handleDeleteProject = (index) => {
    const nuevosProyectos = [...proyectos];
    const proyectoEliminado = nuevosProyectos.splice(index, 1); // Eliminar el proyecto del estado

    setProyectos(nuevosProyectos);
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));

    // Eliminar la fecha del calendario asociada al proyecto eliminado
    const fechasCalendario = JSON.parse(localStorage.getItem("fechasCalendario") || "[]");
    const nuevasFechasCalendario = fechasCalendario.filter(
      (fecha) => fecha.nombre !== proyectoEliminado[0].nombre
    );
    localStorage.setItem("fechasCalendario", JSON.stringify(nuevasFechasCalendario));

    // Cierra el modal y limpia el índice seleccionado
    setShowDeleteModal(false);
    setSelectedProjectIndex(null);
  };

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

  const closeModal = () => {
    setShowLimitModal(false)
  }

  const handleNavigateToPlans = () => {
    navigate("/planes")
  }

  const handleDeleteTask = (projectIdx, taskIdx) => {
    const nuevosProyectos = [...proyectos];
    nuevosProyectos[projectIdx].tareas.splice(taskIdx, 1);
    setProyectos(nuevosProyectos);
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));
  };

  const handleCompleteTask = (projectIdx, taskIdx) => {
    const nuevosProyectos = [...proyectos];
    nuevosProyectos[projectIdx].tareas[taskIdx].estado = "Completada";
    setProyectos(nuevosProyectos);
    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));
  };

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
                  <option value="">Selecciona</option>
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
                <label htmlFor="fechaLimite">Fecha de Vencimiento</label>
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
                        <button
                          className="btn-view"
                          title="Ver proyecto"
                          style={{ background: "none", border: "none", cursor: "pointer", verticalAlign: "middle" }}
                          onClick={() => {
                            setDetailProject(proyecto);
                            setShowDetailModal(true);
                          }}
                        >
                          👁️
                        </button>
                        <button
                          className="btn-edit-task"
                          title="Editar proyecto"
                          style={{ background: "none", border: "none", cursor: "pointer", verticalAlign: "middle", marginLeft: 4 }}
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
                          ✏️
                        </button>
                        <button
                          className="btn-delete"
                          title="Eliminar proyecto"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            verticalAlign: "middle",
                            marginLeft: 4,
                            color: "#111"
                          }}
                          onClick={() => {
                            setSelectedProjectIndex(index);
                            setShowDeleteModal(true);
                          }}
                        >
                          🗑️
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
                                      setTaskToDelete({ projectIdx: index, taskIdx: idx });
                                      setShowDeleteTaskModal(true);
                                    }}
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    className="btn-edit-task"
                                    title="Editar tarea"
                                    style={{ background: "none", border: "none", cursor: "pointer", verticalAlign: "middle", marginRight: 8 }}
                                    onClick={() => {
                                      setEditTaskData(tarea);
                                      setEditTaskIndex({ projectIdx: index, taskIdx: idx });
                                      setShowEditTaskModal(true);
                                    }}
                                  >
                                    ✏️
                                  </button>
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
                )}
              </tbody>
            </table>
          </div>
        </section>

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
              <h2>Límite Alcanzado</h2>
              <p>No puedes crear más de 3 proyectos en la versión base.</p>
              <p>Actualiza tu plan para desbloquear más funcionalidades.</p>
              <button onClick={handleNavigateToPlans} className="btn-upgrade">
                Actualizar Plan
              </button>
              <button onClick={closeModal} className="btn-close">
                Cerrar
              </button>
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
                  onClick={() => selectedProjectIndex !== null && handleDeleteProject(selectedProjectIndex)}
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

        {/* Modal de confirmación de eliminación de tarea */}
        {showDeleteTaskModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>¿Estás seguro de que deseas eliminar esta tarea?</h3>
              <div className="modal-buttons">
                <button
                  className="btn-confirm-delete"
                  onClick={() => {
                    handleDeleteTask(taskToDelete.projectIdx, taskToDelete.taskIdx);
                    setShowDeleteTaskModal(false);
                    setTaskToDelete({ projectIdx: null, taskIdx: null });
                  }}
                >
                  Confirmar
                </button>
                <button
                  className="btn-cancel-delete"
                  onClick={() => setShowDeleteTaskModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edición de tarea */}
        {showEditTaskModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Tarea</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (editTaskIndex.projectIdx !== null && editTaskIndex.taskIdx !== null) {
                    const nuevosProyectos = [...proyectos];
                    nuevosProyectos[editTaskIndex.projectIdx].tareas[editTaskIndex.taskIdx] = { ...editTaskData };
                    setProyectos(nuevosProyectos);
                    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));
                    setShowEditTaskModal(false);
                    setEditTaskIndex({ projectIdx: null, taskIdx: null });
                  }
                }}
              >
                <div className="modal-form-group">
                  <label>Nombre de la tarea</label>
                  <input
                    type="text"
                    name="nombre"
                    value={editTaskData.nombre}
                    onChange={e => setEditTaskData({ ...editTaskData, nombre: e.target.value })}
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Asignado a</label>
                  <input
                    type="text"
                    name="asignado"
                    value={editTaskData.asignado}
                    onChange={e => setEditTaskData({ ...editTaskData, asignado: e.target.value })}
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Fecha límite</label>
                  <input
                    type="date"
                    name="fechaLimite"
                    value={editTaskData.fechaLimite}
                    onChange={e => setEditTaskData({ ...editTaskData, fechaLimite: e.target.value })}
                    className="modal-input"
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Estado</label>
                  <select
                    name="estado"
                    value={editTaskData.estado}
                    onChange={e => setEditTaskData({ ...editTaskData, estado: e.target.value })}
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
                    onClick={() => setShowEditTaskModal(false)}
                    className="btn-cancel"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de edición de proyecto */}
        {showEditProjectModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Proyecto</h2>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (editProjectIndex !== null) {
                    const nuevosProyectos = [...proyectos];
                    nuevosProyectos[editProjectIndex] = {
                      ...nuevosProyectos[editProjectIndex],
                      ...editProjectData,
                    };
                    setProyectos(nuevosProyectos);
                    localStorage.setItem("proyectos", JSON.stringify(nuevosProyectos));
                    setShowEditProjectModal(false);
                    setEditProjectIndex(null);
                  }
                }}
              >
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
                    <option value="">Selecciona</option>
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
                  <label>Fecha de Vencimiento</label>
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
      </main>

      <Footer />
    </div>
  )
}

export default ProyectosPage
