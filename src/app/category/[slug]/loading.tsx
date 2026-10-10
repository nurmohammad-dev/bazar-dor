const LoadingPage = () => {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-7xl grid-cols-1 gap-4 px-4 py-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-40 animate-pulse rounded-2xl bg-gray-200" />
      ))}
    </div>
  );
};

export default LoadingPage;
