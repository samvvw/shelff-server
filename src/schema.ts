import { gql } from 'apollo-server'
interface User {
  userId: string
  userName: string
  email: string
  firstName: string
  lastName: string
  creationDate: Date
}

interface Item {
  itemId: string
  itemName: string
  creationDate: Date
  categoryId: number
}
interface ItemResolver {
  itemId: string
  itemName: string
  creationDate: Date
  categoryName: string
}

interface UserItem {
  itemId: string
  userId: string
  expirationDate: Date
  quantity: number
  locationId: number
  shelfId: number
}

interface UserItemResolver {
  itemId: string
  userId: string
  expirationDate: Date
  quantity: number
  locationName: string
  shelfName: string
}

interface Category {
  categoryId: number
  categoryName: string
}

interface Shelf {
  shelfId: number
  shelfName: string
}

interface Location {
  locationId: number
  locationName: string
}

interface ItemAction {
  itemActionId: number
  itemAction: string
}

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

const getItems = () => {
  return [
    {
      itemId: '1346513461236',
      itemName: 'Test Item',
      creationDate: Date.now(),
      categoryName: 'Fruit',
    },
  ]
}

const resolvers = {
  Query: {
    locations: getLocations,
    items: getItems,
  },
}

export { typeDefs, resolvers }
