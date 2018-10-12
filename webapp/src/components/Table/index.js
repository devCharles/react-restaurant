import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styleModule from './Table.module.css'

const styles = classNames.bind(styleModule)

class Table extends Component {
  render () {
    const { table, ...props } = this.props
    return (
      <div 
        className={styles('column', 'is-one-quarter')}
        title={!table.isTaken ? 'Asignar comezales' : 'Levantar orden'}
        {...props}
      >
        <div className={styles('box', 'table')}>
          <header className={styles('header')}>
            {table.name}
          </header>
          <article className={styles('body')} >
            { table.isTaken &&
              <div>
                <FontAwesomeIcon icon={['fas', 'users']} />
                <span> { table.custommersNumber } </span>
              </div>
            }
            { !table.isTaken &&
              <FontAwesomeIcon icon={['fas', 'clock']} />
            }
          </article>
          <footer className={styles('footer')}>
            <div>
              <FontAwesomeIcon
                icon={['fas', 'circle']}
                className={styles({ 'taken': table.isTaken }, { 'available': !table.isTaken })} />
              <span> { table.isTaken ? 'Ocupada' : 'Disponible' } </span>
            </div>
            <FontAwesomeIcon
              icon={table.isTaken ? ['fas', 'plus-circle'] : ['fas', 'user-plus']} 
            />
          </footer>
        </div>
      </div>
    )
  }
}

export default Table
