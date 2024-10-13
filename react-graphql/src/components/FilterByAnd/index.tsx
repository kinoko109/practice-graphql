import React, { useCallback, useState } from "react"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_AND_EMPLOYEE } from "../../queries"

export const FilterByAnd: React.FC = () => {
  const [searchName, setSearchName] = useState("")
  const [searchJoin, setSearchJoin] = useState(2020)
  const [searchDept, setSearchDept] = useState("")

  const [searchAndEmployee, { data: dataSearchAnd, error: errorSearchAnd }] =
    useLazyQuery(SEARCH_AND_EMPLOYEE, {
      fetchPolicy: "network-only",
    })

  const handleClickSearchByAnd = async () => {
    let tempData
    if (searchJoin === 0) {
      tempData = null
    } else {
      tempData = searchJoin
    }

    await searchAndEmployee({
      variables: {
        name: searchName,
        joinYear: tempData,
        dept: searchDept,
      },
    })

    setSearchName("")
    setSearchJoin(0)
    setSearchDept("")
  }

  return (
    <>
      <h3>Filter by AND condition</h3>
      <input
        type="text"
        placeholder="Filter by AND condition"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <input
        type="number"
        min="0"
        value={searchJoin}
        onChange={(e) => setSearchJoin(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="department name..."
        value={searchDept}
        onChange={(e) => setSearchDept(e.target.value)}
      />
      <div>
        <button type="button" onClick={handleClickSearchByAnd}>
          Search by And
        </button>
      </div>
      {errorSearchAnd && <h3>{errorSearchAnd.message}</h3>}
      {dataSearchAnd && (
        <ul>
          {/* @ts-ignore */}
          {dataSearchAnd.allEmployees.edges.map((edge) => (
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
