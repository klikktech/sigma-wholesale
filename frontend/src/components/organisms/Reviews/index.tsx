import { reviewList } from "@/utils/constants";
import { Avatar } from "@nextui-org/react"

const reviews = reviewList
const Review = () => {
    return (<>
          {reviews.map((items) => (
            <div className="flex flex-col gap-1 my-5" key={items.name}>
              <div className="flex gap-4 items-center">
                <Avatar src={items.avatar} />
                <div className="">
                  <p>{items.name}</p>
                  <p className="text-xs">{items.timeStamp}</p>
                </div>
              </div>
              <div className="ml-1 flex items-center">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    className="material-symbols-rounded star"
                    key={`${items.name}-${rating}`}
                  >
                    star
                  </span>
                ))}
              </div>
              <div>{items.comments}</div>
            </div>
          ))}
    </>)
}
export default Review;