import React, { Component } from 'react'
import { get } from 'lodash'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'

import orderService from '../../lib/api/order'
import styleModule from './AddOrderModal.module.css'

const styles = classNames.bind(styleModule)

// react-select

class AddOrderModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dishesObject: {},
      dishSelected: null,
      dishesChoosen: [],
      dishCounter: {},
      avialableDishes: [],
      orderName: ''
    }
  }

  componentDidMount () {
    const { dishes } = this.props
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

  removeDish (dishId) {
    let {
      dishCounter,
      avialableDishes,
      dishesChoosen,
      dishesObject
    } = this.state

    // reset dish counter
    delete dishCounter[dishId]

    // put it back in avialable dishes
    const isAlreadyAvialable = avialableDishes.find(dish => dish._id === dishId)
    const dish = dishesObject[dishId]
    avialableDishes = isAlreadyAvialable
      ? avialableDishes
      : [ ...avialableDishes, dish ]

    // remove from choosen dishes
    dishesChoosen = dishesChoosen.filter(id => id !== dishId)

    this.setState({
      dishCounter,
      avialableDishes,
      dishesChoosen
    })
  }

  handleOnChangeDishSelect ({ target }) {
    this.setState({ dishSelected: target.value })
  }

  handleOnChangeQuantitySelect ({ target }) {
    this.setState({ dishQuantitySelected: target.value })
  }

  handleNameWrite ({ target }) {
    this.setState({ orderName: target.value })
  }

  createOrder (event) {
    event.preventDefault()
    event.stopPropagation()
    const { orderName, dishesChoosen } = this.state
    const { onClose, onCreate } = this.props
    orderService.create(orderName, dishesChoosen)
      .then(order => {
        onCreate()
        onClose()
      })
  }

  render () {
    const {
      dishCounter,
      dishesObject,
      avialableDishes,
      dishSelected,
      dishesChoosen
    } = this.state
    const { onClose } = this.props

    const selectDishOptions = avialableDishes.map(dish => {
      return { value: dish._id, label: dish.name }
    })

    return (
      <Modal title='Nueva orden' onClose={onClose}>
        <form className='columns is-mobile is-multiline'>
          <div className='column is-full'>
            <div className='columns'>
              <div className='column is-full-mobile is-half'>
                <input
                  required
                  type='text'
                  className='input'
                  placeholder='Idenificador'
                  maxLength='10'
                  minLength='1'
                  onKeyUp={this.handleNameWrite.bind(this)}
                />
              </div>
            </div>
          </div>
          <div className='column is-full'>
            <div className='columns is-mobile'>
              <div className='column is-full'>
                <h2> Platillos: </h2>
              </div>
            </div>
          </div>
          <div className='column'>
            {Object.entries(dishCounter).map(([dishId, timesChoosen]) => {
              const dish = dishesObject[dishId]
              return (
                <div key={dishId} className={styles('columns', 'is-mobile', 'dish')}>
                  <div className='column'>
                    { dish.name }
                  </div>
                  <div className='column'>
                    { timesChoosen }
                  </div>
                  <div className='column'>
                    { dish.price * timesChoosen }
                  </div>
                  <div className='column has-text-right'>
                    <span className='icon has-text-danger' title={`Quitar ${dish.name}`}>
                      <FontAwesomeIcon
                        icon={[ 'fas', 'times-circle' ]}
                        size='lg'
                        className={styles('delete')}
                        onClick={this.removeDish.bind(this, dishId)}
                      />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          { selectDishOptions.length > 0 &&
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
                    onClick={this.addDish.bind(this)}
                  />
                </div>
              </div>
            </div>
          }
          <div className='column is-full'>
            <div className='columns is-mobile'>
              <div className='column is-half is-offset-6'>
                <button
                  className={styles('button', 'is-fullwidth', 'is-pulled-right', 'create-btn')}
                  type='submit'
                  onClick={this.createOrder.bind(this)}
                  disabled={dishesChoosen.length <= 0}
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    )
  }
}

export default AddOrderModal
