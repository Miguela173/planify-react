"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./WelcomePage.css"

const WelcomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Verificar si el usuario tiene plan premium
    const userPlan = localStorage.getItem("userPlan")
    if (userPlan !== "premium") {
      navigate("/")
    }
  }, [navigate])

  const handleNavigateToPremiumProjects = () => {
    navigate("/proyectos-premium")
  }

  return (
    <div className="welcome-container">
      {/* Logo Planify */}
      <div className="welcome-logo">
        <img src="/placeholder.svg?height=120&width=300" alt="PLANIFY PREMIUM" className="premium-logo" />
      </div>

      {/* Contenedor de texto centrado */}
      <div className="welcome-text">
        <p className="welcome-message">
          ¡Bienvenido a la familia Planify Premium! 🌟<br />
          Gracias por confiar en nosotros <br /> para organizar tus sueños <br /> y transformar tu tiempo en logros.
          💛💚
        </p>
      </div>

      {/* Imagen decorativa */}
      <div className="welcome-image">
        <img src="/placeholder.svg?height=150&width=150" alt="ROCO" className="decorative-image" />
      </div>

      {/* Tarjeta Premium */}
      <div className="premium-card">
        <div className="card-logo">
          <img src="/placeholder.svg?height=80&width=200" alt="Planify Premium" className="card-logo-img" />
        </div>
        <p className="card-title">¡Ahora tendrás acceso exclusivo a estos beneficios!</p>
        <ul className="benefits-list">
          <li>
            <span className="checkmark">✓</span>
            Soporte técnico prioritario.
          </li>
          <li>
            <span className="checkmark">✓</span>
            Sincronización en tiempo real.
          </li>
          <li>
            <span className="checkmark">✓</span>
            Mayor almacenamiento.
          </li>
          <li>
            <span className="checkmark">✓</span>
            Notificaciones sobre tareas y proyectos cercanos a su fecha límite.
          </li>
          <li>
            <span className="checkmark">✓</span>
            Gestión de proyectos ilimitados.
          </li>
        </ul>
        <button onClick={handleNavigateToPremiumProjects} className="enjoy-button">
          ¡Disfrútalos!
        </button>
      </div>
    </div>
  )
}

export default WelcomePage
