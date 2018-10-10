
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route } from 'react-router-dom'
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
            <span>
              ¡Tomemos la orden!
            </span>
            <FontAwesomeIcon icon={['fas', 'user-circle']} />
          </header>
          <article>
            <Switch>
              <Route exact path='/restaurant/tables-list' component={TableList} />
              <Route exact path='/restaurant/new-order' component={() => (<p> new order! </p>)}/>
              <Route exact path='/restaurant/orders-list' component={() => (<p> orders list! </p>)}/>
              <Route component={() => (<p> NOT FOUND! </p>)} />
            </Switch>
          </article>
        </section>
      </div>
    )
  }
}

export default Admin
