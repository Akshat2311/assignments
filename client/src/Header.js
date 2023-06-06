import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <header className="d-flex p-2 border-bottom" style={{ alignItems:"center" }}>
        <h3>
            <Link to="/" style={{ textDecoration:"none", color:"black" }}>Assignment</Link>
        </h3>
        <div className="ml-auto">
            {localStorage.getItem("user")===null && <Link to="/login" className="mr-2 btn btn-primary">Login</Link>}
            {localStorage.getItem("user")===null && <Link to="/register" className="mr-2 btn btn-primary">Register</Link>}
            {localStorage.getItem("user")!==null && <Link to="/orders" className="mr-2 btn btn-primary">Orders</Link>}
            {localStorage.getItem("user")!==null && <Link to="/add-order" className="mr-2 btn btn-primary">Add Order</Link>}
            {localStorage.getItem("user")!==null && <div onClick={logout} className="btn btn-primary">Logout</div>}
        </div>
    </header>
  )
}
