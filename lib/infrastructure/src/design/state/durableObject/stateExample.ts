import { describe, test, expect } from 'vitest'
import { countMachine } from '../count/index.test'
import { createActor } from 'xstate'

interface State {
  state: number
  actor: any
  increment: () => void
  decrement: () => void
  setTen: () => void
  getState: () => number
}

class ImplState implements State {
  state
  actor

  constructor(initialState: number = 0) {
    this.actor = createActor(countMachine).start()
    this.state = this.actor.getSnapshot().context.count
    console.debug('### ImplState constructor', this.state)
  }

  updateState() {
    this.state = this.actor.getSnapshot().context.count
  }

  increment() {
    this.actor.send({ type: 'INC' })
    this.updateState()
  }

  decrement() {
    this.actor.send({ type: 'DEC' })
    this.updateState()
  }

  setTen() {
    this.actor.send({ type: 'SET', value: 10 })
    this.updateState()
  }

  getState() {
    return this.state
  }
}

describe('ImplState', () => {
  const implState = new ImplState()

  test('should be defined', () => {
    expect(implState).toBeDefined()
  })

  test('should have a initial state', () => {
    expect(implState.getState()).toBe(1)
  })

  test('should increment state', () => {
    implState.increment()
    expect(implState.getState()).toBe(2)
  })

  test('should decrement state', () => {
    implState.decrement()
    expect(implState.getState()).toBe(1)
  })

  test('should set state to 10', () => {
    implState.setTen()
    expect(implState.getState()).toBe(10)
  })
})
