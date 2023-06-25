import React, { useEffect, useState } from 'react'

import { tableService } from '../services/table.service'

import { Toaster, toast } from 'react-hot-toast'

import Header from '../components/Header'
import Table from '../components/Table'
import Footer from '../components/Footer'
import FilterModal from '../components/FilterModal'
import Pagination from '../components/Pagination'

function Index() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [tableColumnsData, setTableColumnsData] = useState(null)
  const [tableRowsData, setTableRowsData] = useState(null)
  const [tableColumnVisibility, setTableColumnVisibility] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [searchInput, setSearchInput] = useState(false)

  useEffect(() => {
    loadData()
  }, [currentPageNum, itemsPerPage, searchInput])

  async function loadData() {
    let { columns, columnsVisibility } = await tableService.getColumnsData()
    setTableColumnsData(columns)
    setTableColumnVisibility(columnsVisibility)
    let rowsData = await tableService.getPageRows(currentPageNum)
    setTableRowsData(rowsData)
    setNumberOfPages(tableService.getNumberOfPages())
  }

  function toggleColumnsVisibility(ordinalNo) {
    //update dom 
    const updatedVisibility = [...tableColumnVisibility]
    updatedVisibility[ordinalNo] = !updatedVisibility[ordinalNo]
    setTableColumnVisibility(updatedVisibility)
    //update service 
    tableService.toggleColumnVisibility(ordinalNo)
  }

  function handleClearFilter() {
    const initialVisibility = tableColumnVisibility.map(() => true)
    setTableColumnVisibility(initialVisibility)
    //update service 
    tableService.clearColumnsFilter()
  }

  function save() {
    tableService.saveAll()
    toast.success('Successfully saved!')
  }

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Header isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        save={save}
        handleSearch={tableService.handleSearch}
        cancelSearch={tableService.cancelSearch}
        columns={tableColumnsData}
        setSearchInput={setSearchInput} />

      {isOpenModal && tableColumnsData && (
        <FilterModal columns={tableColumnsData}
          toggleTableColumnVisibility={toggleColumnsVisibility}
          tableColumnVisibility={tableColumnVisibility}
          handleClearFilter={handleClearFilter}
          setIsOpenModal={setIsOpenModal} />
      )}

      <Table columns={tableColumnsData}
        tableColumnVisibility={tableColumnVisibility}
        rows={tableRowsData} />

      <Pagination numberOfPages={numberOfPages}
        getCurrentPageNum={tableService.getCurrentPageNum}
        setCurrentPageNum={setCurrentPageNum}
        movePage={tableService.movePage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setServiceItemsPerPage={tableService.setServiceItemsPerPage} />

      <Footer />
    </>
  )
}

export default Index
