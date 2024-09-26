import React, { useEffect } from "react"
import { useQuery } from "@apollo/client"
import { GET_DEPTS, GET_EMPLOYEES } from "../../queries"
import { jwtDecode } from "jwt-decode"
import { Button, Grid, Grid2 } from "@mui/material"
import { EmployeeList } from "../EmployeeList"

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
      <Button type="button" size="small" onClick={handleClickLogout}>
        ログアウト
      </Button>
      <Grid2 container>
        <Grid2>
          <EmployeeList data={dataEmployees} />
        </Grid2>
        {/*<Grid2 item xs={4}></Grid2>*/}
        {/*<Grid2 item xs={3}></Grid2>*/}
      </Grid2>
    </div>
  )
}

export default Main
