import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'

import orderService from '../../lib/api/order'
import dishesService from '../../lib/api/dishes'
import styleModule from './OrderDetailModal.module.css'

const styles = classNames.bind(styleModule)

class OrderDetailModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      AllDishes: [],
      dishesLoading: true,
      addDishEnabled: false,
      dishSelected: null,
      avialableDishes: [],
      dishesAsObject: {},
      dishCount: {}
    }
  }

  componentDidMount () {
    this.getDishes()
  }

  getDishes () {
    dishesService.getAll()
      .then(dishes => {
        this.setState({ AllDishes: dishes, dishesLoading: false })
      })
      .catch(error => {
        console.error('ERROR GET DISHES', error)
        alert('Por favor recarga la pagina.') // eslint-disable-line
      })
  }

  removeDish (dishId) {
    const { onUpdate, orderId } = this.props
    orderService.removeDish(orderId, dishId)
      .then(() => {
        console.warn('delete')
        onUpdate()
      })
  }

  addDish (dishId) {

  }

  render () {
    const { orderName, dishes, numOfDishes, total, onClose } = this.props
    const { addDishEnabled, dishSelected, avialableDishes } = this.state
    const selectDishOptions = avialableDishes.map(dish => {
      return { value: dish._id, label: dish.name }
    })

    return (
      <Modal
        onClose={onClose}
        title={orderName}
      >
        <div className='columns is-multiline'>
          <header className={styles('column', 'is-full', 'is-mobile', 'detail-header')}>
            <div className='columns is-mobile'>
              <div className='column is-one-third'>
                <strong>Platillos</strong>
              </div>
              <div className='column is-one-quarter'>
                <strong>#</strong>
              </div>
              <div className='column has-text-centered'>
                <strong>Total</strong>
              </div>
              <div className='column' />
            </div>
          </header>
          { dishes.map(dish => {
            const { name = '', count = 1, price = 0 } = dish
            return (
              <div className={styles('column', 'is-full', 'dish')} key={name}>
                <div className='columns is-mobile'>
                  <div className='column is-one-third'>
                    {name}
                  </div>
                  <div className='column is-one-quarter'>
                    {count}
                  </div>
                  <div className='column has-text-centered'>
                    {price * count}
                  </div>
                  <div className='column has-text-right'>
                    <span className='icon has-text-danger' title={`Quitar ${dish.name}`}>
                      <FontAwesomeIcon
                        icon={[ 'fas', 'times-circle' ]}
                        size='lg'
                        className={styles('delete')}
                        onClick={this.removeDish.bind(this, dish._id)}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
          <section className={styles('column', 'is-full', 'detail-footer')}>
            <div className='columns is-mobile'>
              <div className='column is-one-third'>
                <strong>Total</strong>
              </div>
              <div className='column is-one-quarter'>
                <strong> {numOfDishes} </strong>
              </div>
              <div className='column has-text-centered'>
                <strong> {total} </strong>
              </div>
              <div className='column has-text-right'>
                <span className='icon'>
                  <FontAwesomeIcon
                    icon={['fas', 'plus-circle']}
                    size='lg'
                    title='Agregar platillo'
                    className={styles('add')}
                    onClick={() => this.setState({ addDishEnabled: true })}
                  />
                </span>
              </div>
            </div>
          </section>
          {addDishEnabled &&
            <div className='column is-full'>
              <div className='columns is-mobile'>
                <div className='column is-three-fifths'>
                  <select
                    className='input'
                    onChange={this.handleOnChangeDishSelect.bind(this)}
                    onBlur={this.handleOnChangeDishSelect.bind(this)}
                    onClick={this.handleOnChangeDishSelect.bind(this)}
                    value={dishSelected}
                  >
                    {selectDishOptions.map(option =>
                      <option value={option.value} >
                        {option.label}dishSelected
                      </option>
                    )}
                  </select>
                </div>
                <div className={styles('column', 'has-text-right', 'submit')}>
                  <FontAwesomeIcon
                    icon={['fas', 'sign-in-alt']}
                    size='lg'
                    onClick={this.addDish.bind(this)}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      </Modal>
    )
  }
}

export default OrderDetailModal
