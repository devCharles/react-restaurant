
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styleModule from './Admin.module.css'
import tableActons, { getTables } from '../../redux/actions/table'

import Menu from '../../components/Menu'
import TableList from '../../components/TablesList'

const styles = classNames.bind(styleModule)

class Admin extends Component {
  componentDidMount () {
    this.props.getAllTables()
  }

  render () {
    console.warn('>> props admin', this.props)
    return (
      <div className={styles('layout')}>
        <Menu />
        <section className={styles('content')}>
          <header className={styles('header')}>
            <span> Restaurant </span>
            <FontAwesomeIcon icon={['fas', 'user-circle']} />
          </header>
          <Switch>
            <Redirect exact from='/restaurant' to='/restaurant/tables' />
            <Route exact path='/restaurant/tables' component={TableList} />
            <Route exact path='/restaurant/add-table' component={() => (<p> new table! </p>)}/>
            <Route exact path='/restaurant/add-dishes' component={() => (<p> new dish! </p>)}/>
            <Route component={() => (<p> NOT FOUND! </p>)} />
          </Switch>
        </section>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    tables: state.table
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllTables: bindActionCreators(getTables, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
