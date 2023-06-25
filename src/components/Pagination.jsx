import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

function Pagination(
    { numberOfPages,
        getCurrentPageNum,
        setCurrentPageNum,
        movePage,
        itemsPerPage,
        setItemsPerPage,
        setServiceItemsPerPage }
) {
    const handleItemsPerPageChange = (event) => {
        let value = parseInt(event.target.value)
        setServiceItemsPerPage(value)
        setItemsPerPage(value)
        setCurrentPageNum(getCurrentPageNum())
    }

    function renderPage(delta) {
        movePage(delta)
        let currPageNum = getCurrentPageNum()
        setCurrentPageNum(currPageNum)
    }

    return (
        <div className="container pagination-container">
            <div className="pagination-action">
                <MdArrowBackIosNew
                    onClick={() => renderPage(-1)}
                    title='Previous page' />
                <div className="pagination-counter">{`${getCurrentPageNum()} / ${numberOfPages}`}</div>
                <MdArrowForwardIos
                    onClick={() => renderPage(1)}
                    title='Next page' />
            </div>

            <div className="pagination-dropdown">
                <p>items per page:</p>
                <select title='Select page length' value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>
    )
}

export default Pagination
