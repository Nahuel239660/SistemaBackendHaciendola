const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Sistema Backend Haciendola',
      version: '1.0.0',
      description: 'Esta es una API creada para manejar autenticaciones y operaciones sobre productos.',
      contact: {
        name: 'Nahuel',
        url: '',
        email: 'nahuelpp2015@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js'], // paths to files with documentation
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
