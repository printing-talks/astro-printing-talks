import { client } from "../tina/__generated__/client";

const fetchProducts = async () => {
  try {
    const productsResponse = await client.queries.productConnection();
    const products = productsResponse.data.productConnection.edges.map(
      (edge) => edge.node,
    );
    console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export default fetchProducts