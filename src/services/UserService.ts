import { DataSource } from 'apollo-datasource'
import { DBTypes, ItemEssential, User, UserItem } from '../../shelff-types'

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

  async getUserItems(userId: string): Promise<UserItem[] | unknown> {
    try {
      const { rows } = await this.db.query(
        `SELECT ui."itemId", ui."userId", ui."creationDate", ui."expirationDate", ui."quantity", l."locationName", s."shelfName", ui."isEssential" 
         FROM public."userItem" ui, public.location l, public.shelf s 
         WHERE ui."locationId" = l."locationId" AND ui."shelfId" = s."shelfId" 
         AND ui."userId" = $1`,
        [userId]
      )

      return rows as UserItem[]
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async addUser(
    userId: string,
    fullName: string,
    email: string
  ): Promise<User | unknown> {
    try {
      const { rows: users } = await this.db.query(
        'SELECT * FROM public.user WHERE "userId"=$1',
        [userId]
      )

      if (users.length > 0) {
        return users[0] as User
      }

      const response = await this.db.query(
        'INSERT INTO public.user ("userId", "fullName", "email") VALUES ($1, $2, $3)',
        [userId, fullName, email]
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

  async updateUser(userId: string, fullName: string): Promise<User | unknown> {
    try {
      console.log(userId, fullName)
      const response = await this.db.query(
        'UPDATE public.user SET "fullName"=$2 WHERE "userId"=$1',
        [userId, fullName]
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

  async addUserItem(
    userId: string,
    itemId: string,
    quantity: number,
    expirationDate: Date,
    locationId: number,
    shelfId: number,
    isEssential: boolean
  ): Promise<UserItem[] | unknown> {
    try {
      const response = await this.db.query(
        `INSERT INTO public."userItem" ("userId", "itemId", "quantity", "expirationDate", "locationId", "shelfId", "isEssential") 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          userId,
          itemId,
          quantity.toString(),
          expirationDate.toString(),
          locationId.toString(),
          shelfId.toString(),
          isEssential.toString(),
        ]
      )

      if (response) {
        const { rows } = await this.db.query(
          `SELECT ui."itemId", ui."userId", ui."creationDate", ui."expirationDate", ui."quantity", l."locationName", s."shelfName", ui."isEssential" 
           FROM public."userItem" ui, public.location l, public.shelf s 
           WHERE ui."locationId" = l."locationId" 
           AND ui."shelfId" = s."shelfId" 
           AND ui."userId" = $1`,
          [userId]
        )

        return rows as UserItem[]
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async addUserItemList(
    itemList: {
      userId: string
      itemId: string
      quantity: number
      expirationDate: Date
      locationId: number
      shelfId: number
      isEssential: boolean
    }[]
  ): Promise<UserItem[] | unknown> {
    const promiseSave = new Promise<UserItem[]>((resolve, reject) => {
      const savedItems: UserItem[] = []

      itemList.forEach(async (item, i) => {
        try {
          const {
            userId,
            itemId,
            quantity,
            expirationDate,
            locationId,
            shelfId,
            isEssential,
          } = item

          const newItem = (await this.addUserItem(
            userId,
            itemId,
            quantity,
            expirationDate,
            locationId,
            shelfId,
            isEssential
          )) as UserItem

          savedItems.push(newItem)
          if (i === itemList.length - 1) {
            resolve([newItem])
          }
        } catch (error) {
          console.log(error)
          reject(error)
        }
      })
      return savedItems
    })
    const result = await promiseSave
    return result[0]
  }

  async updateUserItem(
    userId: string,
    itemId: string,
    quantity: number,
    expirationDate: Date,
    locationId: number,
    shelfId: number
  ): Promise<UserItem | unknown> {
    try {
      const response = await this.db.query(
        `UPDATE public."userItem" 
         SET "quantity" = $3, "expirationDate" = $4, "locationId" = $5, "shelfId" = $6 
         WHERE "userId" = $1 AND "itemId" = $2`,
        [
          userId,
          itemId,
          quantity.toString(),
          expirationDate.toString(),
          locationId.toString(),
          shelfId.toString(),
        ]
      )

      if (response) {
        const { rows } = await this.db.query(
          `SELECT ui."itemId", ui."userId", ui."expirationDate", ui."quantity", l."locationName", s."shelfName" 
           FROM public."userItem" ui, public.location l, public.shelf s 
           WHERE ui."locationId" = l."locationId" 
           AND ui."shelfId" = s."shelfId" 
           AND ui."userId" = $1 AND ui."itemId" = $2`,
          [userId, itemId]
        )

        return rows[0] as UserItem
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteUserItem(
    userId: string,
    itemId: string
  ): Promise<boolean | unknown> {
    try {
      const query = await this.db.query(
        `SELECT * 
         FROM public."userItem" 
         WHERE "userId" = $1 AND "itemId" = $2`,
        [userId, itemId]
      )

      if (query && query.rows.length) {
        const response = await this.db.query(
          `DELETE FROM public."userItem" WHERE "userId" = $1 AND "itemId" = $2`,
          [userId, itemId]
        )

        if (response) return true
      }

      return false
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async removeEssentialItem(
    userId: string,
    itemId: string
  ): Promise<ItemEssential[] | unknown> {
    try {
      const query = await this.db.query(
        `SELECT * 
         FROM public."userEssentials" 
         WHERE "userId" = $1 AND "itemId" = $2`,
        [userId, itemId]
      )

      if (query && query.rows.length) {
        await this.db.query(
          `DELETE FROM public."userEssentials"
           WHERE "userId" = $1 AND "itemId" = $2`,
          [userId, itemId]
        )

        const { rows } = await this.db.query(
          `SELECT i."itemId", i."itemName", ui."creationDate", c."categoryName" 
        FROM public."userItem" ui, public."userEssentials" ue, public."item" i, public."category" c
        WHERE ui."itemId" = ue."itemId" AND ui."itemId" = i."itemId"
        AND i."categoryId" = c."categoryId"
        AND ui."userId" = $1
        AND ui."isEssential" = true
        AND ui."creationDate" IN (SELECT "creationDate"
        FROM public."userItem"
        WHERE "userId" = $1
        AND ui."itemId" = "itemId"
        ORDER BY "creationDate" DESC
        LIMIT 1)`,
          [userId]
        )

        return rows as ItemEssential[]
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default UserService
