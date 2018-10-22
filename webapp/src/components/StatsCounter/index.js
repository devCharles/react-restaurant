import React, { Component } from 'react'
import classNames from 'classnames/bind'

import styleModule from './StatsCounter.module.css'

const styles = classNames.bind(styleModule)

class StatsCounter extends Component {
  render () {
    const { num = 0, title = 'conter' } = this.props
    return (
      <div className={styles('columns', 'is-multiline', 'is-centered', 'counter-container')}>
        <div className='column is-full has-text-centered is-paddingless'>
          <span className={styles('counter')}>
            { num }
          </span>
        </div>
        <div className='column is-full has-text-centered'>
          <span className={styles('counter-title')}>
            { title }
          </span>
        </div>
      </div>
    )
  }
}

export default StatsCounter
