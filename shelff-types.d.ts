import { QueryResult } from 'pg'
import UserService from './src/services/UserService'
import ItemService from './src/services/ItemService'
import CatalogService from './src/services/CatalogService'

export interface User {
  userId: string
  fullName: string
  email: string
  creationDate: Date
}

export interface UserContext {
  dataSources: {
    userService: UserService
  }
}

export interface ItemContext {
  dataSources: {
    itemService: ItemService
  }
}

export interface CatalogContext {
  dataSources: {
    catalogService: CatalogService
  }
}

export interface Item {
  itemId: string
  itemName: string
  creationDate: Date
  categoryId: number
  categoryName: string
}

export interface ItemResolver {
  itemId: string
  itemName: string
  creationDate: Date
  categoryName: string
}

export interface UserItem {
  itemId: string
  userId: string
  creationDate: Date
  expirationDate: Date
  quantity: number
  locationId: number
  shelfId: number
  isEssential: boolean
}

export interface UserItemResolver {
  itemId: string
  userId: string
  creationDate: Date
  expirationDate: Date
  quantity: number
  locationName: string
  shelfName: string
  isEssential: boolean
}

export interface Category {
  categoryId: number
  categoryName: string
}

export interface Shelf {
  shelfId: number
  shelfName: string
}

export interface Location {
  locationId: number
  locationName: string
}

export interface ItemAction {
  itemActionId: number
  itemAction: string
}

export interface ItemEssential {
  itemId: string
  itemName: string
  creationDate: Date
  categoryName: string
  categoryId: number
}

export type ShelfResult =
  | User
  | Item
  | UserItem
  | Category
  | Shelf
  | Location
  | ItemAction
  | ItemEssential

export type ShelfQueryTypes = (
  text: string,
  params?: string[] | undefined
) => Promise<QueryResult<ShelfResult>>

export interface DBTypes {
  query: ShelfQueryTypes
}
