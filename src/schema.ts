import { gql } from 'apollo-server'
import { addUser, getUser, getUserItems } from './controllers/userControllers'
import { getItems, addItem, updateItem } from './controllers/itemControllers'

const typeDefs = gql`
  type User {
    userId: String!
    userName: String!
    email: String!
    firstName: String!
    lastName: String!
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
    category: String!
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

  type Query {
    locations: [Location]
    items: [Item]
    categories: [Category]
    itemActions: [ItemAction]
    shelves: [Shelf]
    user(userId: String): User
    userItems(userId: String): [UserItem]
  }

  type Mutation {
    addUser(
      userId: String
      userName: String
      email: String
      firstName: String
      lastName: String
    ): User
    updateUser(userName: String, firstName: String, lastName: String): User
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

const getLocations = () => {
  return [{ locationId: 123, locationName: 'Test location' }]
}

const resolvers = {
  Query: {
    user: getUser,
    locations: getLocations,
    items: getItems,
    userItems: getUserItems,
  },
  Mutation: {
    addUser: addUser,
    addItem: addItem,
    updateItem: updateItem,
  },
}

export { typeDefs, resolvers }
