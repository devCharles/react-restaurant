
import React, { Component } from 'react'
import { get } from 'lodash'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal'
import styleModule from './Order.module.css'

const styles = classNames.bind(styleModule)

class Order extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelected: false,
      dishes: []
    }
  }

  componentDidMount () {
    console.warn('ORDER DID MOUNT')
    const dishes = this.getUniqueDishes()
    this.setState({ dishes })
  }

  handleClick () {
    const { isSelected } = this.state
    this.setState({ isSelected: !isSelected })
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
    const { isSelected, dishes } = this.state
    const { order, index } = this.props
    const orderName = order.name || `orden-${order._id.slice(-3)}`
    // const dishes = this.getUniqueDishes()

    return (
      <>
        <div
          className={styles('columns', 'is-multiline', 'is-mobile', 'is-fullwidth', 'order', { isSelected })}
          onClick={this.handleClick.bind(this)}
        >
          <div className='column is-three-quarters-mobile is-size-7-mobile'>
            { `${index}° - ${orderName}` }
          </div>
          <div className='column has-text-right is-one-quarter-mobile'>
            <FontAwesomeIcon
              icon={['fas', 'circle']}
              className={styles('status', { isClosed: order.status === 'open' })}
            />
          </div>
          <div className='column has-text-right is-full-mobile'>
            <FontAwesomeIcon
              icon={['fas', 'ellipsis-h']}
            />
          </div>
        </div>
        {isSelected &&
          <Modal
            onClose={this.handleClick.bind(this)}
            title={orderName}
          >
            <div className='columns is-multiline'>
              <header className='column is-full is-mobile'>
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
                  <div className='column is-full' key={name}>
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
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <section className='column is-full'>
                <div className='columns is-mobile'>
                  <div className='column is-one-third'>
                    <strong>Total</strong>
                  </div>
                  <div className='column is-one-quarter'>
                    <strong>
                      {dishes.reduce((total, dish) => total + dish.count, 0)}
                    </strong>
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
                      />
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </Modal>
        }
      </>
    )
  }
}

export default Order
