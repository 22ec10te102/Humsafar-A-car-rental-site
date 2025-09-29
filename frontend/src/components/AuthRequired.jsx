import { Navigate, Outlet, useLocation } from "react-router-dom"

export default function AuthRequired() {
  const user = localStorage.getItem("user") 
  const location = useLocation()

  if (!user) {
     return <Navigate to="/signup" state={{ from: location }} replace />
  }

  return <Outlet />
}
