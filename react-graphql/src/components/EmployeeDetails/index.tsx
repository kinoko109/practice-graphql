import React, { useContext } from "react"
import { Context } from "../../context"

export const EmployeeDetails: React.FC = () => {
  const { dataSingleEmployee, errorSingleEmployee } = useContext(Context)

  return (
    <>
      <h3>Employee Detail</h3>
      {errorSingleEmployee && errorSingleEmployee.message}
      {dataSingleEmployee && dataSingleEmployee.employee && (
        <>
          <h3>ID: </h3>
          {dataSingleEmployee.employee.id}
          <h3>Employee Name: </h3>
          {dataSingleEmployee.employee.name}
          <h3>Year of Join: </h3>
          {dataSingleEmployee.employee.joinYear}
          <h3>Department Name: </h3>
          {dataSingleEmployee.employee.department.deptName}
        </>
      )}
    </>
  )
}
