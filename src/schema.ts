import { gql } from 'apollo-server'
import {
  addUser,
  addUserItem,
  getUser,
  getUserItems,
  updateUserItem,
  deleteUserItem,
} from './controllers/userControllers'
import {
  getItems,
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
    expirationDate: String!
    quantity: Int!
    locationName: String!
    shelfName: String!
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
  }

  type Query {
    locations: [Location]
    items: [Item]
    categories: [Category]
    itemActions: [ItemAction]
    shelves: [Shelf]
    user(userId: String): User
    userItems(userId: String): [UserItem]
    essentials(userId: String): [ItemEssential]
  }

  type Mutation {
    addUser(userId: String, email: String, fullName: String): User
    updateUser(fullName: String): User
    addItem(itemId: String, itemName: String, categoryId: Int): Item
    updateItem(itemId: String, itemName: String, categoryId: Int): Item
    addUserItem(
      itemId: String
      userId: String
      quantity: Int
      expirationDate: String
      shelfId: Int
      locationId: Int
    ): [UserItem]
    updateUserItem(
      itemId: String
      userId: String
      quantity: Int
      expirationDate: String
      shelfId: Int
      locationId: Int
    ): UserItem
    deleteUserItem(itemId: String, userId: String): Boolean
  }
`

const resolvers = {
  Query: {
    user: getUser,
    locations: getLocations,
    items: getItems,
    userItems: getUserItems,
    categories: getCategories,
    shelves: getShelves,
    itemActions: getItemActions,
    essentials: getEssentials,
  },
  Mutation: {
    addUser: addUser,
    addItem: addItem,
    addUserItem: addUserItem,
    updateItem: updateItem,
    updateUserItem: updateUserItem,
    deleteUserItem: deleteUserItem,
  },
}

export { typeDefs, resolvers }
