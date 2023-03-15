import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;

    case 'delete_blogpost':
        return state.filter(blogPost => blogPost.id !== action.payload);

    case 'edit_blogpost':
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id
        ? action.payload
        : blogPost;
      }) 
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    //response.data === [{}, {}, {}]
    const respose = await jsonServer.get('/blogposts')
    
    dispatch ({ type: 'get_blogposts', payload: respose.data})
  };
}

//Create new Blog Post for now API
const addBlogPost = dispatch => {
  return async (title, content, callback) => {
          //BlogPost save on API
      await jsonServer.post('/blogposts', {title, content });
    // dispatch({ type: 'add_blogpost', payload: {title, content} });

    if(callback) {
        callback();
    }
  };
};

//Delete a Blog Post for now API
const deleteBlogPost = dispatch => {
    return async id => {
        await jsonServer.delete(`/blogPosts/${id}`);

        dispatch({ type: 'delete_blogpost', payload: id })
    };
};

//Edit a Blog Post for now API
const editBlogPost = dispatch => {
  return async (id, title, content, callback ) => {
    await jsonServer.put(`/blogPosts/${id}`, {title, content });
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
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts},
  []
);