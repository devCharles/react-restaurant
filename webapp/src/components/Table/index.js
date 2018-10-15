import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import ModalAddOrder from '../ModalAddOrder'

import styleModule from './Table.module.css'

const styles = classNames.bind(styleModule)

class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addCustomersNumber: 0,
      isSelected: false,
      newTableName: '',
      isLoading: false,
      createTableError: false
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
        .catch(() => {
          this.setState({ createTableError: true })
        })
    }
  }

  handleClick (event) {
    event.preventDefault()
    event.stopPropagation()
    this.setState({ isSelected: true })
  }

  handleCancel (event) {
    console.warn('CANCEL')
    event.preventDefault()
    event.stopPropagation()
    this.setState({ isSelected: false })
  }

  addCustomersFun (event) {
    event.preventDefault()
    event.stopPropagation()
    const { table, addCustomers, onAddCustomer } = this.props
    const { addCustomersNumber } = this.state
    addCustomers(table._id, addCustomersNumber)
      .then(() => {
        this.setState({ isSelected: false })
        onAddCustomer()
      })
  }

  render () {
    const { table, isAdd, ...props } = this.props
    const { isLoading, isSelected } = this.state
    return (
      <>
        { table.isTaken && isSelected &&
          <ModalAddOrder
            table={table}
            onClose={() => this.setState({ isSelected: false })}
          />
        }
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
                <span> { table.customersNumber } </span>
              </div>
              }
              { !table.isTaken && !isAdd && !isSelected &&
              <FontAwesomeIcon icon={['fas', 'clock']} />
              }
              { !table.isTaken && !isAdd && isSelected &&
              <form className='columns is-multiline is-mobile is-centered has-text-centered is-gapless'>
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
                <div className='column is-one-fifth'>
                  <button
                    className='button is-white'
                    onClick={this.addCustomersFun.bind(this)}
                  >
                    <FontAwesomeIcon icon={['fas', 'user-plus']} />
                  </button>
                </div>
                <div className='column is-one-fifth'>
                  <button
                    className='button is-danger'
                    onClick={this.handleCancel.bind(this)}
                  >
                    <FontAwesomeIcon icon={['fas', 'times-circle']} />
                  </button>
                </div>
              </form>
              }
              { isAdd &&
                <form className='columns'>
                  <div className='column is-two-thirds'>
                    <input
                      type='text'
                      placeholder='Nombre'
                      className='input'
                      onKeyUp={({ target }) => this.setState({ newTableName: target.value })}
                    />
                  </div>
                  <div className='column is-one-third'>
                    <button
                      type='submit'
                      className={styles('button', 'is-fullwidth', 'is-white', { 'is-loading': isLoading })}
                      onClick={this.handleCreate.bind(this)}
                    >
                      <FontAwesomeIcon icon={['fas', 'plus-circle']} />
                    </button>
                  </div>
                </form>
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
          </div>
        </div>
      </>
    )
  }
}

export default Table
