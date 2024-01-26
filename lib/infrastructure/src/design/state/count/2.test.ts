import { describe, it, expect } from 'vitest'
import { createMachine, createActor } from 'xstate'

export const countMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QGMD2BXAdgFwLIENkALAS0zADoSIAbMAYgEkA5AYQG0AGAXUVAAdUsEthKpMfEAA9EARgBsAJgoBmABwB2ACwBOFVq2KNskwBoQAT0RrZFeRoCsnTus7ydWhw60BfP+cxUCDhJNCw8QlJySUFhUXFJGQQAWnlzKxT5fxAwnAJiMkpqOhihETEJJGlEQ3S5FwodJS01HW03I3ds3IiC8ipMZAAnMABbMBxIUriKxMRFHR1VRcXFB2MVPTc6hFkGprWVdSNFBcVZPz8gA */
    context: {
      count: 9,
    },
    id: 'countMachine',
    initial: 'idle',
    states: {
      idle: {
        on: {
          INC: {
            target: 'incremented',
            actions: {
              type: 'increment',
            },
          },
        },
      },
      incremented: {},
    },
    types: { events: {} as { type: 'INC' }, context: {} as { count: number } },
  },
  {
    actions: {
      increment: ({ context, event }) => {
        context.count++
      },
    },
    actors: {},
    guards: {},
    delays: {},
  },
)

describe('countMachine', () => {
  it('should increment', () => {
    const actor = createActor(countMachine).start()
    expect(actor.getSnapshot().value).toBe('idle')

    actor.send({ type: 'INC' })
    expect(actor.getSnapshot().value).toBe('incremented')
    expect(actor.getSnapshot().context.count).toBe(10)
  })
})
