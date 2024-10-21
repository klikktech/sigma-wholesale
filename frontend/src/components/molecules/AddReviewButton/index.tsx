import React, { useState } from "react";
import ReviewModal from "../ReviewModel";

const AddReviewButton = () => {
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
    return (
        <>
        <button className="bg-blue-500 text-white rounded-md p-2 my-4 flex items-center gap-2" onClick={openModal}>
            Add Review
            <span className="material-symbols-rounded">rate_review</span>
        </button>
              <ReviewModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default AddReviewButton;
