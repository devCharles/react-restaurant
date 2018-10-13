import React, { Component, Fragment } from 'react'
import classNames from 'classnames/bind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getTables, createTable } from '../../redux/actions/table'
import uiActions from '../../redux/actions/ui'

import Table from '../Table'
import Modal from '../Modal'

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
    this.props.setSectionName('Mesas')
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
    const { tables, createTable, getTables } = this.props
    return (
      <>
        {this.state.showModal && <Modal />}
        <section className={styles('tables-container')}>
          <div className={styles('columns', 'is-multiline', 'tables-columns')}>
            {tables.map(table => (
              <Table
                key={table._id}
                table={table}
                onClick={this.onSelectTable.bind(this, table._id)}
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
      </>
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
    getTables: bindActionCreators(getTables, dispatch),
    setSectionName: bindActionCreators(uiActions.setSectionName, dispatch),
    createTable: bindActionCreators(createTable, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)
