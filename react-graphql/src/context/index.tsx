import React, { createContext, FC, useState } from "react"

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
      }}
    >
      {props.children}
    </Context.Provider>
  )
}
