import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import styleModule from './Modal.module.css'

const styles = classNames.bind(styleModule)

class componentName extends Component {
  render () {
    return (
      <div>
        <header>
          <h2>{ this.props.title }</h2>
          <FontAwesomeIcon
            icon={['fas', 'times']}
            onClick={this.props.onClose}
          />
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default componentName
