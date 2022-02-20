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

  async addItem(
    itemId: string,
    itemName: string,
    categoryId: number
  ): Promise<Item | unknown> {
    try {
      const response = await this.db.query(
        'INSERT INTO public.item ("itemId", "itemName", "categoryId") VALUES ($1, $2, $3)',
        [itemId, itemName, categoryId.toString()]
      )

      if (response) {
        const { rows } = await this.db.query(
          'SELECT i."itemId", i."itemName", i."creationDate", c."categoryName" FROM public.item i, public.category c WHERE c."categoryId" = i."categoryId" AND "itemId"=$1',
          [itemId]
        )

        return rows[0] as Item
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updateItem(
    itemId: string,
    itemName: string,
    categoryId: number
  ): Promise<Item | unknown> {
    try {
      const response = await this.db.query(
        'UPDATE public.item SET "itemName" = $2, "categoryId" = $3 WHERE "itemId" = $1',
        [itemId, itemName, categoryId.toString()]
      )

      if (response) {
        const { rows } = await this.db.query(
          'SELECT i."itemId", i."itemName", i."creationDate", c."categoryName" FROM public.item i, public.category c WHERE c."categoryId" = i."categoryId" AND "itemId"=$1',
          [itemId]
        )

        return rows[0] as Item
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default ItemService
