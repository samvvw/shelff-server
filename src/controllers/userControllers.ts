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

export const updateUser = async (
  parent: undefined,
  args: User,
  { dataSources }: UserContext
) => {
  const { userId, fullName } = args

  const response = await dataSources.userService.updateUser(userId, fullName)

  return response
}

export const addUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const {
    userId,
    itemId,
    quantity,
    expirationDate,
    locationId,
    shelfId,
    isEssential,
  } = args
  const response = await dataSources.userService.addUserItem(
    userId,
    itemId,
    quantity,
    expirationDate,
    locationId,
    shelfId,
    isEssential
  )
  return response
}

export const addUserItemList = async (
  parent: undefined,
  args: { itemList: UserItem[] },
  { dataSources }: UserContext
) => {
  const response = await dataSources.userService.addUserItemList(args.itemList)

  return response
}

export const updateUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const {
    userId,
    itemId,
    creationDate,
    quantity,
    expirationDate,
    locationId,
    shelfId,
    isEssential,
  } = args
  const response = await dataSources.userService.updateUserItem(
    userId,
    itemId,
    creationDate,
    quantity,
    expirationDate,
    locationId,
    shelfId,
    isEssential
  )
  return response
}

export const deleteUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const { userId, itemId, creationDate } = args
  const response = await dataSources.userService.deleteUserItem(
    userId,
    itemId,
    creationDate
  )
  return response
}

export const removeEssentialItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources }: UserContext
) => {
  const { userId, itemId } = args
  const response = await dataSources.userService.removeEssentialItem(
    userId,
    itemId
  )
  return response
}
