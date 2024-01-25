export { machine as authLoginMachine } from './loginMachine'
export { authLoginStates } from './loginStates'

export interface authContext {
  isSession: boolean
}

/**
 * status machine
 * contextを取得する
 */
export interface authStatusMachineContext extends authContext {}

/**
 * login machine
 * contextを更新する
 */
export interface authLoginMachineContext extends authContext {}
