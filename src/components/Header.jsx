import { useState } from 'react'

import { FaFilter, FaSearch } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

function Header(
    { isOpenModal,
        setIsOpenModal,
        save, handleSearch,
        cancelSearch,
        columns,
        setSearchInput }
) {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleSearchClick = () => {
        handleSearch(searchValue, selectedCategory)
        setSearchInput(searchValue)
    }

    const handleCancelSearchClick = () => {
        setIsSearchOpen(false)
        setSearchValue('')
        setSelectedCategory('')
        cancelSearch()
        setSearchInput(null)
    }

    return (
        <div className="container header-container">
            <h1>Advanced Table Assignment</h1>
            <div className="header-tool-container">
                <button className="btn btn-save" onClick={save}>
                    Save
                </button>
                <div className="header-tool" onClick={() => setIsOpenModal(!isOpenModal)}>
                    <p className="icon-text">Filter</p>
                    <FaFilter className="header-icon" />
                </div>

                <div className={`header-tool search-button ${isSearchOpen ? 'active' : ''}`}
                    style={{ width: isSearchOpen ? '350px' : '100px', transition: 'width 0.2s ease' }}
                    onClick={!isSearchOpen ? toggleSearch : undefined}>
                    {!isSearchOpen ? <>
                        <p className="icon-text">Search</p>
                        <FaSearch className="header-icon" />
                    </> :
                        <div className="search-container">
                            <AiOutlineClose className="header-icon"
                                title='Close'
                                onClick={handleCancelSearchClick} />
                            <div className="search-input-container">
                                <input type="text" placeholder="Search by category" value={searchValue} onChange={handleInputChange} />
                                <select value={selectedCategory} onChange={handleCategoryChange}>
                                    <option value="">Search by</option>
                                    {columns.map((column) => (
                                        <option key={column.id} value={column.id}>
                                            {column.title}
                                        </option>
                                    ))}
                                </select>
                                <FaSearch className="header-icon"
                                    title='Search'
                                    onClick={handleSearchClick} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Header
