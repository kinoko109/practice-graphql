import React, { useContext } from "react"
import { Context } from "../../context"
import { useMutation } from "@apollo/client"
import {
  CREATE_DEPT,
  DELETE_DEPT,
  GET_DEPTS,
  GET_EMPLOYEES,
} from "../../queries"

type DeptListProps = {
  data: {
    allDepartments: {
      edges: {
        node: {
          id: string
          deptName: string
        }
      }[]
    }
  }
}

export const DeptList: React.FC<DeptListProps> = (props) => {
  const { deptName, setDeptName } = useContext(Context)

  const [createDept] = useMutation(CREATE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }],
  })

  const [deleteDept] = useMutation(DELETE_DEPT, {
    refetchQueries: [{ query: GET_DEPTS }, { query: GET_EMPLOYEES }],
  })

  const handleClickNewDept = async () => {
    try {
      await createDept({
        variables: {
          deptName,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
    setDeptName("")
  }

  const handleClickDeleteDept = async (id: string) => {
    try {
      await deleteDept({
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

  return (
    <>
      <h3>Department List</h3>
      <input
        type="text"
        placeholder="new department name"
        value={deptName}
        onChange={(e) => setDeptName(e.target.value)}
      />
      <button type="button" disabled={!deptName} onClick={handleClickNewDept}>
        New Dept
      </button>
      <ul>
        {props.data.allDepartments.edges.map((edge) => (
          <li key={edge.node.id}>
            <span>{edge.node.deptName}</span>
            <div>
              <button
                type="button"
                onClick={() => handleClickDeleteDept(edge.node.id)}
              >
                Delete Dept
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
