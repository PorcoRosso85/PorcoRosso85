/**
 * このディレクトリは、
 * 設計情報に基づいたDMLクエリを実装するための
 * 契約を定義するためのディレクトリです。
 */

import { states, DesignAddedDML } from '../../../infrastructure/config/constants'
import { stateModel } from '@PorcoRosso85/statemodel'
import path from 'path'

const queryFilePath = path.resolve(__dirname, 'query.design.sql')
const schemaFilePath = path.resolve(__dirname, 'schema.design.sql')
stateModel(states, { query: queryFilePath, schema: schemaFilePath })
