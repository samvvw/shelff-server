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
    dataSources: () => ({
      userService: new UserService(db),
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
