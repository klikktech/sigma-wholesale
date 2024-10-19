import { Card, User } from '@nextui-org/react';
import React from 'react';
import userIcon from '@/assets/user-icon.png'


interface ReviewProps {
    name: string;
    date: string;
    title: string;
    description: string;
    rating: number;
}

const ReviewCard: React.FC<ReviewProps> = ({ name, date, title, description, rating }) => {
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ?
                <span className="material-symbols-rounded text-3xl text-yellow-400" key={i}>
                    star
                </span> : <span className="material-symbols-rounded text-3xl text-gray-400" key={i}>
                    star_border
                </span>)
        }
        return stars
    };

    return (
        <Card className="p-4 mb-3">
            <div className="flex justify-between">
                <User avatarProps={{
                    // isBordered: true,
                    showFallback: true,
                    src: `${userIcon}`
                }}
                    className="transition-transform text-lg"
                    description={date}
                    name={name}
                />
                <div className="flex items-center mt-2">{renderStars(rating)}</div>
            </div>
            <div className="mt-2">
                <h4 className="text-lg font-bold">{title}</h4>
                <p className="text-gray-400">{description}</p>
            </div>
        </Card>
    );
};

export default ReviewCard;
