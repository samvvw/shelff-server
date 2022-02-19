import { Item, ItemContext } from '../../shelff-types'

export const getItems = async (
  parent: undefined,
  args: undefined,
  { dataSources }: ItemContext
) => {
  const response: Item[] | unknown = await dataSources.itemService.getItems()
  return response
}
