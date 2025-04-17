import styles from './App.module.css';
import { useState } from 'react';
import { Spin, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchPost, fetchPosts } from './api';
import { PostsTable, PostDetails } from './components';

const App: React.FC = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Запрос для получения списка постов
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // Запрос для получения конкретного поста
  const {
    data: singlePost,
    isLoading: isSinglePostLoading,
    isError: isSinglePostError,
    error: singlePostError,
  } = useQuery({
    queryKey: ['post', selectedPostId],
    queryFn: () =>
      selectedPostId ? fetchPost(selectedPostId) : Promise.resolve(null),
    enabled: !!selectedPostId,
  });

  const handleViewDetails = (postId: number) => {
    setSelectedPostId(postId);
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
  };

  if (isPostsLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (isPostsError) {
    return (
      <Alert
        message="Ошибка загрузки"
        description={postsError?.message}
        type="error"
        showIcon
        className={styles.alertContainer}
      />
    );
  }

  return (
    <div className={styles.container}>
      {selectedPostId ? (
        <PostDetails
          post={singlePost || null}
          loading={isSinglePostLoading}
          error={isSinglePostError ? singlePostError : null}
          onBack={handleBackToList}
        />
      ) : (
        <PostsTable
          posts={posts || []}
          loading={isPostsLoading}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

export default App;
