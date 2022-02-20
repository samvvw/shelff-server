import { DataSource } from 'apollo-datasource'
import { Category, DBTypes } from '../../shelff-types'

class CatalogService extends DataSource {
  db: DBTypes
  constructor(db: DBTypes) {
    super()
    this.db = db
  }

  async getCategories(): Promise<Category[] | unknown> {
    try {
      const { rows } = await this.db.query('SELECT * FROM public.category')

      return rows as Category[]
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default CatalogService
