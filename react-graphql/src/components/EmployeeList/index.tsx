import React, { useContext } from "react"
import { Context } from "../../context"
import { useMutation } from "@apollo/client"
import { DELETE_EMPLOYEE, GET_EMPLOYEES } from "../../queries"

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
  const { setName, setJoinYear, setSelectedDept, setEditId } =
    useContext(Context)

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [
      {
        query: GET_EMPLOYEES,
      },
    ],
  })

  const handleClickDeleteButton = async (id: string) => {
    try {
      await deleteEmployee({
        variables: {
          id,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }

  const handleClickEditButton = async (
    edge: Props["data"]["allEmployees"]["edges"][0],
  ) => {
    setEditId(edge.node.id)
    setName(edge.node.name)
    setSelectedDept(edge.node.department.id)
    setJoinYear(edge.node.joinYear)
  }

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
                <div>
                  <button
                    type="button"
                    onClick={() => handleClickDeleteButton(edge.node.id)}
                  >
                    削除
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClickEditButton(edge)}
                  >
                    編集
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
