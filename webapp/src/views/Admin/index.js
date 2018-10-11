
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TableList from '../../components/TablesList'

import Menu from '../../components/Menu'
import styleModule from './Admin.module.css'

const styles = classNames.bind(styleModule)

class Admin extends Component {
  render () {
    return (
      <div className={styles('layout')}>
        <Menu />
        <section className={styles('content')}>
          <header className={styles('header')}>
            <span>  </span>
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

export default Admin
