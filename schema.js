import graphql from "graphql"
import lodash from "lodash"
import { allUsers, getUser } from "./database/database.js"

const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql

const userType = new GraphQLObjectType({
    name: "user",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        user_name: { type: GraphQLString },
        role_id: { type: GraphQLInt },
        user_id: { type: GraphQLInt },
    })

})


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: userType,
            args: { id: { type: GraphQLInt } },
            async resolve(parent, args) {
                return await allUsers()
            }
        },
        users: {
            type: new GraphQLList(userType),
            async resolve() {
                return await allUsers()
            }
        }
    }
})

export default new GraphQLSchema({ query: RootQuery })