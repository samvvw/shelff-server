import { QueryResult } from 'pg'
import UserService from './src/services/UserService'
import ItemService from './src/services/ItemService'

export interface User {
  userId: string
  userName: string
  email: string
  firstName: string
  lastName: string
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
  expirationDate: Date
  quantity: number
  locationId: number
  shelfId: number
}

export interface UserItemResolver {
  itemId: string
  userId: string
  expirationDate: Date
  quantity: number
  locationName: string
  shelfName: string
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

export type ShelfResult =
  | User
  | Item
  | UserItem
  | Category
  | Shelf
  | Location
  | ItemAction

export type ShelfQueryTypes = (
  text: string,
  params?: string[] | undefined
) => Promise<QueryResult<ShelfResult>>

export interface DBTypes {
  query: ShelfQueryTypes
}
