import { DataSource } from 'apollo-datasource'
import { DBTypes, User } from '../../shelff-types'

class UserService extends DataSource {
  db: DBTypes
  constructor(db: DBTypes) {
    super()
    this.db = db
  }

  async getUser(userId: string): Promise<User | unknown> {
    try {
      const { rows } = await this.db.query(
        'SELECT * FROM public.user WHERE "userId"=$1',
        [userId]
      )

      return rows[0] as User
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async addUser(
    userId: string,
    userName: string,
    email: string,
    firstName: string,
    lastName: string
  ): Promise<User | unknown> {
    try {
      const response = await this.db.query(
        'INSERT INTO public.user ("userId", "userName", "email", "firstName", "lastName") VALUES ($1, $2, $3, $4, $5)',
        [userId, userName, email, firstName, lastName]
      )

      if (response) {
        const { rows } = await this.db.query(
          'SELECT * FROM public.user WHERE "userId"=$1',
          [userId]
        )

        return rows[0] as User
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default UserService
