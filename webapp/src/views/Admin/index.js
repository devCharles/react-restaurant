
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

import styleModule from './Admin.module.css'

import Menu from '../../components/Menu'
import TableList from '../../components/TablesList'

const styles = classNames.bind(styleModule)

class Admin extends Component {
  render () {
    console.warn('>> props admin', this.props)
    return (
      <div className={styles('layout')}>
        <Menu />
        <section className={styles('content')}>
          <header className={styles('header')}>
            <span> { this.props.sectionName } </span>
            <FontAwesomeIcon icon={['fas', 'user-circle']} />
          </header>
          <main className={styles('main')} >
            <Switch>
              <Redirect exact from='/restaurant' to='/restaurant/tables' />
              <Route exact path='/restaurant/tables' component={TableList} />
              <Route exact path='/restaurant/orders' component={() => (<p> LIST ORDErS! </p>)} />
              <Route exact path='/restaurant/add-dishes' component={() => (<p> NEW DISH! </p>)}/>
              <Route component={() => (<p> NOT FOUND! </p>)} />
            </Switch>
          </main>
        </section>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    sectionName: state.ui.sectionName
  }
}

export default connect(mapStateToProps)(Admin)
