import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "product",
        label: "Products",
        path: "products",
        format: "json",
        fields: [
          {
            type: "string",
            name: "productName",
            label: "Product Name",
            required: true,
            default: "Default Product Name",
          },
          {
            type: "rich-text",
            name: "productDescription",
            label: "Product Description",
            default: "This is a default description for the product. Edit to add specific details.",
          },
          {
            type: "object",
            name: "imageUrls",
            label: "Image URLs",
            fields: [
              {
                type: "string",
                name: "image1",
                label: "Image 1 URL",
                default: "default-front-view-url.png",
              },
              {
                type: "string",
                name: "image2",
                label: "Image 2 URL",
                default: "default-back-view-url.png",
              },
              {
                type: "string",
                name: "image3",
                label: "Image 3 URL",
                default: "default-side-view-url.png",
              },
              {
                type: "string",
                name: "image4",
                label: "Image 4 URL",
                default: "default-detail-view-url.png",
              },
            ],
          },
          {
            type: "number",
            name: "minOrder",
            label: "Minimum Order",
            default: 1,
          },
          {
            type: "string",
            name: "types",
            label: "Types",
            list: true,
            default: ["Default Type 1", "Default Type 2"],
          },
          {
            type: "string",
            name: "availableSizes",
            label: "Available Sizes",
            list: true,
            default: ["Small", "Medium", "Large"],
          },
          {
            type: "boolean",
            name: "isBestSeller",
            label: "Is Best Seller?",
            default: false,
          },
        ],
      },
    ],

  },
});
