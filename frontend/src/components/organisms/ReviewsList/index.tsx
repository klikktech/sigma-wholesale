import ReviewCard from '@/components/molecules/ReviewCard';
import React from 'react';
import AddReviewButton from '@/components/molecules/AddReviewButton';

const reviews = [
    { name: 'John Doe', date: 'August 1, 2021', title: 'Great product', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', rating: 5 },
    { name: 'Jane Doe', date: 'August 1, 2021', title: 'Fantastic product', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', rating: 4 },
    { name: 'Robert Doe', date: 'August 1, 2021', title: 'Beautiful product', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', rating: 3 },
    { name: 'Mark Doe', date: 'August 1, 2021', title: 'Average product', description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.', rating: 2 },
];

const ReviewList = () => {
    return (
        <>
            <div className="flex my-2 justify-between items-center">
                <p className="text-2xl font-bold"> Reviews</p>
                <AddReviewButton />
            </div>
            <div className="min-h-screen">
                {reviews.map((review, index) => (
                    <ReviewCard
                        key={index}
                        name={review.name}
                        date={review.date}
                        title={review.title}
                        description={review.description}
                        rating={review.rating}
                    />
                ))}
            </div>
        </>
    );
};

export default ReviewList;
