import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTables } from '../../redux/actions/table'

import Table from '../Table'
import styleModule from './TablesList.module.css'

const styles = classNames.bind(styleModule)

// const tables = [
//   {
//     id: 1,
//     name: 'Mesa 1',
//     isTaken: false,
//     custommersNumber: 2
//   },
//   {
//     id: 2,
//     name: 'Mesa 2',
//     isTaken: true,
//     custommersNumber: 1
//   },
//   {
//     id: 3,
//     name: 'Mesa 3',
//     isTaken: true,
//     custommersNumber: 10

//   },
//   {
//     id: 4,
//     name: 'Mesa 4',
//     isTaken: false,
//     custommersNumber: 9
//   }
// ]

class TableList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableSelected: '',
      showModal: false
    }
  }

  componentDidMount () {
    this.props.getTables()
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
    const { tables } = this.props
    console.warn('>> tables: ', tables)
    return (
      <section className={styles('', 'tables-container')}>
        <div className={styles('columns', 'is-multiline', 'tables-columns')}>
          {tables.map(table => (
            <Table
              key={table._id}
              table={table}
              onClick={this.onSelectTable.bind(this, table._id)}
            />
          ))}
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    tables: state.table.existing
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getTables: bindActionCreators(getTables, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
