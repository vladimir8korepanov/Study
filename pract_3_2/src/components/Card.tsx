import React from 'react';
import Button from './Button';

interface CardProps {
    title: string
    content: string
}

const Card: React.FC<CardProps> = ({ title, content }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <p className="text-gray-500 mb-4">{content}</p>
            <div className="flex space-x-6">
                <Button variant="primary">Primary action</Button>
                <Button variant="outline">Secondary action</Button>
            </div>
        </div>
    );
};

export default Card;