import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Modal.module.css'

const styles = classNames.bind(styleModule)

class Modal extends Component {
  render () {
    const { title = 'Title', onClose } = this.props
    return (
      <div className={styles('overlay')}>
        <div className='columns is-centered'>
          <div className='column is-one-third is-half-desktop'>
            <div className={styles('box', 'modal')}>
              <header>
                <div className='columns is-centered is-mobile'>
                  <div className={styles('column', 'is-four-fifth', 'title', 'modal-title')}>
                    {title}
                  </div>
                  <div
                    className='column is-one-fifth'
                  >
                    <FontAwesomeIcon
                      onClick={() => onClose()}
                      className={styles('close', 'is-pulled-right')}
                      icon={['fas', 'times']}
                      size='2x'
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

export default Modal
