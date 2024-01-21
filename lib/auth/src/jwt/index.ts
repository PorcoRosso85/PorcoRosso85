/**
 * jwt.ts
 * @packageDocumentation
 * @module @hono/jwt
 *
 * this file is for generating jwt token
 *
 */
import { decode, jwt, sign, verify } from 'hono/jwt'
import { env } from '@PorcoRosso85/core'
import { Jwt } from '..'

/**
 * jwt generate function
 */
const signNewJwtToken: Jwt['sign'] = async (payload) => {
  const mySecretKey = env.JWT_SECRET
  if (!mySecretKey) {
    if (!mySecretKey) {
      throw new Error('JWT_SECRET_KEY is not defined')
    }
    return await sign(payload, mySecretKey)
  }
}

const decodeJwtToken: Jwt['decode'] = async (token) => {}

export { signNewJwtToken }
