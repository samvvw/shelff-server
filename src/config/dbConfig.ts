import { Pool } from 'pg'

const poolParams =
  process.env.NODE_ENV === 'development'
    ? {
        user: process.env.LOCAL_PG_USER,
        host: process.env.LOCAL_PG_HOST,
        database: process.env.LOCAL_PH_DATABASE_DEV,
        password: process.env.LOCAL_PG_PASSWORD,
        port: Number(process.env.LOCAL_PG_PORT as string),
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PH_DATABASE_DEV,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT as string),
      }

const client = new Pool(poolParams)

export default {
  query: (text: string, params?: string[]) => client.query(text, params),
}
