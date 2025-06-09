"use client"

import { useState, useEffect } from "react"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./CalendarioPage.css"

const CalendarioPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [proyectos, setProyectos] = useState([])
  const [showDayModal, setShowDayModal] = useState(false)
  const [proyectosDelModal, setProyectosDelModal] = useState([])
  const [modalDate, setModalDate] = useState("")

  // Cargar proyectos desde localStorage
  useEffect(() => {
    const proyectosGuardados = JSON.parse(localStorage.getItem("proyectos") || "[]")
    setProyectos(proyectosGuardados)
  }, [])

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Mostrar proyectos en el calendario según fechaInicio y fechaLimite
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      // Buscar proyectos que tengan fechaInicio o fechaLimite igual a este día
      const proyectosDelDia = proyectos.filter(
        (p) => p.fechaInicio === dateString || p.fechaLimite === dateString
      )

      const isClickable = proyectosDelDia.length > 0

      days.push(
        <div
          key={day}
          className={`calendar-day${isClickable ? " clickable" : ""}`}
          style={isClickable ? { cursor: "pointer" } : {}}
          onClick={
            isClickable
              ? () => {
                  setProyectosDelModal(proyectosDelDia)
                  setModalDate(dateString)
                  setShowDayModal(true)
                }
              : undefined
          }
        >
          <div className="day-number">{day}</div>
          {/* Mostrar proyectos del día */}
          {isClickable && (
            <div className="calendar-projects">
              {proyectosDelDia.map((p, idx) => {
                const esInicio = p.fechaInicio === dateString
                return (
                  <div
                    key={idx}
                    className={`calendar-project-badge${!esInicio ? ` priority-${p.importancia?.toLowerCase() || "media"}` : ""}`}
                    title={`Proyecto: ${p.nombre}\n${esInicio ? "Inicio" : "Vencimiento"}`}
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.85em",
                      margin: "2px 0",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      background: esInicio ? "#e0f7fa" : undefined,
                      color: esInicio ? "#222" : undefined,
                    }}
                  >
                    {p.nombre}{" "}
                    <span style={{ fontWeight: "bold", fontSize: "0.8em" }}>
                      ({esInicio ? "Inicio" : "Vence"})
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>,
      )
    }

    return days
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (
    <div className="page-container calendar-page">
      <Navbar />

      {/* Header */}
      <header className="page-header">
        <div className="header-container">
          <h1>Calendario del Mes</h1>
        </div>
      </header>

      {/* Main Calendar */}
      <main className="calendar-main">
        <div className="main-container">
          <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
              <button onClick={previousMonth} className="btn-nav" title="Mes anterior">
                <FiChevronLeft size={22} />
              </button>
              <h2 className="month-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="btn-nav" title="Mes siguiente">
                <FiChevronRight size={22} />
              </button>
            </div>

            {/* Days of week header */}
            <div className="weekdays-header">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
                <div key={day} className="weekday">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">{renderCalendar()}</div>
          </div>
        </div>
      </main>

      {/* Modal de detalle de proyectos del día */}
      {showDayModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: 500 }}>
            <h2>Proyectos del día {modalDate}</h2>
            {proyectosDelModal.length === 0 ? (
              <p>No hay proyectos para este día.</p>
            ) : (
              <ul>
                {proyectosDelModal.map((p, idx) => (
                  <li key={idx} style={{ marginBottom: 12 }}>
                    <strong>{p.nombre}</strong> <br />
                    <span>Importancia: {p.importancia}</span><br />
                    <span>Fecha de inicio: {p.fechaInicio}</span><br />
                    <span>Fecha límite: {p.fechaLimite}</span><br />
                    {p.tareas && p.tareas.length > 0 && (
                      <>
                        <span>Tareas:</span>
                        <ul>
                          {p.tareas.map((t, tIdx) => (
                            <li key={tIdx}>
                              <strong>{t.nombre}</strong> - {t.estado} (Asignado a: {t.asignado})
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="modal-buttons" style={{ marginTop: 20 }}>
              <button className="btn-cancel" onClick={() => setShowDayModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CalendarioPage
