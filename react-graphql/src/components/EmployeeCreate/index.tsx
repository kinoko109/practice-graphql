import React, { useContext } from "react"
import { Context } from "../../context"
import { useMutation } from "@apollo/client"
import { CREATE_EMPLOYEE, GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../../queries"

type Props = {
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

export const EmployeeCreate: React.FC<Props> = (props) => {
  const {
    name,
    setName,
    joinYear,
    setJoinYear,
    selectedDept,
    setSelectedDept,
    editId,
    setEditId,
  } = useContext(Context)

  const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
    // 新しく従業員を作成した後に行うクエリ。最新の情報を取得。
    refetchQueries: [{ query: GET_EMPLOYEES }],
  })

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    // 新しく従業員を作成した後に行うクエリ。最新の情報を取得。
    refetchQueries: [{ query: GET_EMPLOYEES }],
  })

  console.log(props.data.allDepartments.edges)

  const options = props.data.allDepartments.edges.map((edge) => (
    <option key={edge.node.id} value={edge.node.id}>
      {edge.node.deptName}
    </option>
  ))

  const handleClickButton = async (editId: string) => {
    console.log("editId", editId)
    try {
      !editId
        ? await createEmployee({
            variables: {
              name,
              joinYear,
              department: selectedDept,
            },
          })
        : await updateEmployee({
            variables: {
              id: editId,
              name,
              joinYear,
              department: selectedDept,
            },
          })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setEditId("")
      setName("")
      setSelectedDept("")
      setJoinYear(2020)
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          // className={}
          placeholder="employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="year of join"
          value={joinYear}
          onChange={(e) => setJoinYear(Number(e.target.value))}
        />
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">select</option>
          {options}
        </select>
        <button
          disabled={!selectedDept || !name || !joinYear}
          onClick={() => handleClickButton(editId)}
        >
          {editId ? "更新" : "新規作成"}
        </button>
      </div>
    </>
  )
}
