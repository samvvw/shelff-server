import { Item, ItemAction, ItemContext } from '../../shelff-types'

export const getItems = async (
  parent: undefined,
  args: undefined,
  { dataSources }: ItemContext
) => {
  const response: Item[] | unknown = await dataSources.itemService.getItems()
  return response
}

export const getItemActions = async (
  parent: undefined,
  args: undefined,
  { dataSources }: ItemContext
) => {
  const response: ItemAction[] | unknown =
    await dataSources.itemService.getItemActions()
  return response
}

export const addItem = async (
  parent: undefined,
  args: Item,
  { dataSources }: ItemContext
) => {
  const { itemId, itemName, categoryId } = args
  const response = await dataSources.itemService.addItem(
    itemId,
    itemName,
    categoryId
  )
  return response
}

export const updateItem = async (
  parent: undefined,
  args: Item,
  { dataSources }: ItemContext
) => {
  const { itemId, itemName, categoryId } = args
  const response = await dataSources.itemService.updateItem(
    itemId,
    itemName,
    categoryId
  )
  return response
}
