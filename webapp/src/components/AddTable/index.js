import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import uiActions from '../../redux/actions/ui'

class AddTable extends Component {
  componentDidMount () {
    this.props.setSectionName('Crear mesa')
  }

  render () {
    return (
      <section className='container'>
        <div className='columns is-centered has-text-centered'>
        <div className='column is-half is-full-mobile'>
          <form>
            <div className='columns is-multiline'>
              <div className='column is-full'>
                <span> Nombre de la mesa: </span>
              </div>
              <div className='column is-full'>
                <input type='text' className='input' />
              </div>
            </div>
          </form>
        </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps (state) {
  return {
    tables: state.table.existing
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setSectionName: bindActionCreators(uiActions.setSectionName, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTable)
