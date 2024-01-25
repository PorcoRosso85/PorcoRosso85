import { assign, fromCallback, setup, createActor, stop } from 'xstate'
import { beforeAll, describe, expect, test } from 'vitest'

export const stopwatchMachine = setup({
  actors: {
    ticks: fromCallback(({ sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: 'TICK' })
      }, 10)
      return () => clearInterval(interval)
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwC4HsAOB3AhigxgBYDEATnGCgNoAMAuoqBmrAJYqtoB2jIAHogAsAJgA0IAJ6IAjAHZhAOmmCAzNICs0gJxbBIlQDYAvkfGpMuAoQXmMGSMVQ5S1er2ZsO3XgITDZsgrqWiqyWtI0wuoG0bLiUn6RClrqKjQiBtIGWjGqJmbo2HhECqQArlxcrFxQxAAqAJIAwgDStAxIIB7snDydvoJJwiLCBjTqNLLZWgAc8Ygz0gqCOrOCMzOG6rIzxqYgtpYl5ZXVtbbt7iw93v2I-lrJNAajWdK7wiq68wgaioKpZ4zYRvMZaEz7LhoCBwXiHYqEK6eXo+RAAWgMPwx+QOhSO1ls9ggSJufVAvg0KiCIVk6kEBgMIi0zxUP206gUhi0smkKnUEyyglkOPhVlKFSqNRJXjJ-EQoQ5URoz3GakmnzZwOWgOBX2CehiEKMQA */
  id: 'stopwatch',
  initial: 'stopped',
  context: {
    elapsed: 0,
  },
  states: {
    stopped: {
      on: {
        start: 'running',
      },
    },
    running: {
      invoke: {
        src: 'ticks',
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: ({ context }) => context.elapsed + 0.01,
          }),
        },
        stop: 'stopped',
      },
    },
  },
  on: {
    reset: {
      actions: assign({
        elapsed: 0,
      }),
      target: '.stopped',
    },
  },
})

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
  console.debug('new test for stopwatch state machine')
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
})
