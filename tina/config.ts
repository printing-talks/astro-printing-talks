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
        path: "/src/pages/products",
        format: "md",
        fields: [
          {
            type: "string",
            name: "category",
            label: "Product Category",
            required: false,
            list: true,
            options: [
              {
                value: "Food Packaging",
                label: "Food Packaging",
              },
              {
                value: "Retail and Gifts",
                label: "Retail and Gifts",
              }, {
                value: "Marketing Materials",
                label: "Marketing Materials",
              }, {
                value: "Office Supplies",
                label: "Office Supplies",
              }, {
                value: "Speciality",
                label: "Speciality",
              }, {
                value: "Misc",
                label: "Misc",
              },
            ],
          },
          {
            type: "string",
            name: "productName",
            label: "Product Name",
            required: false,
          },
          {
            type: "string",
            name: "productDescription",
            label: "Product Description",
          },
          {
            type: "object",
            name: "imageUrls",
            label: "Image URLs",
            required: false,
            fields: [
              {
                type: "string",
                name: "image1",
                label: "Image 1 URL",
              },
              {
                type: "string",
                name: "image2",
                label: "Image 2 URL",
              },
              {
                type: "string",
                name: "image3",
                label: "Image 3 URL",
              },
              {
                type: "string",
                name: "image4",
                label: "Image 4 URL",
              },
            ],
          },
          {
            type: "number",
            name: "minOrder",
            label: "Minimum Order",
          },
          {
            type: "string",
            name: "types",
            label: "Types",
            required: false,
            list: true,
          },
          {
            type: "string",
            name: "availableSizes",
            label: "Available Sizes",
            list: true,
          },
          {
            type: "boolean",
            name: "isBestSeller",
            label: "Is Best Seller?",
            required: false,
          },
          {
            type: "string",
            name: "slug",
            label: "Product URL Slug",
            required: true,
          },
        ],
      },
      {
        "name": "testimonial",
        "label": "Testimonials",
        "path": "/testimonials",
        "format": "md",
        "fields": [
          {
            "name": "draft",
            "label": "Draft",
            "type": "boolean",
            "required": true,
            "description": "If this is checked the testimonial will not be published",
          },
          {
            "type": "string",
            "name": "author",
            "label": "Author",
            "required": false
          },
          {
            "type": "image",
            "name": "companyLogo",
            "label": "Company Logo URL",
          },
          {
            "type": "string",
            "name": "testimonialText",
            "label": "Testimonial Text",
            "required": false
          }
        ]
      }
    ],
  },
});
