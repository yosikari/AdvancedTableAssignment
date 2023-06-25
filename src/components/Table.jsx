import TableCell from './TableCell'

function Table(
  { columns,
    tableColumnVisibility,
    rows }
) {
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
                  <th key={column.id}>{column.title}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
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
