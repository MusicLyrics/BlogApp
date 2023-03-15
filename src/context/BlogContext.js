import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'delete_blogpost':
        return state.filter(blogPost => blogPost.id !== action.payload);

    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
        ? action.payload
        : blogPost;
      }) 
        
    case 'add_blogpost':
      return [...state, 
        { 
            //added a id to could delete blogpost and let the app know which's one
            id: Math.floor(Math.random()* 99999), 
            title: action.payload.title,
            content: action.payload.Content
        }
    ];
    default:
      return state;
  }
};

//adding a new Blog Post
const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({ type: 'add_blogpost', payload: {title, content} });
    if(callback) {
      callback();
    }
  };
};

//Delete a Blog Post
const deleteBlogPost = dispatch => {
    return id => {
        dispatch({ type: 'delete_blogpost', payload: id })
    };
};

//Edit a Blog Post
const editBlogPost = dispatch => {
  return (id, title, content, callback ) => {
      dispatch({ 
        type: 'edit_blogpost', 
        payload: {id, title, content } 
      });
      if(callback) {
        callback();
      }
    };
  };

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost},
  [{ title: 'Test Post', content: 'Test Content', id: 1 }]
);