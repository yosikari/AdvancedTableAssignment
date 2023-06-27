import React, { useState, useMemo } from 'react'

import { FaSort } from 'react-icons/fa'

import TableCell from './TableCell'

function Table({ columns, tableColumnVisibility, rows }) {
  const [sortParams, setSortParams] = useState({ order: 'asc', colId: null })

  const sortedRows = useMemo(() => {
    const { order, colId } = sortParams

    if (!Array.isArray(rows)) {
      return []
    }

    return [...rows].sort((a, b) => {
      if (a[colId] < b[colId]) {
        return order === 'asc' ? -1 : 1
      } else if (a[colId] > b[colId]) {
        return order === 'asc' ? 1 : -1
      } else {
        return 0
      }
    })
  }, [rows, sortParams])

  const handleSort = (colId) => {
    if (sortParams.colId === colId) {
      setSortParams((prevSortParams) => ({
        ...prevSortParams,
        order: prevSortParams.order === 'asc' ? 'desc' : 'asc',
      }))
    } else {
      setSortParams({ order: 'asc', colId })
    }
  }

  return columns ? (
    <div className="container table-container">
      <div className="scroll-container">
        <table className="table">
          <colgroup>
            {columns.map((column) => (
              tableColumnVisibility[column.ordinalNo] && (
                <col key={column.id} style={{ minWidth: `${column.width ? column.width : 100}px` }} />
              )
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((column) =>
                tableColumnVisibility[column.ordinalNo] && (
                  <th key={column.id}>
                    <span 
                    title= {`Sort by ${column.id}`}
                    onClick={() => handleSort(column.id)}
                    className="column-title"
                    >
                      {column.title}<FaSort />
                      </span>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) =>
                  tableColumnVisibility[column.ordinalNo] && (
                    <TableCell
                      key={column.id}
                      column={column}
                      cellData={row[column.id]}
                      setCellData={(newData) => { row[column.id] = newData }}
                    />
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default Table
