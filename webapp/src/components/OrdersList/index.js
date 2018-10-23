import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Order from '../Order'
import StatsCounter from '../StatsCounter'
import AddOrderModal from '../AddOrderModal'
import OrderDetailModal from '../OrderDetalModal'

import styleModule from './OrderList.module.css'
import orderService from '../../lib/api/order'
import dishesService from '../../lib/api/dishes'

const styles = classNames.bind(styleModule)

class OrderList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orders: [],
      ordersLoading: true,
      dishes: [],
      dishesLoading: true,
      showCreateOrderModal: false,
      showDetailModal: false,
      orderSelected: {}
    }
  }
  componentDidMount () {
    this.getOrders()
    this.getDishes()
  }

  getOrders () {
    const { orderSelected } = this.state
    this.setState({
      ordersLoading: true
    })
    orderService.getAll()
      .then(orders => {
        const newOrderSelected = orderSelected
          ? orders.find(order => order._id === orderSelected._id)
          : {}
        this.setState({
          orders,
          orderSelected: newOrderSelected,
          ordersLoading: false
        })
      })
      .catch(error => {
        console.error('ERROR GET ORDERS', error)
        alert('Por favor recarga la pagina.') // eslint-disable-line
      })
  }

  getDishes () {
    dishesService.getAll()
      .then(dishes => {
        this.setState({ dishes, dishesLoading: false })
      })
      .catch(error => {
        console.error('ERROR GET DISHES', error)
        alert('Por favor recarga la pagina.') // eslint-disable-line
      })
  }

  handleOrderClick (order) {
    this.setState({
      showDetailModal: true,
      orderSelected: order
    })
  }

  render () {
    const { orders, ordersLoading, dishes, showCreateOrderModal, showDetailModal, orderSelected } = this.state
    return (
      <main className={styles('main')}>
        <header className={styles('columns', 'is-mobile')}>
          <div className='column is-half is-full-mobile'>
            <h1 className='is-size-5-mobile'>Ordenes</h1>
          </div>
          <div className='column is-half'>
            <button
              className={styles('button', 'is-rounded', 'is-pulled-right', 'addBtn')}
              onClick={() => this.setState({ showCreateOrderModal: true })}
            >
              <span className='icon'>
                <FontAwesomeIcon icon={[ 'fas', 'plus' ]} />
              </span>
              <span className='is-hidden-mobile'>Agregar orden</span>
            </button>
          </div>
        </header>
        {showCreateOrderModal &&
          <AddOrderModal
            onClose={() => this.setState({ showCreateOrderModal: false })}
            onCreate={this.getOrders.bind(this)}
            dishes={dishes}
          />
        }
        <section className='columns'>
          { showDetailModal &&
            <OrderDetailModal
              order={orderSelected}
              onClose={() => this.setState({ showDetailModal: false, orderSelected: {} })}
              onUpdate={this.getOrders.bind(this)}
            />
          }
          <article className='column is-three-fifths'>
            { ordersLoading && <section className='is-loading is-overlay' > x </section> }
            { orders.length <= 0 && <p className='has-text-white' > No hay ordenes... Pero puedes crear una ;) </p> }
            {!ordersLoading && orders.map((order, index) =>
              <Order
                key={order._id}
                order={order}
                index={++index}
                onUpdate={this.getOrders.bind(this)}
                onClick={this.handleOrderClick.bind(this, order)}
              />
            )}
          </article>
          <aside className={styles('column', 'is-hidden-mobile', 'is-centered', 'stats')}>
            <StatsCounter num={orders.length} title='Ordenes totales' />
          </aside>
        </section>
      </main>
    )
  }
}

export default OrderList
