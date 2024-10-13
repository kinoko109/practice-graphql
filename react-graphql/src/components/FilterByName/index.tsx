import React, { useCallback, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_EMPLOYEE } from "../../queries"

export const FilterByName: React.FC = () => {
  const [searchByName, setSearchByName] = useState("")

  const [searchEmployee, { data: dataSearch, error: errorSearch }] =
    useLazyQuery(SEARCH_EMPLOYEE, {
      fetchPolicy: "network-only",
    })

  const handleClickSearchByName = async () => {
    try {
      await searchEmployee({
        variables: {
          name: searchByName,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
    setSearchByName("")
  }

  return (
    <>
      <h3>Filter by Employee Name</h3>
      <input
        type="text"
        placeholder="Search by Name..."
        value={searchByName}
        onChange={(e) => setSearchByName(e.target.value)}
      />
      <div>
        <button type="button" onClick={handleClickSearchByName}>
          Search
        </button>
      </div>
      {errorSearch && <h3>{errorSearch.message}</h3>}
      {dataSearch && (
        <ul>
          {/* @ts-ignore */}
          {dataSearch.allEmployees.edges.map((edge) => (
            <li key={edge.node.id}>
              {edge.node.name}
              {" / "}
              {edge.node.joinYear}
              {" / "}
              {edge.node.department.deptName}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
