const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio Management API',
      version: '1.0.0',
      description: 'API documentation for the Portfolio Management backend',
    },
    servers: [
      {
        url: 'http://localhost:6050',
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs (only route files)
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi }; 