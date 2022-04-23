import { gql } from '@apollo/client';

const getAllProducts = () => gql`
  query {
    category {
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

const getProductCategories = gql`
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

const getProductCategoriesName = () => gql`
  query getProductCategoriesName {
    category {
      name
    }
    categories {
      name
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
// const getProduct = productId => gql`
// query {
//   product(id: "${productId}") {
//     id
//     name
//     inStock
//     gallery
//     description
//     category
//     attributes {

//       name
//       items {
//         id
//         value
//         displayValue
//       }
//     }
//     prices {
//       amount
//       currency{
//           label
//           symbol
//       }
//     }
//     brand
//   }
// }
// `;

const getCurrencies = () => gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const getPrices = () => gql`
  query {
    category {
      name
      products {
        name
        id
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

export {
  getAllProducts,
  getProductCategories,
  getProductCategoriesName,
  // getProductAttributes,
  // getProduct,
  getCurrencies,
  getPrices,
};
