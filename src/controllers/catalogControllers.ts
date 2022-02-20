import { Category, CatalogContext } from '../../shelff-types'

export const getCategories = async (
  parent: undefined,
  args: undefined,
  { dataSources }: CatalogContext
) => {
  const response: Category[] | unknown =
    await dataSources.catalogService.getCategories()
  return response
}
