const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type Query {
		me: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): User
		login(email: String!, password: String!): User
	}

	type User {
		_id: ID
		username: String
		email: String
		bookCount: Int
		savedBooks: [Book]
	}

	type Book {
		bookId: ID
		authors: [String]
		description: String
		title: String
		image: String
		link: String
	}

	type Auth {
		token: ID!
		user: User
	}
`;

module.exports = typeDefs;
