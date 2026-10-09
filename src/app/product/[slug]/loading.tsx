const LoadingPage = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-green-500"></span>

        <p className="mt-4 text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;