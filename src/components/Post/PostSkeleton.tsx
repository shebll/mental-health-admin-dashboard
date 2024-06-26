const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md">
      <div className="">
        <div className="px-6 py-8 bg-secondary/15 shadow-md rounded-lg animate-pulse">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-secondary rounded-full mr-2"></div>
            <div className="h-4 bg-secondary rounded w-1/4"></div>
          </div>
          <div className="w-full h-20 bg-secondary mb-2 rounded"></div>
          <div className="h-4 bg-secondary rounded w-full mb-2"></div>
          <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
          <div className="flex justify-between items-center mt-2">
            <div className="h-4 bg-secondary rounded w-1/4"></div>
            <div className="h-4 bg-secondary rounded w-1/4"></div>
          </div>
        </div>
        <div className="px-6 py-2 h-8 bg-secondary/15 shadow-md rounded-lg animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2 mb-2 px-6 py-4 bg-secondary/15 shadow-md rounded-lg animate-pulse">
        <div className="flex flex-row items-center">
          <div className="w-8 h-8 bg-secondary rounded-full mr-2 animate-pulse"></div>
          <div className="h-3 bg-secondary rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="h-3 bg-secondary rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
