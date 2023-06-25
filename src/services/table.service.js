'use strict'

import { storageService } from './local_storage.service'

const TABLE_COLUMNS_DATA_KEY = 'tableColumnsDB'
const TABLE_ROWS_DATA_KEY = 'tableRowsDB'
const VISIBILITY_ARR_KEY = 'visibilityDB'

let numberOfPages = 1
let itemsPerPage = 10
let currentPageNumber = 1

let columns = []
let rows = []
let filteredRows = []
let useFilteredRows = false
let columnsVisibility = []

export const tableService = {
  getColumnsData,
  toggleColumnVisibility,
  clearColumnsFilter,
  getPageRows,
  getNumberOfPages,
  getCurrentPageNum,
  movePage,
  setServiceItemsPerPage,
  handleSearch,
  cancelSearch,
  saveAll
}

// ---------Data funcs:------------
async function getColumnsData() {
  columns = await storageService.loadFromStorage(TABLE_COLUMNS_DATA_KEY)
  if (columns) {
    columnsVisibility = await storageService.loadFromStorage(VISIBILITY_ARR_KEY)
  } else {
    columns = tableData.columns
    columns.sort((col1, col2) => col1.ordinalNo - col2.ordinalNo)
    columnsVisibility = _initColumnsVisibility(columns.length)
    storageService.saveToStorage(TABLE_COLUMNS_DATA_KEY, columns)
    storageService.saveToStorage(VISIBILITY_ARR_KEY, columnsVisibility)
  }
  return { columns, columnsVisibility }
}

async function getPageRows(page) {
  let pageRows
  if (useFilteredRows) {
    pageRows = filteredRows
  } else {
    rows = await storageService.loadFromStorage(TABLE_ROWS_DATA_KEY)
    if (!rows) {
      rows = tableData.data
      storageService.saveToStorage(TABLE_ROWS_DATA_KEY, rows)
    }
    pageRows = rows
  }
  numberOfPages = Math.ceil(pageRows.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return pageRows.slice(startIndex, endIndex)
}

// ---------Pagination funcs:------------
function getNumberOfPages() {
  return numberOfPages
}

function getCurrentPageNum() {
  return currentPageNumber
}

function setServiceItemsPerPage(itemsNumber) {
  itemsPerPage = itemsNumber
  let numberOfRows = useFilteredRows ? filteredRows.length : rows.length
  let maxNumberOfPages = Math.ceil(numberOfRows / itemsPerPage)
  if (currentPageNumber > maxNumberOfPages) {
    currentPageNumber = maxNumberOfPages
  }
}

function movePage(diff) {
  if (currentPageNumber == numberOfPages && diff > 0) return
  if (currentPageNumber == 1 && diff < 0) return
  currentPageNumber += diff
}

// ---------Search funcs:------------
function handleSearch(searchValue, selectedCategory) {
  filteredRows = rows
  useFilteredRows = true
  if (selectedCategory && searchValue) {
    filteredRows = rows.filter((row) =>
      row[selectedCategory].toString()
        .toLowerCase().includes(searchValue.toLowerCase())
    )
  }
}

function cancelSearch() {
  useFilteredRows = false
  filteredRows = []
}

// ---------Filter funcs:------------
function _initColumnsVisibility(size) {
  //init array of column visibility to true
  for (let i = 0; i < size; i++) {
    columnsVisibility.push(true)
  }
  return columnsVisibility
}

function toggleColumnVisibility(ordinalNo) {
  columnsVisibility[ordinalNo] = !columnsVisibility[ordinalNo]
}

function clearColumnsFilter() {
  columnsVisibility = []
  _initColumnsVisibility(columns.length)

}

// ---------Storage funcs:------------
// Save data to local storage
function saveAll() {
  storageService.saveToStorage(VISIBILITY_ARR_KEY, columnsVisibility)
  storageService.saveToStorage(TABLE_COLUMNS_DATA_KEY, columns)
  storageService.saveToStorage(TABLE_ROWS_DATA_KEY, rows)
}

// ---------Demo data------------
const tableData = {
  columns: [
    { id: 'name', ordinalNo: 0, title: 'Name', type: 'string', width: 300 },
    { id: 'age', ordinalNo: 2, title: 'Age', type: 'number', width: 200 },
    { id: 'active', ordinalNo: 1, title: 'Active', type: 'boolean', width: 100 },
    { id: 'address', ordinalNo: 3, title: 'Address', type: 'string', width: 300 },
    { id: 'city', ordinalNo: 6, title: 'City', type: 'string', width: 150 },
    { id: 'state', ordinalNo: 5, title: 'State', type: 'string', width: 100 },
    { id: 'country', ordinalNo: 4, title: 'Country', type: 'string', width: 100 },
    { id: 'email', ordinalNo: 7, title: 'Email', type: 'string', width: 250 },
    { id: 'phone', ordinalNo: 8, title: 'Phone', type: 'string', width: 120 },
    { id: 'company', ordinalNo: 11, title: 'Company', type: 'string', width: 200 },
    { id: 'position', ordinalNo: 10, title: 'Position', type: 'string', width: 200 },
    { id: 'department', ordinalNo: 9, title: 'Department', type: 'string', width: 150 },
    { id: 'salary', ordinalNo: 12, title: 'Salary', type: 'number', width: 120 },
  ],
  data: [
    {
      id: '1',
      name: 'Elijah Turner',
      age: 39,
      active: true,
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      email: 'elijah@example.com',
      phone: '555-123-4567',
      company: 'ABC Inc.',
      position: 'Manager',
      department: 'Sales',
      salary: 75000,
    },
    {
      id: '2',
      name: 'Olivia Anderson',
      age: 27,
      active: false,
      address: '456 Elm Street',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      email: 'olivia@example.com',
      phone: '555-987-6543',
      company: 'XYZ Corp.',
      position: 'Engineer',
      department: 'Engineering',
      salary: 85000,
    },
    {
      id: '3',
      name: 'William Johnson',
      age: 42,
      active: true,
      address: '789 Oak Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      email: 'william@example.com',
      phone: '555-456-7890',
      company: '123 Industries',
      position: 'Director',
      department: 'Marketing',
      salary: 95000,
    },
    {
      id: '4',
      name: 'Sophia Brown',
      age: 35,
      active: true,
      address: '321 Pine Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      email: 'sophia@example.com',
      phone: '555-345-6789',
      company: 'DEF Corp.',
      position: 'Analyst',
      department: 'Finance',
      salary: 65000,
    },
    {
      id: '5',
      name: 'James Davis',
      age: 31,
      active: false,
      address: '987 Cedar Street',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      email: 'james@example.com',
      phone: '555-876-5432',
      company: '456 Solutions',
      position: 'Developer',
      department: 'IT',
      salary: 80000,
    },
    {
      id: '6',
      name: 'Emma Garcia',
      age: 29,
      active: false,
      address: '654 Birch Street',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      email: 'emma@example.com',
      phone: '555-789-0123',
      company: 'GHI Solutions',
      position: 'Consultant',
      department: 'Business Development',
      salary: 72000,
    },
    {
      id: '7',
      name: 'Liam Davis',
      age: 31,
      active: true,
      address: '987 Oak Avenue',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      email: 'liam@example.com',
      phone: '555-246-1357',
      company: 'MNO Corporation',
      position: 'Engineer',
      department: 'Engineering',
      salary: 84000,
    },
    {
      id: '8',
      name: 'Ava Wilson',
      age: 34,
      active: true,
      address: '321 Pine Street',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      email: 'ava@example.com',
      phone: '555-975-8642',
      company: 'PQR Solutions',
      position: 'Manager',
      department: 'Operations',
      salary: 96000,
    },
    {
      id: '9',
      name: 'Noah Anderson',
      age: 26,
      active: false,
      address: '654 Cedar Lane',
      city: 'Boston',
      state: 'MA',
      country: 'USA',
      email: 'noah@example.com',
      phone: '555-321-9876',
      company: 'XYZ Corp.',
      position: 'Associate',
      department: 'Finance',
      salary: 67000,
    },
    {
      id: '10',
      name: 'Oliver Moore',
      age: 33,
      active: true,
      address: '456 Maple Avenue',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      email: 'oliver@example.com',
      phone: '555-654-3210',
      company: 'JKL Solutions',
      position: 'Analyst',
      department: 'Research',
      salary: 71000,
    },
    {
      id: '11',
      name: 'Amelia Clark',
      age: 30,
      active: false,
      address: '789 Oak Street',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      email: 'amelia@example.com',
      phone: '555-789-0123',
      company: 'MNO Corporation',
      position: 'Manager',
      department: 'Operations',
      salary: 87000,
    },
    {
      "id": "12",
      "name": "Henry Wilson",
      "age": 37,
      "active": true,
      "address": "123 Elm Avenue",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "henry@example.com",
      "phone": "555-246-8024",
      "company": "ABC Inc.",
      "position": "Senior Analyst",
      "department": "Finance",
      "salary": 88000
    },
    {
      "id": "13",
      "name": "Mia Thompson",
      "age": 28,
      "active": true,
      "address": "456 Oak Lane",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "email": "mia@example.com",
      "phone": "555-975-2468",
      "company": "XYZ Corp.",
      "position": "Consultant",
      "department": "Marketing",
      "salary": 79000
    },
    {
      "id": "14",
      "name": "Benjamin Garcia",
      "age": 33,
      "active": false,
      "address": "789 Cedar Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "benjamin@example.com",
      "phone": "555-802-4680",
      "company": "123 Industries",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 92000
    },
    {
      "id": "15",
      "name": "Charlotte Davis",
      "age": 29,
      "active": true,
      "address": "321 Pine Avenue",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "charlotte@example.com",
      "phone": "555-468-0248",
      "company": "DEF Corp.",
      "position": "Manager",
      "department": "Operations",
      "salary": 105000
    },
    {
      "id": "16",
      "name": "Henry Martin",
      "age": 31,
      "active": true,
      "address": "987 Oak Street",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "email": "henry.martin@example.com",
      "phone": "555-802-4680",
      "company": "456 Solutions",
      "position": "Developer",
      "department": "IT",
      "salary": 98000
    },
    {
      "id": "17",
      "name": "Harper Thomas",
      "age": 36,
      "active": false,
      "address": "654 Birch Avenue",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "email": "harper@example.com",
      "phone": "555-246-8024",
      "company": "GHI Solutions",
      "position": "Analyst",
      "department": "Finance",
      "salary": 84000
    },
    {
      "id": "18",
      "name": "Sebastian Rodriguez",
      "age": 32,
      "active": true,
      "address": "123 Elm Street",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "sebastian@example.com",
      "phone": "555-975-4680",
      "company": "MNO Corporation",
      "position": "Manager",
      "department": "Sales",
      "salary": 93000
    },
    {
      "id": "19",
      "name": "Evelyn Adams",
      "age": 27,
      "active": true,
      "address": "456 Oak Lane",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "evelyn@example.com",
      "phone": "555-802-0246",
      "company": "PQR Solutions",
      "position": "Consultant",
      "department": "Business Development",
      "salary": 76000
    },
    {
      "id": "20",
      "name": "Alexander Harris",
      "age": 35,
      "active": false,
      "address": "789 Maple Avenue",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "email": "alexander@example.com",
      "phone": "555-468-8024",
      "company": "JKL Solutions",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 91000
    },
    {
      "id": "21",
      "name": "Sofia Martinez",
      "age": 29,
      "active": true,
      "address": "321 Pine Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "sofia@example.com",
      "phone": "555-802-4680",
      "company": "MNO Corporation",
      "position": "Associate",
      "department": "Operations",
      "salary": 68000
    },
    {
      "id": "22",
      "name": "Daniel Thompson",
      "age": 33,
      "active": true,
      "address": "987 Cedar Lane",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "email": "daniel@example.com",
      "phone": "555-246-8024",
      "company": "ABC Inc.",
      "position": "Manager",
      "department": "Marketing",
      "salary": 92000
    },
    {
      "id": "23",
      "name": "Harper Lewis",
      "age": 28,
      "active": false,
      "address": "654 Elm Street",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "email": "harper.lewis@example.com",
      "phone": "555-975-4680",
      "company": "XYZ Corp.",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 84000
    },
    {
      "id": "24",
      "name": "Evelyn Allen",
      "age": 31,
      "active": true,
      "address": "321 Oak Avenue",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "evelyn.allen@example.com",
      "phone": "555-802-0246",
      "company": "123 Industries",
      "position": "Analyst",
      "department": "Finance",
      "salary": 97000
    },
    {
      "id": "25",
      "name": "Sebastian Young",
      "age": 29,
      "active": true,
      "address": "789 Cedar Street",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "sebastian.young@example.com",
      "phone": "555-468-8024",
      "company": "DEF Corp.",
      "position": "Developer",
      "department": "IT",
      "salary": 88000
    },
    {
      "id": "26",
      "name": "Scarlett Walker",
      "age": 35,
      "active": false,
      "address": "123 Pine Avenue",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "scarlett@example.com",
      "phone": "555-802-4680",
      "company": "GHI Solutions",
      "position": "Manager",
      "department": "Operations",
      "salary": 101000
    },
    {
      "id": "27",
      "name": "William Turner",
      "age": 32,
      "active": true,
      "address": "456 Elm Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "william.turner@example.com",
      "phone": "555-246-8024",
      "company": "456 Solutions",
      "position": "Consultant",
      "department": "Business Development",
      "salary": 82000
    },
    {
      "id": "28",
      "name": "Madison Rodriguez",
      "age": 27,
      "active": true,
      "address": "987 Oak Lane",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "email": "madison@example.com",
      "phone": "555-975-4680",
      "company": "MNO Corporation",
      "position": "Analyst",
      "department": "Finance",
      "salary": 90000
    },
    {
      "id": "29",
      "name": "James Peterson",
      "age": 31,
      "active": false,
      "address": "654 Cedar Lane",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "email": "james.peterson@example.com",
      "phone": "555-468-8024",
      "company": "PQR Solutions",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 95000
    },
    {
      "id": "30",
      "name": "Luna Baker",
      "age": 29,
      "active": true,
      "address": "321 Maple Avenue",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "email": "luna@example.com",
      "phone": "555-802-4680",
      "company": "JKL Solutions",
      "position": "Associate",
      "department": "Research",
      "salary": 76000
    },
    {
      "id": "31",
      "name": "Oliver Wright",
      "age": 34,
      "active": true,
      "address": "789 Oak Street",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "email": "oliver.wright@example.com",
      "phone": "555-468-8024",
      "company": "MNO Corporation",
      "position": "Manager",
      "department": "Operations",
      "salary": 105000
    },
    {
      "id": "32",
      "name": "Mia Foster",
      "age": 28,
      "active": true,
      "address": "123 Elm Street",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "mia.foster@example.com",
      "phone": "555-975-4680",
      "company": "ABC Inc.",
      "position": "Analyst",
      "department": "Finance",
      "salary": 88000
    },
    {
      "id": "33",
      "name": "Henry Brooks",
      "age": 33,
      "active": false,
      "address": "456 Oak Lane",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "henry.brooks@example.com",
      "phone": "555-468-8024",
      "company": "XYZ Corp.",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 95000
    },
    {
      "id": "34",
      "name": "Emily Cooper",
      "age": 31,
      "active": true,
      "address": "789 Pine Avenue",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "emily.cooper@example.com",
      "phone": "555-802-4680",
      "company": "123 Industries",
      "position": "Manager",
      "department": "Marketing",
      "salary": 102000
    },
    {
      "id": "35",
      "name": "Benjamin Martinez",
      "age": 29,
      "active": true,
      "address": "321 Cedar Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "benjamin.martinez@example.com",
      "phone": "555-468-8024",
      "company": "DEF Corp.",
      "position": "Developer",
      "department": "IT",
      "salary": 89000
    },
    {
      "id": "36",
      "name": "Victoria Howard",
      "age": 35,
      "active": false,
      "address": "987 Oak Lane",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "email": "victoria@example.com",
      "phone": "555-975-4680",
      "company": "GHI Solutions",
      "position": "Consultant",
      "department": "Business Development",
      "salary": 78000
    },
    {
      "id": "37",
      "name": "Daniel Clark",
      "age": 32,
      "active": true,
      "address": "654 Elm Street",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "email": "daniel.clark@example.com",
      "phone": "555-468-8024",
      "company": "MNO Corporation",
      "position": "Analyst",
      "department": "Finance",
      "salary": 97000
    },
    {
      "id": "38",
      "name": "Penelope Garcia",
      "age": 27,
      "active": true,
      "address": "123 Pine Avenue",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "email": "penelope@example.com",
      "phone": "555-802-4680",
      "company": "PQR Solutions",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 91000
    },
    {
      "id": "39",
      "name": "Alexander Mitchell",
      "age": 31,
      "active": false,
      "address": "456 Oak Lane",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "email": "alexander.mitchell@example.com",
      "phone": "555-468-8024",
      "company": "JKL Solutions",
      "position": "Associate",
      "department": "Research",
      "salary": 80000
    },
    {
      "id": "40",
      "name": "Sofia Wright",
      "age": 29,
      "active": true,
      "address": "789 Maple Avenue",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "email": "sofia.wright@example.com",
      "phone": "555-802-4680",
      "company": "MNO Corporation",
      "position": "Manager",
      "department": "Operations",
      "salary": 106000
    },
    {
      "id": "41",
      "name": "Gabriel Adams",
      "age": 28,
      "active": true,
      "address": "321 Elm Street",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "gabriel.adams@example.com",
      "phone": "555-975-4680",
      "company": "ABC Inc.",
      "position": "Analyst",
      "department": "Finance",
      "salary": 87000
    },
    {
      "id": "42",
      "name": "Aria Lewis",
      "age": 26,
      "active": false,
      "address": "123 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "aria.lewis@example.com",
      "phone": "555-468-8024",
      "company": "XYZ Corp.",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 93000
    },
    {
      "id": "43",
      "name": "Matthew Turner",
      "age": 30,
      "active": true,
      "address": "456 Oak Avenue",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "matthew.turner@example.com",
      "phone": "555-802-4680",
      "company": "123 Industries",
      "position": "Manager",
      "department": "Marketing",
      "salary": 105000
    },
    {
      "id": "44",
      "name": "Scarlett Hill",
      "age": 33,
      "active": true,
      "address": "789 Elm Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "scarlett@example.com",
      "phone": "555-468-8024",
      "company": "DEF Corp.",
      "position": "Developer",
      "department": "IT",
      "salary": 92000
    },
    {
      "id": "45",
      "name": "Ethan Walker",
      "age": 31,
      "active": false,
      "address": "987 Pine Avenue",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "email": "ethan.walker@example.com",
      "phone": "555-975-4680",
      "company": "GHI Solutions",
      "position": "Consultant",
      "department": "Business Development",
      "salary": 81000
    },
    {
      "id": "46",
      "name": "Chloe Scott",
      "age": 34,
      "active": true,
      "address": "654 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "email": "chloe.scott@example.com",
      "phone": "555-468-8024",
      "company": "MNO Corporation",
      "position": "Analyst",
      "department": "Finance",
      "salary": 99000
    },
    {
      "id": "47",
      "name": "Henry Nelson",
      "age": 27,
      "active": true,
      "address": "123 Elm Street",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "email": "henry.nelson@example.com",
      "phone": "555-802-4680",
      "company": "PQR Solutions",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 94000
    },
    {
      "id": "48",
      "name": "Lily Adams",
      "age": 29,
      "active": false,
      "address": "456 Oak Lane",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "email": "lily.adams@example.com",
      "phone": "555-468-8024",
      "company": "JKL Solutions",
      "position": "Associate",
      "department": "Research",
      "salary": 83000
    },
    {
      "id": "49",
      "name": "Sebastian Wright",
      "age": 32,
      "active": true,
      "address": "789 Pine Avenue",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "email": "sebastian.wright@example.com",
      "phone": "555-975-4680",
      "company": "MNO Corporation",
      "position": "Manager",
      "department": "Operations",
      "salary": 108000
    },
    {
      "id": "50",
      "name": "Grace Adams",
      "age": 28,
      "active": true,
      "address": "321 Elm Street",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "grace.adams@example.com",
      "phone": "555-468-8024",
      "company": "ABC Inc.",
      "position": "Analyst",
      "department": "Finance",
      "salary": 89000
    },
    {
      "id": "51",
      "name": "Lucas Parker",
      "age": 26,
      "active": false,
      "address": "654 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "lucas.parker@example.com",
      "phone": "555-802-4680",
      "company": "XYZ Corp.",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 95000
    },
    {
      "id": "52",
      "name": "Aiden Harris",
      "age": 30,
      "active": true,
      "address": "123 Oak Lane",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "aiden.harris@example.com",
      "phone": "555-468-8024",
      "company": "123 Industries",
      "position": "Manager",
      "department": "Marketing",
      "salary": 111000
    },
    {
      "id": "53",
      "name": "Zoe Morgan",
      "age": 33,
      "active": true,
      "address": "456 Elm Street",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "email": "zoe.morgan@example.com",
      "phone": "555-802-4680",
      "company": "DEF Corp.",
      "position": "Developer",
      "department": "IT",
      "salary": 97000
    },
    {
      "id": "54",
      "name": "Benjamin Turner",
      "age": 31,
      "active": false,
      "address": "789 Pine Avenue",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "email": "benjamin.turner@example.com",
      "phone": "555-468-8024",
      "company": "GHI Solutions",
      "position": "Consultant",
      "department": "Business Development",
      "salary": 86000
    },
    {
      "id": "55",
      "name": "Mia Scott",
      "age": 34,
      "active": true,
      "address": "987 Elm Street",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "email": "mia.scott@example.com",
      "phone": "555-802-4680",
      "company": "MNO Corporation",
      "position": "Analyst",
      "department": "Finance",
      "salary": 103000
    },
    {
      "id": "56",
      "name": "Jackson Nelson",
      "age": 27,
      "active": true,
      "address": "123 Maple Avenue",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "email": "jackson.nelson@example.com",
      "phone": "555-468-8024",
      "company": "PQR Solutions",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 98000
    },
    {
      "id": "57",
      "name": "Harper Adams",
      "age": 29,
      "active": false,
      "address": "456 Oak Lane",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "email": "harper.adams@example.com",
      "phone": "555-802-4680",
      "company": "JKL Solutions",
      "position": "Associate",
      "department": "Research",
      "salary": 87000
    },
    {
      "id": "58",
      "name": "David Wright",
      "age": 32,
      "active": true,
      "address": "789 Pine Avenue",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "email": "david.wright@example.com",
      "phone": "555-468-8024",
      "company": "MNO Corporation",
      "position": "Manager",
      "department": "Operations",
      "salary": 114000
    },
    {
      "id": "59",
      "name": "Victoria Adams",
      "age": 28,
      "active": true,
      "address": "321 Elm Street",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "email": "victoria.adams@example.com",
      "phone": "555-802-4680",
      "company": "ABC Inc.",
      "position": "Analyst",
      "department": "Finance",
      "salary": 91000
    },
    {
      "id": "60",
      "name": "Carter Parker",
      "age": 26,
      "active": false,
      "address": "654 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "email": "carter.parker@example.com",
      "phone": "555-468-8024",
      "company": "XYZ Corp.",
      "position": "Engineer",
      "department": "Engineering",
      "salary": 99000
    },
    {
      "id": "61",
      "name": "Penelope Walker",
      "age": 30,
      "active": true,
      "address": "987 Oak Avenue",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "email": "penelope.walker@example.com",
      "phone": "555-802-4680",
      "company": "123 Industries",
      "position": "Manager",
      "department": "Marketing",
      "salary": 119000
    }
  ],
}


