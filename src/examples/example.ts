// examples/example.ts
import { Collection } from "../services/collection/collect.service";

const xenteConfig = {
  apiKey: 'your-api-key',
};

const xente = new Collection(xenteConfig);

// Example: Make a payment
export const getPersonTest = () => { 
xente.getPerson('0705126596')
  .then((response) => console.log('Person fetched successful:', response))
  .catch((error) => console.error('Person not fetched:', error));
}
