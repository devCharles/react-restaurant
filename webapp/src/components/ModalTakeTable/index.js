import React, { Component } from 'react'

import Modal from '../Modal'

class ModalTakeTable extends Component {
  render () {
    const { onClose } = this.props
    return (
      <>
        <Modal
          title='Ingresa ocupantes'
        >
          <h1> TAKE TABLE </h1>
        </Modal>
      </>
    )
  }
}

export default ModalTakeTable
