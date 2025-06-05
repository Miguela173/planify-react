"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "./PlanesPage.css"

const PlanesPage = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [planes, setPlanes] = useState([]) // Nuevo estado para los planes
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPlanes = async () => {
      const token = localStorage.getItem("accessToken")
      try {
        const response = await fetch("http://localhost:8081/plans", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        })
        if (response.ok) {
          const data = await response.json()
          setPlanes(data || []) // Ajusta según la estructura de tu API
        } else {
          console.error("❌ Error al acceder al recurso:", response.status)
        }
      } catch (error) {
        console.error("❌ Error en la petición:", error)
      }
    }
    fetchPlanes()
  }, [])

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan)
    setShowModal(true)
  }

  const handlePayment = (e) => {
    e.preventDefault()
    // Simulación de pago
    if (selectedPlan === "premium") {
      localStorage.setItem("userPlan", "premium")
      navigate("/welcome")
    } else {
      localStorage.setItem("userPlan", "standard")
      navigate("/")
    }
    setShowModal(false)
  }

  return (
    <div className="page-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>

        <div className="hero-content">
          <h2 className="hero-subtitle">¡Nuestros planes!</h2>
          <p className="hero-title">¡Planificación y organización sin límites!</p>
        </div>
        <p className="hero-description">
          Organiza tu tiempo y planifica tus tareas sin ningún tipo de límites. ¡El control total de tus proyectos está
          a un clic de distancia!
        </p>

        {/* Pricing Cards */}
        <div className="pricing-container">
          {planes.length === 0 ? (
            <p>Cargando planes...</p>
          ) : (
            planes.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.name.toLowerCase()}`}
              >
                <h3>{plan.nombre}</h3>
                <p className="price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">/Mes</span>
                </p>
                <p className="plan-description">{plan.description}</p>
                <ul className="features-list">
                  {plan.caracteristicas?.map((caracteristica, idx) => (
                    <li key={idx}>
                      <span className={plan.name === "Premium" ? "checkmarkp premium-check" : "checkmarkc"}>
                        ✓
                      </span>
                      {caracteristica}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelection(plan.nombre.toLowerCase())}
                  className={`plan-button ${plan.name.toLowerCase()}-button`}
                >
                  ¡Adquiérelo ahora!
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Completa tu pago</h2>
            <form onSubmit={handlePayment}>
              <label>Número de tarjeta</label>
              <input
                type="text"
                maxLength={16}
                className="modal-input"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                required
              />

              <label>Fecha de expiración</label>
              <input
                type="month"
                className="modal-input"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                required
              />

              <label>Código CVV</label>
              <input
                type="password"
                maxLength={3}
                className="modal-input"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                required
              />

              <div className="modal-buttons">
                <button type="button" onClick={() => setShowModal(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" className="btn-pay">
                  Pagar
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

export default PlanesPage
