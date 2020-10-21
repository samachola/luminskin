import { gql } from '@apollo/client';

export const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

export const PRODUCTS = ($priceCurrency) => gql`
	query GetProducts {
		products {
			id
			title
			image_url
			price (currency: USD)
		}
		currency
	}
`;