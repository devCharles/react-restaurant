
/* action types */
export const GET_ALL_TABLES = 'GET_ALL_TABLES'
export const SAVE_TABLE = 'SAVE_TABLE'
export const GET_TABLE = 'GET_TABLE'

/* action creators */
export const getAllTables = () => ({ type: GET_ALL_TABLES })

export const saveTable = (tableData) => ({ type: SAVE_TABLE, payload: tableData })

export const getTable = (tableId) => ({ type: GET_TABLE, payload: tableId })
