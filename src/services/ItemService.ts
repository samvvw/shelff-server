import { DataSource } from 'apollo-datasource'
import { DBTypes, Item } from '../../shelff-types'

class ItemService extends DataSource {
  db: DBTypes
  constructor(db: DBTypes) {
    super()
    this.db = db
  }

  async getItems(): Promise<Item[] | unknown> {
    try {
      const { rows } = await this.db.query(
        'SELECT i."itemId", i."itemName", i."creationDate", c."categoryName" FROM public.item i, public.category c WHERE i."categoryId" = c."categoryId"'
      )

      return rows as Item[]
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default ItemService
