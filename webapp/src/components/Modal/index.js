import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Modal.module.css'

const styles = classNames.bind(styleModule)

class componentName extends Component {
  render () {
    return (
      <div className={styles('overlay')}>
        <div className='columns is-centered'>
          <div className='column is-one-third'>
            <div className={styles('box')}>
              <header>
                <div className='columns is-centered'>
                  <div className={styles('column', 'is-four-fifth', 'title')}>
                    'Title'
                  </div>
                  <div className='column is-one-fifth '>
                    <FontAwesomeIcon
                      className={styles('close', 'is-pulled-right')}
                      icon={['fas', 'times']}
                      size='2x'
                      onClick={this.props.onClose}
                    />
                  </div>
                </div>
              </header>
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default componentName
