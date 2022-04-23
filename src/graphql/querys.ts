import { gql } from 'apollo-boost';

export default gql`
  query productsCategory($categoryName: String!) {
    category(input: { title: $categoryName }) {
      name
      products {
        id
        name
        inStock
        attributes {
          name
          items {
            id
            value
            displayValue
          }
        }
        gallery
        prices {
          currency {
            symbol
            label
          }
          amount
        }
      }
    }
  }
`;
export const getProductCategories = (categoryName: string) => gql`
  query {
    category((input: { title: "${categoryName}" })) {
      name
      products {
        id
        name
        inStock
        attributes {
          name
          items {
            id
            value
            displayValue
          }
        }
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
