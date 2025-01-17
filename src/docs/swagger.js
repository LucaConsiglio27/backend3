const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Backend3 API",
    description: "API para gestión de usuarios, mascotas y adopciones.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:8080/api",
    },
  ],
  paths: {
    "/mocks/mockingpets": {
      get: {
        summary: "Generate mock pets",
        responses: {
          "200": {
            description: "Pets generated successfully",
          },
        },
      },
    },
    "/mocks/mockingusers": {
      get: {
        summary: "Generate mock users",
        responses: {
          "200": {
            description: "Users generated successfully",
          },
        },
      },
    },
    "/mocks/generateData": {
      post: {
        summary: "Generate mock data",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  users: {
                    type: "integer",
                    description: "Number of users to generate",
                  },
                  pets: {
                    type: "integer",
                    description: "Number of pets to generate",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Data generated and saved successfully",
          },
        },
      },
    },
    "/users/{uid}/documents": {
      post: {
        summary: "Upload user documents",
        parameters: [
          {
            name: "uid",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
            description: "User ID",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                properties: {
                  documents: {
                    type: "array",
                    items: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Documents uploaded successfully",
          },
        },
      },
    },
    "/loggerTest": {
      get: {
        summary: "Test logger functionality",
        responses: {
          "200": {
            description: "Logger tested successfully",
          },
        },
      },
    },
    "/pets": {
      get: {
        summary: "Get all pets",
        responses: {
          "200": {
            description: "List of pets",
          },
        },
      },
      post: {
        summary: "Create a new pet",
        responses: {
          "201": {
            description: "Pet created successfully",
          },
        },
      },
    },
    "/adoption": {
      get: {
        summary: "Get all adoptions",
        responses: {
          "200": {
            description: "List of adoptions",
          },
        },
      },
      post: {
        summary: "Create an adoption request",
        responses: {
          "201": {
            description: "Adoption request created successfully",
          },
        },
      },
    },
  },
};

export default swaggerDocument;
