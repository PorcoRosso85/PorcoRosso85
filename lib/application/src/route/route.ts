// import { Bindings } from '@quantic/config'
import { Context, Env, Hono } from 'hono'
import { features, Features } from '@PorcoRosso85/application'

/**
 * featuresを受け取り、appを返す関数
 */
const createApp = <T extends Env>(app: Hono<T>, features: Features) => {
  // app.[method](feature.end, feature.handler)
  for (const [path, feature] of Object.entries(features)) {
    const method = feature.method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'
    feature.handler !== undefined
      ? app[method](feature.end, feature.handler)
      : app[method](feature.end, async (c: Context) => c.html('Hello World'))
  }

  return app
}

// const app = createApp(new Hono<{ Bindings: Bindings }>(), features);
const app = new Hono()
// app.get("/notfound", async (c: Context) => c.notFound());
app.notFound((c) => c.text('search me')).get('/', async (c: Context) => c.html('Hello World'))

export default app
