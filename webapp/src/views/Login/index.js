
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styleModule from './Login.module.css'

const styles = classNames.bind(styleModule)

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      showError: false
    }
  }
  hanldeSumbit (event) {
    event.preventDefault()
    const { user } = this.state
    if (user) return this.props.history.push('/restaurant')
    this.setState({ showError: true })
  }

  handleInputChange ({ target }) {
    const { value, id } = target
    let stateChanges = { [id]: value }
    if (value) stateChanges = { ...stateChanges, showError: false }
    this.setState(stateChanges)
  }

  render () {
    return (
      <>
        {this.state.showError &&
          <div className={styles('column', 'is-full is-centered', 'error')}>
            <div className='columns is-centered'>
              <div className='column notification is-danger has-text-centered is-one-quarter'>
                Debes ingresar un nombre de usuario
              </div>
            </div>
          </div>
        }
        <section className={styles('hero', 'is-fullheight', 'background')}>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns is-centered is-multiline'>
                <div className='column is-one-third'>
                  <div className='box'>
                    <form>
                      <div className='columns is-centered is-multiline'>
                        <div className='column is-full has-text-centered'>
                          <FontAwesomeIcon icon={['fas', 'user-circle']} size='4x' />
                        </div>
                        <div className='column is-full'>
                          <input
                            id='user'
                            className='input is-medium'
                            placeholder='Usuario'
                            onChange={this.handleInputChange.bind(this)}
                          />
                          <div className='column is-full is-centered has-text-centered'>
                            <input
                              type='submit'
                              className='button is-black is-outlined'
                              value='Ingresar'
                              onClick={this.hanldeSumbit.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='column is-full has-text-centered'>
                  <a
                    className='button is-inverted'
                    href='https://github.com/devCharles/react-restaurant'
                    target='__balnk'
                  >
                    <span className='icon'>
                      <FontAwesomeIcon icon={['fab', 'github']} />
                    </span>
                    <span> Source code </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default withRouter(Login)
