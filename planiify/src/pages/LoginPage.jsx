"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    email: "",
  })
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Simulación de login
    if (formData.username && formData.password) {
      localStorage.setItem("isLoggedIn", "true")
      navigate("/")
    } else {
      alert("Por favor completa todos los campos")
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // Simulación de registro
    if (formData.nombre && formData.apellido && formData.email && formData.password) {
      localStorage.setItem("isLoggedIn", "true")
      navigate("/")
    } else {
      alert("Por favor completa todos los campos")
    }
  }

  return (
    <div className="login-page">
      {/* Logo arriba a la izquierda */}
      <div className="top-left-logo">
        <img src="/img/PLANify with rocco.png" alt="PLANIFY" className="main-logo" />
      </div>
      {/* Botones arriba a la derecha */}
      <div className="top-right-buttons">
        <button
          onClick={() => setIsLogin(true)}
          className={`tab-button ${isLogin ? "active" : ""}`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`tab-button ${!isLogin ? "active" : ""}`}
        >
          Registrarse
        </button>
      </div>
      <div className="login-container">
        <div className="login-card">
          {/* Navigation */}
          <nav className="login-nav">
           
          </nav>

          {/* Login Form */}
          {isLogin ? (
            <div>
              <div className="form-header">
                <span className="switch-text">
                  ¿No tienes una cuenta?
                  <button onClick={() => setIsLogin(false)} className="switch-link">
                    Regístrate
                  </button>
                </span>
                <h2>Inicio de Sesión</h2>
              </div>
              <form onSubmit={handleLogin} className="login-form">
                <div className="input-group icon-input">
                  <span className="input-icon">
                    {/* Usuario SVG */}
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 8-4 8-4s8 0 8 4"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario o correo"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="input-group icon-input">
                  <span className="input-icon">
                    {/* Candado SVG */}
                    <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="11" width="14" height="8" rx="4"/>
                      <path d="M12 15v2"/>
                      <path d="M8 11V7a4 4 0 1 1 8 0v4"/>
                    </svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="submit-button">
                  Iniciar Sesión
                </button>
                <div className="checkbox-group">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Recuérdame</label>
                </div>
              </form>
            </div>
          ) : (
            /* Register Form */
            <div>
              <div className="form-header">
                <span className="switch-text">
                  ¿Tienes una cuenta?
                  <button onClick={() => setIsLogin(true)} className="switch-link">
                    Iniciar Sesión
                  </button>
                </span>
                <h2>Regístrate</h2>
              </div>
              <form onSubmit={handleRegister} className="login-form">
                <div className="name-inputs">
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
                <button type="submit" className="submit-button">
                  Registrarse
                </button>
                <div className="checkbox-group">
                  <input type="checkbox" id="remember-register" />
                  <label htmlFor="remember-register">Recuérdame</label>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
