import { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const client = new Pool({
  user: process.env.LOCAL_PG_USER,
  host: process.env.LOCAL_PG_HOST,
  database: process.env.LOCAL_PH_DATABASE_DEV,
  password: process.env.LOCAL_PG_PASSWORD,
  port: Number(process.env.LOCAL_PG_PORT as string),
})

export default {
  query: (text: string, params?: string[]) => client.query(text, params),
}
