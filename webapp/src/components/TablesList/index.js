import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Table from '../Table'
import styleModule from './TablesList.module.css'

const styles = classNames.bind(styleModule)

const tables = [
  {
    name: 'Mesa 1',
    isTaken: false,
    custommersNumber: 2
  },
  {
    name: 'Mesa 2',
    isTaken: true,
    custommersNumber: 1

  },
  {
    name: 'Mesa 3',
    isTaken: true,
    custommersNumber: 10

  },
  {
    name: 'Mesa 4',
    isTaken: false,
    custommersNumber: 9
  }
]

class TableList extends Component {
  render () {
    return (
      <section className={styles('', 'tables-container')}>
        <div className={styles('columns', 'is-multiline', 'tables-columns')}>
          { tables.map(table => <Table table={table} />) }
        </div>
      </section>
    )
  }
}

export default TableList
