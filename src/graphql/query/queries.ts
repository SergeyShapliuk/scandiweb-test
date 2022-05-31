import { gql } from '@apollo/client';

export const getProductCategory = (category: string) => gql`
  query {
    category(input:{title:"${category}"}) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const getProduct = (productId: string) => gql`
query {
  product(id:"${productId}") {
     id
     name
     inStock
     gallery
     description
     category
     attributes {
       id
       name
       type
       items {
         displayValue
         value
         id
       }
     }
     prices {
     currency{
      label
      symbol
    }
       amount
     }
     brand
   }
}
`;
