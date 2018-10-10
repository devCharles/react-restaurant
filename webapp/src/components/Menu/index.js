
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Menu.module.css'

import options from './MenuOptions'

const styles = classNames.bind(styleModule)

class Menu extends Component {
  render () {
    return (
      <nav className={styles('nav')}>
        <div className={styles('logo')}>
          <FontAwesomeIcon icon={['fab', 'react']} size='2x' />
          <span className={styles('logo-text')}>Restaurant</span>
        </div>
        {options.map((item) => (
          <div
            className={styles('item')}
            onClick={() => this.props.history.push(item.route)}
          >
            <FontAwesomeIcon icon={item.icon} size='1x' />
            <span>{item.text}</span>
          </div>
        ))
        }
      </nav>
    )
  }
}

export default withRouter(Menu)
