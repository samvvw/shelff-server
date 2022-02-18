import { User, UserContext } from '../../shelff-types'

export const getUser = async (
  parent: undefined,
  args: User,
  { dataSources }: UserContext
) => {
  const response = await dataSources.userService.getUser(args.userId)
  console.log(response)
  return response
}
