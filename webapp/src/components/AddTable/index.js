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
      <section className='columns is-centered has-text-centered'>
        <div className='column '>
          rew
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
