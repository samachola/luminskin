import { gql } from '@apollo/client';

export const CURRENCIES = gql`
  query GetCurrencies {
    currency
  }
`;

export const PRODUCTS = gql`
	query Products($currency: Currency) {
		products {
			id
			title
			image_url
			price(currency: $currency)
		}
		currency
	}
`;