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
import { Context } from 'hono'
import { states } from './states'
export { states }

/**
 * この型は、設計を反映したオブジェクトを表現する型です。
 */
export interface Design {
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
