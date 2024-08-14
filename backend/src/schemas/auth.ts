export const registerSchema = {
    description: 'Register a new user',
    tags: ['authentication'],
    security: [{ bearerAuth: [] }],
    body: {
      type: 'object',
      required: ['fullname', 'username', 'email', 'password'],
      properties: {
        fullname: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          password: { type: 'string' },
          fullname: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
        },
      },
    }
  };
  
  export const loginSchema = {
    description: 'Login a new user',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          password: { type: 'string' },
          email: { type: 'string' },
        },
      },
    }
  };