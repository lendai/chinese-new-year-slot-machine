import React from 'react'

import patrick from '../assets/patrick.png'

export default function Footer () {
  return (
    <div style={{ color: '#aaa', top: '1010px', left: 0, width: '100%', height: '198px', position: 'absolute', zIndex: 10 }}>
      <div style={{ padding: '20px' }}>
        <div style={{ width: '400px', float: 'left', paddingRight: '20px' }}>
          <p><strong>How to play</strong></p>
          <p>Just click the Spin button and make sure to follow the instructions you get from the slots. You can play every once in a while, the button will tell you when you can spin the slots next time.</p>
        </div>

        <div style={{ width: '400px', float: 'left', paddingRight: '20px' }}>
          <p><strong>Rules</strong></p>
          <p>You have to do what the game tells you to do. Otherwise you will die. Also please accept the fortune cookies.</p>
        </div>
      </div>

      <img src={patrick} alt="" className="patrick" />
    </div>
  )
}
