import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Order from '../Order'
import StatsCounter from '../StatsCounter'

import styleModule from './OrderList.module.css'
import orderService from '../../lib/api/order'

const styles = classNames.bind(styleModule)

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orders: [],
      ordersLoading: true
    }
  }
  componentDidMount () {
    this.getOrders()
  }

  getOrders () {
    orderService.getAll()
      .then(orders => {
        this.setState({ orders, ordersLoading: false })
      })
      .catch(error => {
        console.error('ERROR GET ORDERS', error)
      })
  }

  render () {
    const { orders, ordersLoading } = this.state
    return (
      <main className={styles('main')}>
        <header className={styles('columns', 'is-mobile')}>
          <div className='column is-half is-full-mobile'>
            <h1 className='is-size-5-mobile'>Ordenes</h1>
          </div>
          <div className='column is-half'>
            <button className={styles('button', 'is-rounded', 'is-pulled-right', 'addBtn')}>
              <span className='icon'>
                <FontAwesomeIcon icon={[ 'fas', 'plus' ]} />
              </span>
              <span className='is-hidden-mobile'>Agregar orden</span>
            </button>
          </div>
        </header>
        <section className='columns'>
          <article className='column is-three-fifths'>
            { ordersLoading && <section className='is-loading is-overlay' > x </section> }
            {!ordersLoading && orders.map((order, index) =>
              <Order order={order} index={++index} key={order._id} />
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

export default componentName
