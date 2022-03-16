import { gql } from 'apollo-server'
import {
  addUser,
  updateUser,
  addUserItem,
  getUser,
  getUserItems,
  updateUserItem,
  deleteUserItem,
  addUserItemList,
  removeEssentialItem,
} from './controllers/userControllers'
import {
  getItems,
  findItem,
  getItemActions,
  addItem,
  updateItem,
  getEssentials,
} from './controllers/itemControllers'
import {
  getCategories,
  getLocations,
  getShelves,
} from './controllers/catalogControllers'

const typeDefs = gql`
  type User {
    userId: String!
    email: String!
    fullName: String!
    creationDate: String
  }

  type Item {
    itemId: String!
    itemName: String!
    creationDate: String
    categoryName: String!
  }

  type UserItem {
    itemId: String!
    userId: String!
    creationDate: String!
    expirationDate: String!
    quantity: Int!
    locationName: String!
    shelfName: String!
    isEssential: Boolean!
  }

  type Category {
    categoryId: Int!
    categoryName: String!
  }

  type Shelf {
    shelfId: Int!
    shelfName: String!
  }

  type Location {
    locationId: Int!
    locationName: String!
  }

  type ItemAction {
    itemActionId: Int!
    itemAction: String!
  }

  type ItemEssential {
    itemId: String!
    itemName: String!
    creationDate: String!
    categoryName: String!
    categoryId: Int!
  }

  input UserItemArgs {
    itemId: String
    userId: String
    quantity: Int
    expirationDate: String
    shelfId: Int
    locationId: Int
    isEssential: Boolean
  }

  type Query {
    locations: [Location]
    items: [Item]
    findItem(itemId: String!): Item
    categories: [Category]
    itemActions: [ItemAction]
    shelves: [Shelf]
    user(userId: String): User
    userItems(userId: String): [UserItem]
    essentials(userId: String): [ItemEssential]
  }

  type Mutation {
    addUser(userId: String, email: String, fullName: String): User
    updateUser(userId: String, fullName: String): User
    addItem(itemId: String, itemName: String, categoryId: Int): Item
    updateItem(itemId: String, itemName: String, categoryId: Int): Item
    addUserItem(
      itemId: String
      userId: String
      quantity: Int
      expirationDate: String
      shelfId: Int
      locationId: Int
      isEssential: Boolean
    ): [UserItem]
    addUserItemList(itemList: [UserItemArgs!]!): [UserItem]
    updateUserItem(
      itemId: String
      userId: String
      creationDate: String
      quantity: Int
      expirationDate: String
      shelfId: Int
      locationId: Int
      isEssential: Boolean
    ): UserItem
    deleteUserItem(
      itemId: String
      userId: String
      creationDate: String
    ): Boolean
    removeEssentialItem(itemId: String, userId: String): [ItemEssential]
  }
`

const resolvers = {
  Query: {
    user: getUser,
    locations: getLocations,
    items: getItems,
    findItem: findItem,
    userItems: getUserItems,
    categories: getCategories,
    shelves: getShelves,
    itemActions: getItemActions,
    essentials: getEssentials,
  },
  Mutation: {
    addUser: addUser,
    updateUser: updateUser,
    addItem: addItem,
    addUserItem: addUserItem,
    addUserItemList: addUserItemList,
    updateItem: updateItem,
    updateUserItem: updateUserItem,
    deleteUserItem: deleteUserItem,
    removeEssentialItem: removeEssentialItem,
  },
}

export { typeDefs, resolvers }
