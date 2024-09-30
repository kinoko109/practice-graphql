import React from "react"

type Props = {
  data: {
    allEmployees: {
      edges: {
        node: {
          id: string
          name: string
          joinYear: number
          department: {
            id: string
            deptName: string
          }
        }
      }[]
    }
  }
}

export const EmployeeList: React.FC<Props> = (props) => {
  return (
    <>
      <h3>Employee List</h3>
      {props.data && (
        <ul>
          {props.data.allEmployees.edges.map((edge) => {
            return (
              <li key={edge.node.id}>
                <span>
                  {edge.node.name}
                  {" / "}
                  {edge.node.joinYear}
                  {" / "}
                  {edge.node.department.deptName}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
