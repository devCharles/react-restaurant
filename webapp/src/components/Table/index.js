import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styleModule from './Table.module.css'

const styles = classNames.bind(styleModule)

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addCustomersNumber: 0,
      isSelected: false,
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
          this.setState({
            isLoading: false,
            newTableName: ''
          })
          onCreated()
        })
    }
  }

  handleClick () {
    this.setState({ isSelected: true })
    console.warn('click table')
  }

  handleClose () {
    this.setState({ isSelected: false })
    console.warn(' close ')
  }

  addCustomers (event) {
    event.preventDefault()
    event.stopPropagation()
    const { table, addCustomers, onAddCustomer } = this.props
    const { addCustomersNumber } = this.state
    const { _id } = table
    console.warn(`table: "${_id}", customers: "${addCustomersNumber}"`)
    if (addCustomers) {
      addCustomers()
        .then(() => {
          this.setState({ isSelected: false })
          onAddCustomer()
        })
    }
  }

  render () {
    const { table, isAdd, ...props } = this.props
    const { isLoading, isSelected } = this.state
    return (
      <div
        className={styles('column', 'is-one-quarter-desktop is-one-third-tablet')}
        title={!table.isTaken ? 'Asignar comezales' : 'Levantar orden'}
        onClick={this.handleClick.bind(this)}
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
            { !table.isTaken && !isAdd && !isSelected &&
              <FontAwesomeIcon icon={['fas', 'clock']} />
            }
            { !table.isTaken && !isAdd && isSelected &&
              <form className='columns is-multiline is-mobile is-centered'>
                <div className='column is-three-fifths'>
                  <div className='control has-icons-left'>
                    <span class='icon is-small is-left'>
                      <FontAwesomeIcon icon={['fas', 'users']} />
                    </span>
                    <input
                      type='number'
                      value={this.state.addCustomersNumber}
                      className='input'
                      onChange={({ target }) => this.setState({ addCustomersNumber: target.value })}
                    />
                  </div>
                </div>
                <div className='column is-two-fifths'>
                  <button
                    className='button is-white'
                    onClick={this.addCustomers.bind(this)}
                  >
                    <FontAwesomeIcon icon={['fas', 'user-plus']} />
                  </button>
                </div>
              </form>
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
            { !isSelected &&
              <FontAwesomeIcon
                className={styles('action')}
                icon={table.isTaken ? ['fas', 'plus-circle'] : ['fas', 'user-plus']}
              />
            }
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
