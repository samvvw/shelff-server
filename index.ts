import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import { TypeSource, IResolvers } from '@graphql-tools/utils'
import { typeDefs, resolvers } from './src/schema'
import db from './src/config/dbConfig'
import UserService from './src/services/UserService'
import ItemService from './src/services/ItemService'
import CatalogService from './src/services/CatalogService'
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { AuthenticationError } from 'apollo-server-express'

initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_ADMIN as string)),
})

const PORT = process.env.PORT

const startApolloServer = async (
  typeDefs: TypeSource,
  resolvers: IResolvers
) => {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (req.headers.authorization?.includes('Bearer ')) {
        const token = req.headers.authorization?.split(' ')[1]
        const user = await getAuth().verifyIdToken(token)
        if (user) {
          return {
            user: {
              userId: user.uid,
              userEmail: user.email,
            },
          }
        } else {
          throw new AuthenticationError('Not authenticated')
          // return null
        }
      } else {
        // throw new ApolloError('Not authenticated', '401sfsd')
        return null
      }
    },
    dataSources: () => ({
      userService: new UserService(db),
      itemService: new ItemService(db),
      catalogService: new CatalogService(db),
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  server.applyMiddleware({ app })

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  )

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
}

startApolloServer(typeDefs, resolvers)
