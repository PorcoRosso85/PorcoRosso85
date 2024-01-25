/**
 * このディレクトリは、
 * このディレクトリは、アプリケーションの構造を定義するためのディレクトリです。
 * 構造の定義に型を使用し、各種実装に制約を与えます。
 *
 * 具体的には、
 * ・設計構造
 * ・各アプリケーションレイヤー間の型契約
 * ・アプリケーション定数
 */
import { states } from './states'
import { authLoginStates, authLoginMachine } from './state'
export { states, authLoginStates, authLoginMachine }

/**
 * この型は、設計を反映したオブジェクトを表現する型です。
 */
export interface Design {
  id: string
  on?: {
    [event: string]:
      | {
          target: string
          cond?: string
          actions?: string[]
        }
      | string
  }
  initial?: string
  states?: {
    [subStateName: string]: Designs
  }
  description?: string
}

type Designs = {
  [stateName: string]: Design
}

// 1. 状態遷移の抽象化
interface StateTransitionFunction<S, E> {
  (state: S, event: E): S
}

// 2. 高階関数の定義
interface HigherOrderFunction<S, E> {
  (transitionFunction: StateTransitionFunction<S, E>): StateTransitionFunction<S, E>
}

// 3. イベントハンドラの統合
interface EventHandler<S, E> {
  (state: S, event: E): S
}

// 4. 状態管理のカプセル化
interface StateManager<S, E> {
  currentState: S
  transition(event: E): void
}

// 5. コンポジションの利用
interface ComposeTransition<S, E> {
  (
    first: StateTransitionFunction<S, E>,
    second: StateTransitionFunction<S, E>,
  ): StateTransitionFunction<S, E>
}
