import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Navbar.css"

const Navbar = ({ isPremium = false }) => {
  const location = useLocation()
  const [nombreUsuario, setNombreUsuario] = useState("")

  useEffect(() => {
    const nombre = localStorage.getItem("nombreUsuario") || ""
    setNombreUsuario(nombre)
  }, [])

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to={isPremium ? "/premium" : "/"}>
              <img className="logo-small" src="public\\img\\PLANify with rocco copy.png" alt="PLANIFY Logo" />
            </Link>
          </div>
          {nombreUsuario && (
            <span
              className="nav-link usuario-nombre"
              style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "1.1em" }}
            >
              {nombreUsuario}
            </span>
          )}
          <div className="navbar-menu">
            <div className="navbar-links">
              <Link
                to={isPremium ? "/premium" : "/"}
                className={`nav-link ${isActive(isPremium ? "/premium" : "/") ? "active" : ""}`}
              >
                Inicio
              </Link>
              <Link
                to={isPremium ? "/proyectos-premium" : "/proyectos"}
                className={`nav-link ${isActive(isPremium ? "/proyectos-premium" : "/proyectos") ? "active" : ""}`}
              >
                Proyectos
              </Link>
              <Link to="/calendario" className={`nav-link ${isActive("/calendario") ? "active" : ""}`}>
                Calendario
              </Link>
              <Link to="/planes" className={`nav-link ${isActive("/planes") ? "active" : ""}`}>
                Planes
              </Link>
              <Link to="/login" className="nav-link logout">
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
