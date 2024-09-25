import React, { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_DEPTS, GET_EMPLOYEES } from "../../queries"
import { jwtDecode } from "jwt-decode"

const Main: React.FC = () => {
  const {
    loading: loadingEmployees,
    data: dataEmployees,
    error: errorEmployees,
  } = useQuery(GET_EMPLOYEES)

  const {
    loading: loadingDepts,
    data: dataDepts,
    error: errorDepts,
  } = useQuery(GET_DEPTS)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token")
      }
    } else {
      window.location.href = "/employees"
    }
  }, [errorEmployees, errorDepts])

  const handleClickLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  if (loadingDepts || loadingEmployees) return <h1>Loading from server.</h1>

  if (errorEmployees || errorDepts)
    return (
      <>
        <p>Employees error: {errorEmployees?.message}</p>
        <p>Depts error: {errorDepts?.message}</p>
      </>
    )

  return (
    <div>
      <h1>GraphQL lesson</h1>
      <button type="button" onClick={handleClickLogout}>
        ログアウト
      </button>
    </div>
  )
}

export default Main
