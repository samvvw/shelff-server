import { DataSource } from 'apollo-datasource'
import { DBTypes, User } from '../../shelff-types'

class UserService extends DataSource {
  db: DBTypes
  constructor(db: DBTypes) {
    super()
    this.db = db
  }

  async getUser(userId: string): Promise<User> {
    const { rows } = await this.db.query(
      'SELECT * FROM public.user WHERE "userId"=$1',
      [userId]
    )

    return rows[0] as User
  }
}

export default UserService
