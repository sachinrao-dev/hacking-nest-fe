import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache(),
});

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      name
      email
      phone
      course
      message
      createdAt
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation CreateContact($input: ContactInput!) {
    createContact(input: $input) {
      success
      message
      contact {
        id
        name
        email
      }
    }
  }
`;