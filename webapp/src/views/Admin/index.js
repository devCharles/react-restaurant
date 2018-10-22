
import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Admin.module.css'

import Menu from '../../components/Menu'
import OrdersList from '../../components/OrdersList'
import About from '../../components/About'

const styles = classNames.bind(styleModule)

class Admin extends Component {
  componentDidMount () {
    // this.props.getAllDishes()
  }

  render () {
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
              <Redirect exact from='/restaurant' to='/restaurant/orders' />
              <Route exact path='/restaurant/orders' component={OrdersList} />
              <Route exact path='/restaurant/menu' component={() => (<p> LIST ORDErS! </p>)} />
              <Route exact path='/restaurant/about' component={About} />
              <Route component={() => (<p> NOT FOUND! </p>)} />
            </Switch>
          </main>
        </section>
      </div>
    )
  }
}

export default Admin
