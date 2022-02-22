import { DataSource } from 'apollo-datasource'
import { Category, DBTypes, Location, Shelf } from '../../shelff-types'

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

  async getLocations(): Promise<Location[] | unknown> {
    try {
      const { rows } = await this.db.query('SELECT * FROM public.location')

      return rows as Location[]
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getShelves(): Promise<Shelf[] | unknown> {
    try {
      const { rows } = await this.db.query('SELECT * FROM public.shelf')

      return rows as Shelf[]
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default CatalogService
