
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Admin.module.css'

import Menu from '../../components/Menu'
import TableList from '../../components/TablesList'
import AddTAble from '../../components/AddTable'

const styles = classNames.bind(styleModule)

class Admin extends Component {
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
          <main className={styles('main')} >
            <Switch>
              <Redirect exact from='/restaurant' to='/restaurant/tables' />
              <Route exact path='/restaurant/tables' component={TableList} />
              <Route exact path='/restaurant/add-table' component={AddTAble} />
              <Route exact path='/restaurant/add-dishes' component={() => (<p> new dish! </p>)}/>
              <Route component={() => (<p> NOT FOUND! </p>)} />
            </Switch>
          </main>
        </section>
      </div>
    )
  }
}

export default Admin
