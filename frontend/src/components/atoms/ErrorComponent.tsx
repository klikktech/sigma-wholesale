const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default ErrorComponent; 