import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Table from '../Table'

import styleModule from './TablesList.module.css'

const styles = classNames.bind(styleModule)

class TableList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableSelected: '',
      showModal: false
    }
  }

  componentDidMount () {
    // this.props.getTables()
    // this.props.setSectionName('Mesas')
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
    const { tables = [], createTable, getTables, addCustomers: customersAdder } = this.props
    return (
      <section className={styles('tables-container')}>
        <div className={styles('columns', 'is-multiline', 'tables-columns')}>
          {tables.map(table => (
            <Table
              key={table._id}
              table={table}
              addCustomers={customersAdder}
              onAddCustomer={getTables}
            />
          ))}
          <Table
            isAdd
            table={{ name: 'Nueva mesa' }}
            creator={createTable}
            onCreated={getTables}
          />
        </div>
      </section>
    )
  }
}

export default TableList
