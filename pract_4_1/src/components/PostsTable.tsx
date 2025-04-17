// Только отображение таблицы
import { Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Post } from '../api';
import styles from './PostTable.module.css';

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
  onViewDetails: (postId: number) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  loading,
  onViewDetails,
}) => {
  const columns: ColumnsType<Post> = [
    { 
      title: 'ID', 
      dataIndex: 'id', 
      key: 'id',
      width: 80, 
      fixed: 'left' 
    },
    { 
      title: 'User ID', 
      dataIndex: 'userId', 
      key: 'userId', 
      width: 100 },
    { 
      title: 'Title', 
      dataIndex: 'title', 
      key: 'title',
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Button type="link" onClick={() => onViewDetails(record.id)}>
          Подробнее
        </Button>
      ),
    },
  ];

  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={posts}
      rowKey="id"
      loading={loading}
      pagination={{ 
        pageSize: 10,
        showSizeChanger: false,
      }}
      scroll={{ x:800}}
      bordered
    />
  );
};

export default PostsTable;
