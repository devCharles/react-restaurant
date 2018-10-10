
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
      password: '',
      showError: false
    }
  }
  hanldeSumbit () {
    const { user, password } = this.state
    if (user && password) return this.props.history.push('/restaurant')
    this.setState({ showError: true })
  }

  handleInputChange ({ target }) {
    console.warn('target: ', target)
    const { value, id } = target
    this.setState({ [id]: value, showError: false })
  }

  render () {
    return (
      <section className={styles('hero', 'is-fullheight', 'background')}>
        <div className='hero-head'>
          <nav className='navbar'>
            <div className='container'>
              <div className='navbar-brand'>
                <a className={styles('navbar-item', 'logo')}>
                  <FontAwesomeIcon icon={['fab', 'react']} size='3x' />
                  Restaurant
                </a>
              </div>
              <div id='navbarMenuHeroA' className='navbar-menu'>
                <div className='navbar-end'>
                  <span className='navbar-item'>
                    <a 
                      className='button is-inverted'
                      href='https://github.com/devCharles/react-restaurant'
                      target='__balnk'
                    >
                      <span className='icon'>
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </span>
                      <span> Code </span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className='hero-body'>
          <div className='container has-text-centered'>
            <div className='columns is-centered is-multiline'>
              <span className='column is-full'>
                <FontAwesomeIcon icon={['fas', 'smile-beam']} size='4x' />
              </span>
              <span className='column is-full'>
                Usuario
              </span>
              <input
                id='user'
                type='text'
                className='column is-full-mobile is-one-third-tablet'
                onKeyUp={this.handleInputChange.bind(this)}
              />

              <span className='column is-full'>
                Contraseña
              </span>
              <input
                id='password'
                type='password'
                className='column is-full-mobile is-one-third-tablet'
                onKeyUp={this.handleInputChange.bind(this)}
              />
            </div>
            { this.state.showError &&
              <div className='columns is-centered is-multiline'>
                <div className='column is-full-mobile is-one-third-tablet'>
                  <div className='notification is-danger'>
                    Por favor ingresa tus credenciales
                  </div>
                </div>
              </div>
            }
            <div className='columns is-centered is-multiline'>
              <div className='column is-full-mobile is-one-third-tablet'>
                <input
                  type='submit'
                  value='Entrar'
                  className='button is-medium is-black is-fullwidth '
                  onClick={this.hanldeSumbit.bind(this)}
                />
              </div>
            </div>
            
          </div>
        </div>

      </section>
    )
  }
}

export default withRouter(Login)
