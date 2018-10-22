import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './About.module.css'

const styles = classNames.bind(styleModule)

class About extends Component {
  render () {
    return (
      <div className={styles('cover')}>
        <div className={styles('item')}>
          <a href='https://github.com/devCharles/react-restaurant' target='_blank' >
            <FontAwesomeIcon icon={['fab', 'github']} size='5x' />
          </a>
          <a href='https://github.com/devCharles/react-restaurant' target='_blank' >
            Github repo
          </a>
        </div>
        <div className={styles('item')}>
          <a href='http://restaurant-api.devcharles.com' target='_blank' >
            <FontAwesomeIcon icon={['fas', 'book']} size='5x' />
          </a>
          <a href='http://restaurant-api.devcharles.com' target='_blank' >
            API Docs
          </a>
        </div>

      </div>
    )
  }
}

export default About
