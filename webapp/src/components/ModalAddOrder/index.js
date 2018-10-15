import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

import Modal from '../Modal'

class ModalTakeTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choosenDishes: [],
      items: 1,
      dishId: 0,
      dishQuantity: 0
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
      dishId: null,
      dishQuantity: 0
    })
  }

  createOrder () {
    console.warn('create order')
    this.props.onClose()
  }

  render () {
    const { table, dishes = [], onClose = () => null } = this.props
    let { choosenDishes } = this.state
    return (
      <Modal
        title={table.name}
        onClose={onClose}
      >
        <form className='columns is-multiline is-mobile'>
          <div className='column is-full'>
            <h1> Nueva orden </h1>
          </div>
          {
            choosenDishes.map((dish, index) =>
              <div key={index} className='column is-full'>
                {`(${dish.quantity}) - ${dish.name}`}
              </div>
            )
          }

          <div className='column is-two-quarters'>
            <div className='select is-fullwidth'>
              <select
                className='full-width'
                onChange={({ target }) => this.setState({ dishId: target.value })}
              >
                { dishes.map(dish =>
                  <option value={dish._id} key={dish._id}>
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

function mapStateToProps (state) {
  return {
    dishes: state.dishes.list
  }
}

export default connect(mapStateToProps)(ModalTakeTable)
