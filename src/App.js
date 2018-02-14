import React from 'react'
import { Router, Link } from 'react-static'
import glamorous from 'glamorous'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

import './app.css'

import backgroundImage from './assets/bg.png'

const AppStyles = glamorous.div({
  fontFamily:
    "'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  fontSize: '16px',
  margin: '0',
  padding: '0',
  '& a': {
    textDecoration: 'none',
    color: '#108db8',
    fontWeight: 'bold',
  },
  '& nav': {
    width: '100%',
    background: '#108db8',
    '& a': {
      color: 'white',
      padding: '1rem',
      display: 'inline-block',
    },
  },
  '& .content': {
    padding: '1rem',
  },
})

const App = () => (
  <Router>
    <AppStyles>
      <main className="content main">
        <Routes />
        <img src={backgroundImage} alt="" className="background-image" />
      </main>
    </AppStyles>
  </Router>
)

export default hot(module)(App)
