import { gql } from 'apollo-boost';
import { Dispatch } from 'redux';

import { client } from '../components/AppoloClient';
import { setProduct } from '../store/mainReducer/mainReducer';

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
export const getProduct = (productId: string) => gql`
query {
  product(id: "${productId}") {
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
