import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTables } from '../../redux/actions/table'

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
