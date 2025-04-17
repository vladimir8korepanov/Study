// Детали поста + комментарии
import { Card, Typography, Button } from 'antd';
import { Post } from '../api';
import CommentList  from './CommentsList';

const { Title, Paragraph } = Typography;

interface PostDetailsProps {
  post: Post | null;
  loading: boolean;
  error: Error | null;
  onBack: () => void;
}

const PostDetails = ({ post, onBack, error, loading, }: PostDetailsProps) => {
  if (loading) {
    return <div>Loading post details...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  if (!post) {
    return <div>No post selected</div>;
  }

  return (
    <div>    
        <Card
          title={`Пост #${post.id}`}
          bordered={false}
          extra={<Button onClick={onBack}>Вернуться назад</Button>}
        >
        <Title level={4}>{post.title}</Title>
        <Paragraph>{post.body}</Paragraph>
        <Paragraph type="secondary"> 
          Автор: пользователь #{post.userId}
        </Paragraph>
        </Card>

    <CommentList postId={post.id} />
    </div>

  );
};

export default PostDetails;
