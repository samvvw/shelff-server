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
  const { userId, userName, email, firstName, lastName } = args
  const response = await dataSources.userService.addUser(
    userId,
    userName,
    email,
    firstName,
    lastName
  )
  return response
}
