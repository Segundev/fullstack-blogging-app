const postProperties = {
    title: { type: 'string', minLength: 1, maxLength: 255 },
    content: { type: 'string', minLength: 1 },
    postStatus: { type: 'string', enum: ['DRAFT', 'PUBLISHED'] },
  };
  
  export const createPostSchema = {
    body: {
      type: 'object',
      required: ['title', 'content', 'postStatus'],
      properties: postProperties,
    },
  };
  
  export const updatePostSchema = {
    params: {
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid' },
      },
      required: ['postId'],
    },
    body: {
      type: 'object',
      properties: postProperties,
    },
  };
  
  export const getPostSchema = {
    params: {
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid' },
      },
      required: ['postId'],
    },
  };
  
  export const deletePostSchema = {
    params: {
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid' },
      },
      required: ['postId'],
    },
  };