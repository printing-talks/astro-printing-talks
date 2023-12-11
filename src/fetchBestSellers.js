import { client } from "../tina/__generated__/client";

const fetchBestSellers = async () => {
  try {
    const filter = {
      isBestSeller: { eq: true } // Adjusted filter structure
    };

    const productsResponse = await client.queries.productConnection({ filter });
    const products = productsResponse.data.productConnection.edges.map(
      (edge) => edge.node,
    );
    console.log(products);
    return products; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
};

export default fetchBestSellers;
