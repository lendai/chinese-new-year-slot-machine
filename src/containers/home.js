import React, { Component } from 'react'
import { easeInOutQuad } from 'easing-functions'
import { withSiteData } from 'react-static'
import glamorous from 'glamorous'
import Slot from 'react-slot-machine'

import animals from '../lib/animals'
import animalImages from '../lib/animal-images'

const AnimalImage = glamorous.img({
  maxWidth: '100%',
})

const actions = [
  'take a shot',
  'sing a song',
  'dance',
  'make a sound',
]

const multipliers = [
  'Nothing',
  'Nothing',
  '2x',
  '3x',
  'with everybody',
  'with someone you like',
]

function getRandom (list, current) {
  let next = current
  while (next === current) {
    next = Math.floor(Math.random() * list.length)
  }
  return next
}

const duration = 3000
const times = 2

const _SlotThing = ({ value }) => (
  <div style={{ fontSize: '24px' }}>
    {value}
  </div>
)

const _SlotAnimal = ({ value }) => (
  <div style={{ fontSize: '24px' }}>
    <AnimalImage src={animalImages[value]} alt={value} />
  </div>
)

const slotThingHoc = Comp => props => (<div style={{ width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',

  justifyContent: 'center' }}>
  <div style={{ alignSelf: 'flex-start' }} />
  <Comp {...props} />
  <div style={{ alignSelf: 'flex-end' }} />
</div>

)
const SlotThing = slotThingHoc(_SlotThing)
const SlotAnimal = slotThingHoc(_SlotAnimal)
class SlotMachine extends Component {
  state = {
    nextAnimal: 0,
    nextAction: 0,
    nextMultiplier: 0,

    animalSpinning: false,
    actionSpinning: false,
    multiplierSpinning: false,
  }

  onStartSpinning = () => {
    this.setState({
      nextAnimal: getRandom(animals, this.state.nextAnimal),
      nextAction: getRandom(actions, this.state.nextAction),
      nextMultiplier: getRandom(multipliers, this.state.nextMultiplier),
      animalSpinning: true,
      actionSpinning: true,
      multiplierSpinning: true,
    })
  }

  render () {
    const { animalSpinning, actionSpinning, multiplierSpinning } = this.state
    const allNotSpinning = !animalSpinning && !actionSpinning && !multiplierSpinning

    return (
      <div className="main-app">
        <div className="slot-items">
          <Slot className="slot" target={this.state.nextAnimal} duration={duration+3000} times={times}
            easing={easeInOutQuad}
            onEnd={() => {
              this.setState({ animalSpinning: false })
            }}>
            {animals.map(item => <SlotAnimal value={item} key={item} />)}
          </Slot>

          <Slot className="slot" target={this.state.nextAction} duration={duration} times={times}
            easing={easeInOutQuad}
            onEnd={() => {
              this.setState({ actionSpinning: false })
            }}>
            {actions.map(item =>
              <SlotThing value={item} key={item} />
            )}
          </Slot>

          <Slot className="slot" target={this.state.nextMultiplier} duration={duration+2000} times={times}
            easing={easeInOutQuad}
            onEnd={() => {
              this.setState({ multiplierSpinning: false })
            }}>
            {multipliers.map((item, i) =>
              <SlotThing value={item} key={i} />
            )}
          </Slot>
        </div>
        <button disabled={!allNotSpinning} onClick={() => { this.onStartSpinning() }} className="spin-button">
          Spin
        </button>
        <pre style={{ display: 'none' }}>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

export default withSiteData(() => (
  <div>
    <h1 style={{ textAlign: 'center' }}>New years spin</h1>

    <SlotMachine />
  </div>
))
