import { describe, test, expect } from 'vitest'
import { countMachine } from '../count/index.test'
import { createActor } from 'xstate'

class StatefulClass {
  private state: number
  private actor

  constructor(initialState: number = 0) {
    this.actor = createActor(countMachine).start()
    this.state = this.actor.getSnapshot().context.count
    console.debug('### StatefulClass constructor', this.state)
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

describe('StatefulClass', () => {
  const statefulClass = new StatefulClass()

  test('should be defined', () => {
    expect(statefulClass).toBeDefined()
  })

  test('should have a initial state', () => {
    expect(statefulClass.getState()).toBe(1)
  })

  test('should increment state', () => {
    statefulClass.increment()
    expect(statefulClass.getState()).toBe(2)
  })

  test('should decrement state', () => {
    statefulClass.decrement()
    expect(statefulClass.getState()).toBe(1)
  })

  test('should set state to 10', () => {
    statefulClass.setTen()
    expect(statefulClass.getState()).toBe(10)
  })
})
