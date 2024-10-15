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
          <div className="flex flex-col pb-2 gap-4">
            <div className="flex w-full rounded-lg p-4 bg-default-50 justify-between">
              {Array(3)
                .fill(0)
                .map((col) => (
                  <Skeleton key={col} className="h-6 w-[150px] rounded-lg" />
                ))}
            </div>
            {Array(3)
              .fill(0)
              .map((row) => (
                <>
                  <div className="flex w-full justify-between py-2 px-5" key={row}>
                    {Array(3)
                      .fill(0)
                      .map((col) => (
                        <Skeleton
                          key={col}
                          className="h-6 w-[200px] rounded-lg"
                        />
                      ))}
                  </div>
                  <div className="flex w-full justify-between text-right py-2 px-5" key={row}>
                    {Array(3)
                      .fill(0)
                      .map((col) => (
                        <Skeleton
                          key={col}
                          className="h-6 w-[150px] rounded-lg"
                        />
                      ))}
                  </div>
                  <div className="flex w-full justify-between text-right py-2 px-5" key={row}>
                    {Array(3)
                      .fill(0)
                      .map((col) => (
                        <Skeleton
                          key={col}
                          className="h-6 w-[250px] rounded-lg"
                        />
                      ))}
                  </div>
                </>
              ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Loading;
