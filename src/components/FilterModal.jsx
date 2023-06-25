import { AiOutlineClose } from 'react-icons/ai'

function FilterModal(
    { columns,
        toggleTableColumnVisibility,
        tableColumnVisibility,
        handleClearFilter,
        setIsOpenModal }
) {
    if (!columns) {
        return null
    }

    return <>
        <div className="container filter-modal-container">
            <AiOutlineClose
                className='close-btn'
                onClick={() => setIsOpenModal(false)}
            />
            <div className="filter-modal-header">
                <h1>Filter</h1>
                <button className="btn"
                    onClick={handleClearFilter}
                >Clear Filter</button>
            </div>
            <hr />
            <div className="filter-modal-body">
                {columns.map((col) => (
                    <form key={col.id} className="filter-modal-property">
                        <input
                            type="checkbox"
                            checked={tableColumnVisibility[col.ordinalNo]}
                            onChange={() => toggleTableColumnVisibility(col.ordinalNo)}
                        />
                        <label>{col.id}</label>
                    </form>
                ))}
            </div>
        </div>
        <div className="darken-background"
            onClick={() => setIsOpenModal(false)}></div>
    </>
}

export default FilterModal