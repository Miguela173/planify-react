"use client"

import { useState } from "react"
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
  const navigate = useNavigate()

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
          {/* Plan Estándar */}
          <div className="pricing-card standard">
            <h3>Estándar</h3>
            <p className="price">
              <span className="price-amount">10.000$ COP</span>
              <span className="price-period">/Mes</span>
            </p>
            <p className="plan-description">
              Mantente al tanto de tus proyectos, sin sorpresas. Con el Plan Estándar, recibirás notificaciones para
              nunca perder el ritmo.
            </p>
            <ul className="features-list">
              <li>
                <span className="checkmarkc">✓</span>
                Notificaciones sobre tareas.
              </li>
              <li>
                <span className="checkmarkc">✓</span>
                Estadísticas detalladas.
              </li>
              <li>
                <span className="checkmarkc">✓</span>
                Podrás agregar y gestionar hasta 5 proyectos.
              </li>
            </ul>
            <button onClick={() => handlePlanSelection("standard")} className="plan-button standard-button">
              ¡Adquiérelo ahora!
            </button>
          </div>

          {/* Plan Premium */}
          <div className="pricing-card premium">
            <h3>Premium</h3>
            <p className="price">
              <span className="price-amount">15.000$ COP</span>
              <span className="price-period">/Mes</span>
            </p>
            <p className="plan-description">
              <strong>
                Lleva tu productividad al siguiente nivel. Con el Plan Premium, obtén notificaciones exclusivas y acceso
                prioritario para un control total de tus proyectos.
              </strong>
            </p>
            <ul className="features-list premium-features">
              <li>
                <span className="checkmarkp premium-check">✓</span>
                Soporte técnico prioritario.
              </li>
              <li>
                <span className="checkmarkp premium-check">✓</span>
                Sincronización en tiempo real.
              </li>
              <li>
                <span className="checkmarkp premium-check">✓</span>
                Mayor almacenamiento.
              </li>
              <li>
                <span className="checkmarkp premium-check">✓</span>
                Notificación sobre tareas y proyectos próximos a llegar a su fecha límite.
              </li>
              <li>
                <span className="checkmarkp premium-check">✓</span>
                Puedes agregar y gestionar proyectos ilimitados.
              </li>
            </ul>
            <button onClick={() => handlePlanSelection("premium")} className="plan-button premium-button">
              ¡Adquiérelo ahora!
            </button>
          </div>
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
