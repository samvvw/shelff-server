import { User, UserContext, UserItem } from '../../shelff-types'

export const getUser = async (
  parent: undefined,
  args: User,
  { dataSources }: UserContext
) => {
  const response = await dataSources.userService.getUser(args.userId)
  return response
}

export const getUserItems = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const response = await dataSources.userService.getUserItems(args.userId)
  return response
}

export const addUser = async (
  parent: undefined,
  args: User,
  { dataSources }: UserContext
) => {
  const { userId, fullName, email } = args
  const response = await dataSources.userService.addUser(
    userId,
    fullName,
    email
  )
  return response
}

export const addUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const { userId, itemId, quantity, expirationDate, locationId, shelfId } = args
  const response = await dataSources.userService.addUserItem(
    userId,
    itemId,
    quantity,
    expirationDate,
    locationId,
    shelfId
  )
  return response
}

export const updateUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const { userId, itemId, quantity, expirationDate, locationId, shelfId } = args
  const response = await dataSources.userService.updateUserItem(
    userId,
    itemId,
    quantity,
    expirationDate,
    locationId,
    shelfId
  )
  return response
}

export const deleteUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const { userId, itemId } = args
  const response = await dataSources.userService.deleteUserItem(userId, itemId)
  return response
}
