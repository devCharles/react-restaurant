
import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Login from './views/Login'
import Admin from './views/Admin'

class Routes extends Component {
  render () {
    return (
      <Switch>
        <Redirect from='/' to='/login' exact />
        <Route path='/login' component={Login} exact />
        <Route path='/restaurant' component={Admin} />
        <Route component={() => (<p> NOT FOUND! </p>)} />
      </Switch>
    )
  }
}

export default Routes
