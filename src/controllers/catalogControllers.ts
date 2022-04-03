import { Category, CatalogContext, Location, Shelf } from '../../shelff-types'

export const getCategories = async (
  parent: undefined,
  args: undefined,
  { dataSources }: CatalogContext
) => {
  const response: Category[] | unknown =
    await dataSources.catalogService.getCategories()
  return response
}

export const getLocations = async (
  parent: undefined,
  args: undefined,
  { dataSources }: CatalogContext
) => {
  const response: Location[] | unknown =
    await dataSources.catalogService.getLocations()
  return response
}

export const getShelves = async (
  parent: undefined,
  args: undefined,
  { dataSources }: CatalogContext
) => {
  const response: Shelf[] | unknown =
    await dataSources.catalogService.getShelves()
  return response
}
