import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Table from '../Table'
import styleModule from './TablesList.module.css'

const styles = classNames.bind(styleModule)

const tables = [
  {
    id: 1,
    name: 'Mesa 1',
    isTaken: false,
    custommersNumber: 2
  },
  {
    id: 2,
    name: 'Mesa 2',
    isTaken: true,
    custommersNumber: 1
  },
  {
    id: 3,
    name: 'Mesa 3',
    isTaken: true,
    custommersNumber: 10

  },
  {
    id: 4,
    name: 'Mesa 4',
    isTaken: false,
    custommersNumber: 9
  }
]

class TableList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableSelected: '',
      showModal: false
    }
  }

  onSelectTable (tableName) {
    this.setState({
      tableSelected: tableName,
      showModal: true
    })
  }

  onCloseModal () {
    this.setState({
      tableSelected: '',
      showModal: false
    })
  }

  render () {
    return (
      <section className={styles('', 'tables-container')}>
        <div className={styles('columns', 'is-multiline', 'tables-columns')}>
          {tables.map(table => (
            <Table
              table={table}
              onClick={this.onSelectTable.bind(this, table.id)}
            />
          ))}
        </div>
      </section>
    )
  }
}

export default TableList
