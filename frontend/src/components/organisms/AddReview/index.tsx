import { reviewList } from "@/utils/constants";
import { Avatar, Input, Textarea } from "@nextui-org/react"
import Reviews from "../Reviews";

const reviews = reviewList
const AddReview = () => {
    return (<>
    <div className="flex gap-4 mt-4">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="ml-1 flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <span className="material-symbols-rounded star" key={`review-${rating}`}>star</span>
            ))}
          </div>
          <Textarea
            label="Review"
            placeholder="Write your review"
            className="w-full"
          />
          <div className="flex gap-4">
            <Input
              className="w-full md:w-1/2"
              type="text"
              label="Name"
              placeholder="Enter your name"
            />
            <Input
              className="w-full md:w-1/2"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <Reviews />
        </div>
      </div>
    </>)
}
export default AddReview;