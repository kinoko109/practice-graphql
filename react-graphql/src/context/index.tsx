import React, { createContext, FC, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { GET_SINGLE_EMPLOYEE } from "../queries"

export const Context = createContext({
  name: "",
  setName: (name: string) => {},
  joinYear: 2020,
  setJoinYear: (year: number) => {},
  deptName: "",
  setDeptName: (deptName: string) => {},
  selectedDept: "",
  setSelectedDept: (selectedDept: string) => {},
  editId: "",
  setEditId: (editId: string) => {},
  dataSingleEmployee: {
    employee: {
      id: "",
      name: "",
      joinYear: 2020,
      department: {
        id: "",
        deptName: "",
      },
    },
  },
  errorSingleEmployee: {
    name: "",
    message: "",
  },
  getSingleEmployee: () => {},
})

type Props = {
  children: React.ReactNode
}

export const ContextProvider: FC<Props> = (props) => {
  const [name, setName] = useState("")
  const [joinYear, setJoinYear] = useState(2020)
  const [deptName, setDeptName] = useState("")
  const [selectedDept, setSelectedDept] = useState("")
  const [editId, setEditId] = useState("")

  const [
    getSingleEmployee,
    { data: dataSingleEmployee, error: errorSingleEmployee },
  ] = useLazyQuery(GET_SINGLE_EMPLOYEE, {
    fetchPolicy: "network-only",
  })

  return (
    <Context.Provider
      value={{
        name,
        setName,
        joinYear,
        setJoinYear,
        deptName,
        setDeptName,
        selectedDept,
        setSelectedDept,
        editId,
        setEditId,
        dataSingleEmployee,
        // @ts-ignore
        errorSingleEmployee,
        getSingleEmployee,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
