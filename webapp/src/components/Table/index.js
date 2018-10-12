import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styleModule from './Table.module.css'

const styles = classNames.bind(styleModule)

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newTableName: '',
      isLoading: false
    }
  }

  handleCreate () {
    const { newTableName } = this.state
    const { creator, onCreated } = this.props

    this.setState({ isLoading: true })

    if (newTableName) {
      creator(newTableName)
        .then(() => {
          console.warn('onCreated')
          this.setState({ 
            isLoading: false,
            newTableName: ''
          })
          onCreated()
        })
    }
  }

  render () {
    const { table, isAdd, ...props } = this.props
    const { isLoading } = this.state
    return (
      <div
        className={styles('column', 'is-one-quarter-desktop is-one-third-tablet')}
        title={!table.isTaken ? 'Asignar comezales' : 'Levantar orden'}
        {...props}
      >
        <div className={styles('box', 'table')}>
          <header className={styles('header')}>
            {table.name}
          </header>
          <article className={styles('body')} >
            { table.isTaken && !isAdd &&
              <div>
                <FontAwesomeIcon icon={['fas', 'users']} />
                <span> { table.custommersNumber } </span>
              </div>
            }
            { !table.isTaken && !isAdd &&
              <FontAwesomeIcon icon={['fas', 'clock']} />
            }
            { isAdd &&
              <div className='columns'>
                <div className='column is-full'>
                  <input
                    type='text'
                    placeholder='Nombre'
                    className='input'
                    onKeyUp={({ target }) => this.setState({ newTableName: target.value })}
                  />
                </div>
              </div>
            }
          </article>
          { !isAdd &&
            <footer className={styles('footer')}>
              <div>
                <FontAwesomeIcon
                  icon={['fas', 'circle']}
                  className={styles({ 'taken': table.isTaken }, { 'available': !table.isTaken })} />
                <span> { table.isTaken ? 'Ocupada' : 'Disponible' } </span>
              </div>
              <FontAwesomeIcon
                className={styles('action')}
                icon={table.isTaken ? ['fas', 'plus-circle'] : ['fas', 'user-plus']}
              />
            </footer>
          }
          { isAdd &&
            <div className='columns is-centered'>
              <div className='column is-right'>
                <input
                  type='submit'
                  placeholder='Nombre'
                  className={styles('button', 'is-white', { 'is-loading': isLoading })}
                  value='Crear'
                  onClick={this.handleCreate.bind(this)}
                />
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Table
