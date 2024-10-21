import { Button, Card, Input, Spacer, Textarea } from "@nextui-org/react";
import { useState } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ReviewModal = ({ isOpen, onClose }: ModalProps) => {
    const [rating, setRating] = useState(0);

    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <Card className="rounded-lg p-6 w-full max-w-lg relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    &#10005;
                </button>
                <h2 className="text-xl font-semibold mb-4">Write a review</h2>
                <form>
                    <Input
                        label="Name*"
                        name="name"
                        placeholder="John king"
                        labelPlacement='outside'
                    />
                    <Spacer y={3} />

                    <div className="">
                        <label className="block text-sm mb-1">Rating</label>
                        {/* <div className="flex space-x-1">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <button key={index} className="text-yellow-500 text-3xl">
                    ★
                  </button>
                ))}
            </div> */}
                        <div className="flex space-x-1">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleStarClick(index)}
                                        className="text-yellow-500"
                                    >
                                        {index < rating ? <span className="material-symbols-rounded text-3xl text-yellow-400" key={index}>
                                            star
                                        </span> : <span className="material-symbols-rounded text-3xl text-gray-400" key={index}>
                                            star_border
                                        </span>}
                                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < rating ? 'currentColor' : 'none'}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-8 h-8"
                    >
                      <path
                        d={
                          index < rating
                            ? 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
                            : 'M12 2l2.09 6.26L22 9.24l-5.46 4.73L18.18 21 12 17.27 5.82 21l1.64-7.03L2 9.24l7.91-.98L12 2zm0 15.4l3.76 2.27-.99-4.28 3.32-2.88-4.38-.36L12 7.5 10.29 9.15l-4.38.36 3.32 2.88-.99 4.28L12 17.4z'
                        }
                      />
                    </svg> */}
                                    </button>
                                ))}
                        </div>
                    </div>
                    <Spacer y={3} />

                    <Input
                        label="Title*"
                        name="title"
                        placeholder="Title"
                        labelPlacement='outside'
                    />
                    <Spacer y={3} />

                    <Textarea
                        label="Comment"
                        name="comment"
                        placeholder="Enter your comment"
                        labelPlacement='outside'
                        fullWidth
                    />
                    <Spacer y={3} />

                    <div className="w-full flex justify-center">
                        <Button className="text-center" color="primary">
                            Send review
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ReviewModal;
