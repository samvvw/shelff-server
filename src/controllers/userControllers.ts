import { User, UserContext, UserItem } from '../../shelff-types'
import { ForbiddenError } from 'apollo-server'

export const getUser = async (
  parent: undefined,
  args: User,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const response = await dataSources.userService.getUser(args.userId)
    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const getUserItems = async (
  parent: undefined,
  args: UserItem,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const response = await dataSources.userService.getUserItems(args.userId)
    return response
  } else {
    return []
  }
}

export const addUser = async (
  parent: undefined,
  args: User,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const { userId, fullName, email } = args
    const response = await dataSources.userService.addUser(
      userId,
      fullName,
      email
    )
    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const updateUser = async (
  parent: undefined,
  args: User,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const { userId, fullName } = args
    const response = await dataSources.userService.updateUser(userId, fullName)

    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const addUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources, user }: UserContext
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
  if (user) {
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
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const addUserItemList = async (
  parent: undefined,
  args: { itemList: UserItem[] },
  { dataSources, user }: UserContext
) => {
  if (user) {
    const response = await dataSources.userService.addUserItemList(
      args.itemList
    )

    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const updateUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources, user }: UserContext
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

  if (user) {
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
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const deleteUserItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const { userId, itemId, creationDate } = args
    const response = await dataSources.userService.deleteUserItem(
      userId,
      itemId,
      creationDate
    )
    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}

export const removeEssentialItem = async (
  parent: undefined,
  args: UserItem,
  { dataSources, user }: UserContext
) => {
  if (user) {
    const { userId, itemId } = args
    const response = await dataSources.userService.removeEssentialItem(
      userId,
      itemId
    )
    return response
  } else {
    throw new ForbiddenError('Not authenticated')
  }
}
