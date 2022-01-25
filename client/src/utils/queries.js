import { gql } from "@apollo/client";

export const GET_ME = gql`
	{
		me {
			username
			email
			savedBooks {
				authors
				description
				bookId
				image
				link
				title
			}
		}
	}
`;
