/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

type ButtonVariant = 'primary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const baseStyles = css`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  line-height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const variantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #3d82f6;
        color: white;
        border: none;
        &:hover {
          background-color: #1347b7;
          transform: translateY(-1px);
        }
        &:active {
          transform: translateY(0);
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: #3d82f6;
        border: 1px solid #242b5d;
        &:hover {
          background-color: #9ddff1;
          border-color: #3d82f6;
        }
      `;
    default:
      return css``;
  }
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  return (
    <button
      css={[baseStyles, variantStyles(variant)]}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;