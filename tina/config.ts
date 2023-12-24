import { Form, TinaCMS, defineConfig } from "tinacms";

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
        ui: {
          beforeSubmit: async ({
            values, // The current values of the form
          }: {
            form: Form,
            cms: TinaCMS,
            values: Record<string, any>
          }) => {
            return {
              ...values,
              slug: values.productName
                .toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, ''),
              layout: "../../layouts/ProductLayout.astro"
            }
          },
        },
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
            ui: {
              min: 1,
              max: 1,
            }
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
            label: "Slug (Optional)",
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout (Optional)",
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
      },
      {
        label: "Articles",
        name: "article",
        path: "/src/pages/articles",
        format: "md",
        ui: {
          beforeSubmit: async ({
            values, // The current values of the form
          }: {
            form: Form,
            cms: TinaCMS,
            values: Record<string, any>
          }) => {
            const words = values.title
              .toLowerCase()
              .replace(/[^\w\s-]+/g, '')
              .split(/\s+/)
              .slice(0, 2);  // Take only the first two words

            const slug = words.join('-');

            return {
              ...values,
              slug: slug,
              layout: "../../layouts/ArticleLayout.astro"
            }
          },
        },
        fields: [
          {
            label: "Title",
            name: "title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            label: "Publication Date",
            name: "date",
            type: "datetime"
          },
          {
            label: "Author",
            name: "author",
            type: "string"
          },
          {
            label: "Description",
            name: "description",
            type: "string"
          },
          {
            label: "Categories",
            name: "categories",
            type: "string",
            list: true
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true
          },
          {
            label: "Draft",
            name: "draft",
            type: "boolean"
          },
          {
            label: "Thumbnail",
            name: "thumbnail",
            type: "image"
          },
          {
            label: "Content",
            name: "body",
            type: "rich-text",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug (Optional)",
            required: true,
          },
          {
            type: "string",
            name: "layout",
            label: "Layout (Optional)",
            required: true,
          },
        ]
      }
    ],
  },
});
