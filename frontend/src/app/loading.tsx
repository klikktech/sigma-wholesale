import { Card, Skeleton } from "@nextui-org/react";

const Loading = () => {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <Skeleton className="h-12 w-[500px] rounded-full" />
        </div>
        <Card>
            <div>Loading...</div>
        </Card>
      </div>
    </>
  );
};

export default Loading;
