import React, { useState } from "react"

import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

function TableCell(
  { column,
    cellData,
    setCellData }
) {
  const [value, setInputValue] = useState(cellData)

  const handleValueChange = (event) => {
    const inputValue = event.target.value
    // Check if the column type is number and the input is not a valid number
    if (column.type === "number" && isNaN(Number(inputValue))) {
      return
    }
    // update the dom
    setInputValue(inputValue)
    // update the data
    setCellData(inputValue)
  }

  const toggleBoolean = () => {
    let newData = !value
    // update the dom
    setInputValue(newData)
    // update the data
    setCellData(newData)
  }

  return (
    <td>
      {column.type === "boolean" ? (
        <div
          className="bool-toggle-cell"
          title={`Mark as ${!cellData}`}
          onClick={toggleBoolean}
        >
          {value ? (
            <AiOutlineCheck className="bool-icon" />
          ) : (
            <AiOutlineClose className="bool-icon" />
          )}
        </div>
      ) : (
        <input
          title="Edit input"
          type={column.type === "number" ? "number" : "text"}
          className="text-input"
          value={value}
          onChange={handleValueChange}
        />
      )}
    </td>
  )
}

export default TableCell
