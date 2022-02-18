import { Pool } from 'pg'
import { ShelfQueryTypes } from '../../shelff-types'

const poolParams =
  process.env.NODE_ENV === 'development'
    ? {
        user: process.env.LOCAL_PG_USER,
        host: process.env.LOCAL_PG_HOST,
        database: process.env.LOCAL_PG_DATABASE_DEV,
        password: process.env.LOCAL_PG_PASSWORD,
        port: Number(process.env.LOCAL_PG_PORT as string),
      }
    : {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE_DEV,
        password: process.env.PG_PASSWORD,
        port: Number(process.env.PG_PORT as string),
      }

const client = new Pool(poolParams)

const query: ShelfQueryTypes = (text: string, params?: string[]) =>
  client.query(text, params)

export default { query }
