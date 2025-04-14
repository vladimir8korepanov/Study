import axios from 'axios';
import { z } from 'zod';

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export type Post = z.infer<typeof postSchema>;

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchPost = async (id: number): Promise<Post> => {
  const response = await api.get(`/posts/${id}`);
  return postSchema.parse(response.data);
};

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await api.get('/posts');
  return z.array(postSchema).parse(response.data);
};


// Схема для комментария
const commentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    body: z.string(),
  });
  
  export type Comment = z.infer<typeof commentSchema>;
  
  // Добавьте функцию для получения комментариев
  export const fetchComments = async (postId: number): Promise<Comment[]> => {
    const response = await api.get(`/posts/${postId}/comments`);
    return z.array(commentSchema).parse(response.data);
};