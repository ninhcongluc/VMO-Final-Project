const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Project Management',
      version: '2.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [`${process.cwd()}/components/**/**API.js`],
};

module.exports = swaggerOptions;
