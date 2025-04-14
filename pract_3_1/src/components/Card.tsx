import styles from '../styles/Card.module.css';
import { Button } from '@/components/Button';
import { css, cx } from '@/styled-system/css';


interface CardProps {
  title: string;
  content: string;
}

export const Card = ({ title, content }: CardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.content}>{content}</p>
    
      <div 
        className={cx(css({
        display: 'flex',
        gap: '3',
        mt: '4',
        })
        )}
      >
        <Button variant="primary">Подробнее</Button>
        <Button variant="secondary">Отмена</Button>
        <Button variant="outline">Редактировать</Button>
      </div>
    </div>
  );
};

export default Card;
