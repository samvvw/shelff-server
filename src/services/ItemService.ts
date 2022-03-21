import { DataSource } from 'apollo-datasource'
import { DBTypes, Item, ItemAction, ItemEssential } from '../../shelff-types'
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

  async findItem(itemId: string): Promise<Item | unknown> {
    try {
      const { rows } = await this.db.query(
        'SELECT i."itemId", i."itemName", i."creationDate", c."categoryName" FROM public.item i, public.category c WHERE i."itemId" = $1 AND i."categoryId" = c."categoryId"',
        [itemId]
      )

      return rows[0] as Item
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getItemActions(): Promise<ItemAction[] | unknown> {
    try {
      const { rows } = await this.db.query('SELECT * FROM public."itemAction"')

      return rows as ItemAction[]
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
      const { rows: results } = await this.db.query(
        'SELECT i."itemId", i."itemName", i."creationDate", c."categoryName" FROM public.item i, public.category c WHERE c."categoryId" = i."categoryId" AND "itemId"=$1',
        [itemId]
      )

      if (results?.length > 0) {
        return results[0] as Item
      }

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

  async getEssentials(userId: string): Promise<ItemEssential[] | unknown> {
    try {
      const { rows } = await this.db.query(
        `SELECT DISTINCT i."itemId", i."itemName", c."categoryName", c."categoryId"
        FROM public."userItem" ui, public."userEssentials" ue, public."item" i, public."category" c
        WHERE ui."itemId" = ue."itemId" 
        AND ui."itemId" = i."itemId"
        AND i."categoryId" = c."categoryId"
        AND ue."userId" = ui."userId"
        AND ue."userId" = $1`,
        [userId]
      )

      return rows as ItemEssential[]
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default ItemService
