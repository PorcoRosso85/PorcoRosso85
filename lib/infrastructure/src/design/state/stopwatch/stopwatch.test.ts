import { createMachine, assign, fromCallback, setup, createActor } from 'xstate'
import { beforeAll, describe, expect, test } from 'vitest'

export const stopwatchMachine = createMachine(
  {
    context: {
      elapsed: 0,
    },
    id: 'stopwatch',
    initial: 'stopped',
    states: {
      stopped: {
        on: {
          start: {
            target: 'running',
          },
        },
      },
      running: {
        invoke: {
          input: {},
          src: 'ticks',
        },
        on: {
          TICK: {
            actions: {
              type: 'inline:stopwatch.running#TICK[-1]#transition[0]',
            },
          },
          stop: {
            target: 'stopped',
          },
        },
      },
    },
    on: {
      reset: {
        target: '.stopped',
        actions: {
          type: 'inline:stopwatch#reset[-1]#transition[0]',
        },
      },
    },
    types: {
      events: {} as { type: 'start' } | { type: 'TICK' } | { type: 'stop' } | { type: 'reset' },
      context: {} as { elapsed: number },
    },
  },
  {
    actions: {
      'inline:stopwatch.running#TICK[-1]#transition[0]': assign({
        elapsed: ({ context }) => context.elapsed + 0.01,
      }),
      'inline:stopwatch#reset[-1]#transition[0]': assign({ elapsed: 0 }),
    },
    actors: {
      ticks: fromCallback(({ sendBack }) => {
        const interval = setInterval(() => {
          sendBack({ type: 'TICK' })
        }, 10)
        return () => clearInterval(interval)
      }),
    },
    guards: {},
    delays: {},
  },
)

const stopwatchActor = createActor(stopwatchMachine)
stopwatchActor.subscribe((snapshot) => {
  // outputEl.innerHTML = snapshot.context.elapsed.toString();
})
stopwatchActor.start()

/**
import './style.css';

import { stopwatchMachine } from './stopwatchMachine';
import { createActor } from 'xstate';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <output id="output"></output>
      <button id="start" type="button">start</button>
      <button id="stop" type="button">stop</button>
      <button id="reset" type="button">reset</button>
    </div>
  </div>
`;

const startButton = document.querySelector<HTMLButtonElement>('#start')!;
const stopButton = document.querySelector<HTMLButtonElement>('#stop')!;
const resetButton = document.querySelector<HTMLButtonElement>('#reset')!;
const outputEl = document.querySelector<HTMLDivElement>('#output')!;

const stopwatchActor = createActor(stopwatchMachine);
stopwatchActor.subscribe((snapshot) => {
  outputEl.innerHTML = snapshot.context.elapsed.toString();
});
stopwatchActor.start();

startButton.addEventListener('click', () => {
  stopwatchActor.send({ type: 'start' });
});

stopButton.addEventListener('click', () => {
  stopwatchActor.send({ type: 'stop' });
});

resetButton.addEventListener('click', () => {
  stopwatchActor.send({ type: 'reset' });
});
*/

describe('stopwatch state machine', () => {
  console.debug('machine configs...', stopwatchMachine.config.states)
  beforeAll(() => {
    // stopwatchActor.start()
  })

  describe('machineActor.subscribe', () => {
    test('should start in the stopped state', () => {
      stopwatchActor.subscribe((snapshot) => {
        console.debug('stopwatchActor.subscribe snapshot', snapshot)

        expect(snapshot.context.elapsed).toBeGreaterThanOrEqual(0)
        expect(snapshot.machine.getInitialSnapshot('', 'stopped').value).toBe('stopped')

        console.debug('actors object', snapshot.machine.implementations.actors.ticks.transition)
      })
    })
  })

  describe('machineActor.send', () => {
    test('should transition to running when the start event is sent', () => {
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'start' }))
    })
  })

  describe('context.elapsed', () => {
    test('should increment the elapsed time after 1 second', () => {
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'start' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))
      console.debug('stopwatchActor.send', stopwatchActor.send({ type: 'TICK' }))

      stopwatchActor.subscribe((snapshot) => {
        expect(snapshot.context.elapsed).toBeGreaterThanOrEqual(0.05)
      })
    })

    test('get elapsed time', () => {
      const elapsed = stopwatchActor.getSnapshot().context.elapsed
      console.debug('elapsed', elapsed)
    })

    test('should reset elapsed time', () => {
      stopwatchActor.send({ type: 'reset' })
      const elapsed = stopwatchActor.getSnapshot().context.elapsed
      console.debug('elapsed', elapsed)
      expect(elapsed).toBe(0)
    })
  })
})
