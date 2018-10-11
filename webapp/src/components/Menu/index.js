
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Menu.module.css'

import options from './MenuOptions'

const styles = classNames.bind(styleModule)

class Menu extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemSelected: 1
    }
  }

  onSelect (menuitem) {
    this.setState({ itemSelected: menuitem.id })
    this.props.history.push(menuitem.route)
  }

  render () {
    return (
      <nav className={styles('nav')}>
        <div className={styles('logo')}>
          <FontAwesomeIcon icon={['fas', 'utensils']} size='2x' />
        </div>
        {options.map((item) => (
          <div
            className={styles('item', { selected: this.state.itemSelected === item.id })}
            onClick={this.onSelect.bind(this, item)}
          >
            <FontAwesomeIcon icon={item.icon} size='1x' />
            <span>{item.text}</span>
          </div>
        ))}
      </nav>
    )
  }
}

export default withRouter(Menu)
