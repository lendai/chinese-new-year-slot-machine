import React, { Component } from 'react'
import { easeInOutQuad } from 'easing-functions'
import { withSiteData } from 'react-static'
import glamorous from 'glamorous'
import Slot from 'react-slot-machine'
import moment from 'moment'

import animals from '../lib/animals'
import animalImages from '../lib/animal-images'
import genericCardImage from '../assets/generic-card.jpg'
import Footer from '../lib/footer'
import HeaderMarquee from '../lib/marquee'

const minutesToSeconds = minutes => 60 * minutes

const MIN_SECONDS_TO_NEXT_GAME = minutesToSeconds(3)
const MAX_SECONDS_TO_NEXT_GAME = minutesToSeconds(20)

function randomIntFromInterval (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const AnimalImage = glamorous.img({
  maxWidth: '100%',
})

const actions = [
  'take a shot',
  'sing a song',
  'dance your dance',
  'make your sound',
  'speak chinese',
  'get a tattoo',
]

const multipliers = [
  ' ',
  '  ',
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

// const duration = 1
const times = 3

const _SlotThing = ({ value }) => (
  <div className="generic-slot-thing">
    <img src={genericCardImage} alt="" className="generic-card-bg" />
    <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 1, transform: 'translate(-50%, -50%)' }}>{value}</div>
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
  <Comp {...props} />
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

  restartGame = () => {
    clearInterval(this.intervalId)
    this.resetSpinning()
    console.log('Time to restart the game!!!')
  }

  updateTimer = () => {
    console.log('update timer')
    const duration = moment.duration(moment().diff(this.nextGameAt))
    this.setState(state => ({
      ...state,
      humanTimeLeft: duration.humanize(),
    }))
  }

  startCountdown = () => {
    const secondsToNextGame = randomIntFromInterval(MIN_SECONDS_TO_NEXT_GAME, MAX_SECONDS_TO_NEXT_GAME)
    this.nextGameAt = moment().add(secondsToNextGame, 'seconds')
    console.log('The next game will start in ', secondsToNextGame)
    this.intervalId = setInterval(() => {
      this.updateTimer()
      if (moment().isAfter(this.nextGameAt)) {
        this.restartGame()
      }
    }, 1000)
  }

  resetSpinning = () => {
    this.setState({
      animalSpinning: false,
      actionSpinning: false,
      multiplierSpinning: false,
    })
  }

  onStartSpinning = () => {
    const nextAnimal = getRandom(animals, this.state.nextAnimal)
    const nextAction = getRandom(actions, this.state.nextAction)
    const nextMultiplier = getRandom(multipliers, this.state.nextMultiplier)

    console.log('Changing animal from', this.state.nextAnimal, ' to ', nextAnimal)
    console.log('Changing animal from', this.state.nextAction, ' to ', nextAction)
    console.log('Changing animal from', this.state.nextMultiplier, ' to ', nextMultiplier)

    this.setState({
      nextAnimal,
      nextAction,
      nextMultiplier,
      animalSpinning: true,
      actionSpinning: true,
      multiplierSpinning: true,
    })

    this.startCountdown()
  }

  render () {
    const { animalSpinning, actionSpinning, multiplierSpinning, humanTimeLeft } = this.state
    const allNotSpinning = !animalSpinning && !actionSpinning && !multiplierSpinning

    return (
      <div className="main-app">
        <div className="slot-items">
          <Slot className="slot" target={this.state.nextAnimal} duration={5000} times={times}
            easing={easeInOutQuad}>
            {animals.map(item => <SlotAnimal value={item} key={item} />)}
          </Slot>

          <Slot className="slot" target={this.state.nextAction} duration={2000} times={times}
            easing={easeInOutQuad}>
            {actions.map(item =>
              <SlotThing value={item} key={item} />
            )}
          </Slot>

          <Slot className="slot" target={this.state.nextMultiplier} duration={2000} times={times}
            easing={easeInOutQuad}>
            {multipliers.map((item, i) =>
              <SlotThing value={item} key={i} />
            )}
          </Slot>
        </div>
        <button disabled={!allNotSpinning} onClick={() => { this.onStartSpinning() }} className="spin-button">
          {allNotSpinning && 'Spin'}
          {!allNotSpinning && (
            <span>
              {humanTimeLeft && `Next spin in about ${humanTimeLeft}`}
              {!humanTimeLeft && 'Waiting...'}
            </span>
          )}
        </button>

      </div>
    )
  }
}

export default withSiteData(() => (
  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <HeaderMarquee />
    <SlotMachine />
    <Footer />
  </div>
))
