import { Pool } from 'pg'

const client = new Pool({
  //   user: 'postgres',
  //   host: 'localhost',
  //   database: 'shelff',
  //   password: 'sam123456',
  //   port: 5401,
  user: 'postgres',
  host: '35.171.223.156',
  database: 'shelff_dev',
  password: 'Sh3l11Db@2022',
  port: 5432,
})

export default {
  query: (text: string, params?: string[]) => client.query(text, params),
}
