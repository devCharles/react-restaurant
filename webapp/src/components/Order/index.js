
import React, { Component } from 'react'
import { get } from 'lodash'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Order.module.css'

const styles = classNames.bind(styleModule)

class Order extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      dishes: [],
      total: 0,
      numOfDishes: 0
    }
  }

  componentDidMount () {
    const dishes = this.getUniqueDishes()
    const total = dishes.reduce((total, dish) => {
      const { count = 0, price = 0 } = dish
      return (total + (count * price))
    }, 0)
    const numOfDishes = dishes.reduce((total, dish) => total + dish.count, 0)
    this.setState({ dishes, total, numOfDishes })
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

  render () {
    const { isSelected, total, numOfDishes } = this.state
    const { order, index, onClick } = this.props
    const orderName = order.name || `Ord-${order._id.slice(-3)}`

    return (
      <>
        <div
          className={styles('columns', 'is-multiline', 'is-mobile', 'is-fullwidth', 'order', { isSelected })}
          onClick={onClick}
        >
          <div className='column is-full-mobile is-size-6-mobile has-text-centered-mobile'>
            { `${index}° - ${orderName}` }
          </div>
          <div className='column has-text-centered is-half-mobile'>
            <span className='icon'>
              <FontAwesomeIcon
                icon={['fas', 'utensils']}
                className={styles('icono')}
              />
            </span>
            <span>{ numOfDishes } </span>
          </div>
          <div className='column has-text-centered is-half-mobile'>
            <span className='icon'>
              <FontAwesomeIcon icon={['fas', 'dollar-sign']} className={styles('icono')} />
            </span>
            <span>{ total } </span>
          </div>
          <div className='column has-text-right is-hidden-mobile '>
            <FontAwesomeIcon icon={['fas', 'ellipsis-h']} className={styles('icono')} />
          </div>
        </div>
      </>
    )
  }
}

export default Order
