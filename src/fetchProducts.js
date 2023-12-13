import { client } from "../tina/__generated__/client";

const fetchProducts = async (query) => {
  try {
    const productsResponse = await client.queries.productConnection({ query });
    const products = productsResponse.data.productConnection.edges.map(
      (edge) => edge.node,
    );
    return products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default fetchProducts