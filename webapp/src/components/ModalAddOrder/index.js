import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'

class ModalTakeTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choosenDishes: [],
      avialableDishes: [],
      items: 1,
      dishId: 0,
      dishQuantity: 1
    }
  }

  componentDidMount () {
    const { dishes } = this.props
    const [ firstDish ] = dishes
    const { _id: dishId = 0 } = firstDish

    this.setState({ dishId })
    this.updateAvialableDishes()
  }

  componentDidUpdate () {
    this.updateAvialableDishes()
  }

  updateAvialableDishes () {
    const { choosenDishes, avialableDishes } = this.state
    const { dishes } = this.props

    if (avialableDishes.length !== choosenDishes.length) {
      const choosenDishesIds = choosenDishes.map(dish => dish.id)
      // FIX THIS
      const newAvialableDishes = dishes.filter(dish => {
        return !choosenDishes.find(choosenDish => dish._id === choosenDish._id)
      })

      this.setState({ avialableDishes: newAvialableDishes })
    }
  }

  addDishToOrder (event) {
    event.preventDefault()
    event.stopPropagation()
    const { dishId, dishQuantity, choosenDishes } = this.state
    const { dishes } = this.props
    if (!dishId || dishQuantity <= 0) return null
    const dishData = dishes.find(dish => dish._id === dishId)
    const newDish = {
      ...dishData,
      quantity: dishQuantity
    }
    const newChoosenDishes = [ ...choosenDishes, newDish ]
    this.setState({
      choosenDishes: newChoosenDishes,
      dishQuantity: 1
    })
  }

  createOrder () {
    console.warn('create order')
    this.props.onClose()
  }

  render () {
    const { table, dishes = [], onClose = () => null } = this.props
    const { choosenDishes, avialableDishes } = this.state
    return (
      <Modal
        title={table.name}
        onClose={onClose}
      >
        <form className='columns is-multiline is-mobile'>
          <div className='column is-full'>
            <h1> Nueva orden </h1>
          </div>
          <div className='column is-two-quarters'>
            <div className='select is-fullwidth'>
              <select
                className='full-width'
                onChange={({ target }) => this.setState({ dishId: target.value })}
                onClick={({ target }) => this.setState({ dishId: target.value })}
              >
                { avialableDishes.map((dish, index) =>
                  <option value={dish._id} key={dish._id} >
                    { dish.name }
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className='column is-one-quarter'>
            <input
              type='number'
              className='input'
              placeholder='#'
              min='1'
              max='1000'
              value={this.state.dishQuantity}
              onChange={({ target }) => this.setState({ dishQuantity: target.value })}
            />
          </div>
          <div className='column is-one-quarter'>
            <button
              className='button is-black is-fullwidth'
              onClick={this.addDishToOrder.bind(this)}
            >
              <FontAwesomeIcon icon={['fas', 'plus-circle']} />
            </button>
          </div>
          { choosenDishes.map((dish, index) =>
            <div key={index} className='column is-full'>
              <div className='columns'>
                <div className='column is-half'>
                  {dish.name}
                </div>
                <div className='column is-half'>
                  {`x ${dish.quantity}`}
                </div>
              </div>
            </div>
          )}
          <div className='column is-full'>
            <button
              className='button'
              type='submit'
              onClick={this.createOrder.bind(this)}
            >
              Crear orden
            </button>
          </div>

        </form>
      </Modal>
    )
  }
}

export default ModalTakeTable
