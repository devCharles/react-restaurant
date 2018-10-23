import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { get } from 'lodash'

import Modal from '../Modal'

import orderService from '../../lib/api/order'
import dishesService from '../../lib/api/dishes'
import styleModule from './OrderDetailModal.module.css'

const styles = classNames.bind(styleModule)

class OrderDetailModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allDishes: [],
      dishesLoading: true,
      addDishEnabled: false,
      dishSelected: null,
      avialableDishes: [],
      dishesObject: {},
      dishCounter: {},
      dishesChoosen: []
    }
  }

  componentDidMount () {
    this.getDishes()
  }

  componentDidUpdate (prevProps, prevState) {
    const { allDishes: dishes } = this.state
    if (prevState.allDishes.length <= 0 && dishes.length >= 1) {
      const dishesObject = dishes.reduce((obj, dish) => {
        return {
          ...obj,
          [dish._id]: dish
        }
      }, {})
      this.setState({
        dishesObject,
        avialableDishes: dishes,
        dishSelected: get(dishes, '0._id', 'NONE')
      })
    }
  }

  getDishes () {
    dishesService.getAll()
      .then(dishes => {
        this.setState({ allDishes: dishes, dishesLoading: false })
      })
      .catch(error => {
        console.error('ERROR GET DISHES', error)
        alert('Por favor recarga la pagina.') // eslint-disable-line
      })
  }

  removeDish (dishId) {
    const { onUpdate, order } = this.props
    orderService.removeDish(order._id, dishId)
      .then(() => {
        onUpdate()
      })
  }

  addDish () {
    const {
      dishCounter,
      dishSelected,
      dishesChoosen,
      avialableDishes
    } = this.state
    const isAtLeastTwoTimesAdded = dishesChoosen.filter(dishId => dishId === dishSelected).length >= 2

    if (dishCounter[dishSelected] >= 2) {
      const newAvialableDishes = avialableDishes.filter(dish => dish._id !== dishSelected)

      return this.setState({
        dishCounter: {
          ...dishCounter,
          [dishSelected]: dishCounter[dishSelected] > 2
            ? 2
            : dishCounter[dishSelected] || 1
        },
        avialableDishes: newAvialableDishes
      })
    }
    const dishes = isAtLeastTwoTimesAdded
      ? dishesChoosen
      : [ ...dishesChoosen, dishSelected ]

    return this.setState({
      dishCounter: {
        ...dishCounter,
        [dishSelected]: ++dishCounter[dishSelected] || 1
      },
      dishesChoosen: dishes,
      dishSelected: get(avialableDishes, '0._id', 'NONE')
    })
  }

  addDishToOrder () {
    const { dishSelected } = this.state
    const { order, onUpdate } = this.props
    if (!dishSelected) return null
    orderService.addDish(order._id, dishSelected)
      .then(() => {
        onUpdate()
      })
  }

  getUniqueDishes () {
    const dishesCount = this.props.order.dishes.reduce((hashTable, dish) => {
      const key = dish._id
      let count = get(hashTable, `count.${key}`, 0)
      return {
        count: { ...hashTable.count, [key]: ++count },
        dishesObject: { ...hashTable.dishesObject, [key]: dish }
      }
    }, { count: {}, dishesObject: {} })

    return Object.entries(dishesCount.dishesObject).map(([id, dish]) => {
      return { ...dish, count: dishesCount.count[id] }
    })
  }

  handleOnChangeDishSelect ({ target }) {
    this.setState({ dishSelected: target.value })
  }

  handleOnChangeQuantitySelect ({ target }) {
    this.setState({ dishQuantitySelected: target.value })
  }

  render () {
    const { onClose, order } = this.props
    const { addDishEnabled, dishSelected, avialableDishes } = this.state
    let { dishes, name: orderName } = order
    const selectDishOptions = avialableDishes.map(dish => {
      return { value: dish._id, label: dish.name }
    })

    dishes = this.getUniqueDishes()

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
                <strong> {order.dishes.length} </strong>
              </div>
              <div className='column has-text-centered'>
                <strong>
                  {dishes.reduce((total, dish) => {
                    const { count = 0, price = 0 } = dish
                    return (total + (count * price))
                  }, 0)}
                </strong>
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
                      <option key={option.label} value={option.value} >
                        {option.label}
                      </option>
                    )}
                  </select>
                </div>
                <div className={styles('column', 'has-text-right', 'submit')}>
                  <FontAwesomeIcon
                    icon={['fas', 'sign-in-alt']}
                    size='lg'
                    onClick={this.addDishToOrder.bind(this)}
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
