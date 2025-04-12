'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { css, cx } from '@/styled-system/css';

const buttonStyles = cva('button-base', {
  variants: {
    variant: {
      primary: 'button-primary',
      secondary: 'button-secondary',
      outline: 'button-outline',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const Button = ({
  variant,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>) => {
  return (
    <button
      className={cx(css({ // это css() из panda
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'lg',
        fontWeight: 'semibold',
        px: '2',
        py: '2',
        fontSize: 'sm',
        transition: 'colors',
        cursor: 'pointer',
        _disabled: { opacity: '0.5', cursor: 'not-allowed' },
      }), css(
        variant === 'primary'
          ? { bg: 'blue.500', color: 'white', _hover: { bg: 'blue.900' }, _active: {bg: 'blue.700'}, }
          : variant === 'secondary'
          ? { bg: 'gray.100', color: 'gray.800', _hover: { bg: 'gray.300' }, _active: { bg: 'gray.300' },}
          : { border: '1px solid', borderColor: 'gray.300', bg: 'green.300', _hover: { bg: 'gray.50'}, _active: { bg: 'gray.300'}, }
      ), className)}
      {...props}
    />
  );
};
