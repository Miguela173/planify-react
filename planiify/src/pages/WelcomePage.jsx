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
        <img src="public\img\PLANify premiumm.png" alt="PLANIFY PREMIUM" className="premium-logo" />
      </div>

      {/* Contenedor de texto centrado */}
      <div className="welcome-text">
        <p className="welcome-message">
          ¡Bienvenido a la familia Planify Premium! 🌟<br />
          Gracias por confiar en nosotros <br /> para organizar tus sueños <br /> y transformar tu tiempo en logros.
          💛💚
        </p>
      </div>


      {/* Tarjeta Premium */}
      <div className="premium-card">
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
