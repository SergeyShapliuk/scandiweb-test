import { gql } from '@apollo/client';

export const getProductCategories = gql`
  query {
    categories {
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

// const getProductAttributes = itemName => gql`
//                 query {
//                   product(id: "${itemName}") {
//                     name
//                     gallery
//                     prices {
//                       amount
//                       currency{
//                           label
//                           symbol
//                       }
//                     }
//                     brand
//                   }
//                 }
//               `;
//

export const getCurrencies = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

// const getPrices = () => gql`
//   query {
//     category {
//       name
//       products {
//         name
//         id
//         prices {
//           currency {
//             label
//             symbol
//           }
//           amount
//         }
//       }
//     }
//   }
// `;
//
