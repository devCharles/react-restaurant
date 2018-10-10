import React, { Component } from 'react'
import classNames from 'classnames/bind'
import styleModule from './TablesList.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = classNames.bind(styleModule)

const tables = [
  {
    name: 'Mesa 1'
  },
  {
    name: 'Mesa 2'
  },
  {
    name: 'Mesa 3'
  },
  {
    name: 'Mesa 4'
  }
]

class TableList extends Component {
  render () {
    return (
      <section className='container'>
        {/* TODO: list tables here */}
        <div className='columns is-multiline is-centered '>
          { tables.map(table => (
            <div className={styles('column', 'is-2-mobile', 'box', 'table')} >
              <header className={styles('table-header')}>
                MESA {table.name}
              </header>
              <article>
                <FontAwesomeIcon icon={['fas', 'users']} />
              </article>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default TableList
