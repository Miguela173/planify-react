"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./CalendarioPage.css"

const CalendarioPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [fechasEntrega, setFechasEntrega] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("Media")
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const fechasGuardadas = JSON.parse(localStorage.getItem("fechasEntrega") || "[]")
    setFechasEntrega(fechasGuardadas)
  }, [])

  const handleDateSubmit = (e) => {
    e.preventDefault()
    if (selectedDate) {
      const nuevaFecha = {
        fecha: selectedDate,
        importancia: selectedPriority,
      }
      const nuevasFechas = [...fechasEntrega, nuevaFecha]
      setFechasEntrega(nuevasFechas)
      localStorage.setItem("fechasEntrega", JSON.stringify(nuevasFechas))
      setShowModal(false)
      setSelectedDate("")
      setSelectedPriority("Media")
    }
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

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
      const fechaEntrega = fechasEntrega.find((f) => f.fecha === dateString)

      days.push(
        <div key={day} className="calendar-day">
          <div className="day-number">{day}</div>
          {fechaEntrega && (
            <div className={`event-badge event-${fechaEntrega.importancia.toLowerCase()}`}>
              {fechaEntrega.importancia}
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
          <div className="add-date-section">
            <button onClick={() => setShowModal(true)} className="btn-add-date">
              <b>Agregar fecha de entrega</b>
            </button>
          </div>
        </div>
      </header>

      {/* Main Calendar */}
      <main className="calendar-main">
        <div className="main-container">
          <div className="calendar-container">
            {/* Calendar Header */}
            <div className="calendar-header">
              <button onClick={previousMonth} className="btn-nav">
                ← Anterior
              </button>
              <h2 className="month-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="btn-nav">
                Siguiente →
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

      {/* Modal para agregar fecha de entrega */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Selecciona la fecha de entrega</h2>
            <form onSubmit={handleDateSubmit}>
              <label htmlFor="deliveryDate" className="modal-label">
                Fecha de entrega:
              </label>
              <input
                type="date"
                id="deliveryDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="modal-input"
                required
              />

              <div className="priority-section">
                <p className="priority-label">Importancia:</p>
                <div className="priority-buttons">
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("Media")}
                    className={`priority-btn media ${selectedPriority === "Media" ? "active" : ""}`}
                  >
                    Media
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("Alta")}
                    className={`priority-btn alta ${selectedPriority === "Alta" ? "active" : ""}`}
                  >
                    Alta
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPriority("Entregado")}
                    className={`priority-btn entregado ${selectedPriority === "Entregado" ? "active" : ""}`}
                  >
                    Entregado
                  </button>
                </div>
              </div>

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CalendarioPage
