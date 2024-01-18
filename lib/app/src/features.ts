import { TFeatures } from '@PorcoRosso85/core'

export const features: TFeatures = {
  '/': {
    end: '/',
    error: '',
    query: {},
    handler: async (c) => c.html('Hello World'),
  },
}
