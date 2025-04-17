// логика работы с комментариями
import { Button, List, Spin, Alert, Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchComments, Comment } from '../api';
import styles from './CommentsList.module.css';

const { Text } = Typography;

interface CommentsListProps {
  postId: number;
}

const CommentsList = ({ postId }: CommentsListProps) => {
  const {
    data: comments,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  if (isLoading) return <Spin />;
  if (isError) return <Alert message={error.message} type="error" />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text strong>Комментарии ({comments?.length})</Text>
        <div className={styles.refetchButton}> 
            <Button 
            onClick={() => refetch()}
            loading={isRefetching}
            type="primary"
            >
            Обновить комментарии/refetch
            </Button>
        </div>    
      </div>

      <List
        bordered
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item className={styles.commentItem}>
            <List.Item.Meta
              title={<Text>{comment.name} ({comment.email})</Text>}
              description={comment.body}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentsList;