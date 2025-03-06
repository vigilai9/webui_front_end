const Card = () => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse w-100">
        {/* Skeleton for image */}
        <div className="w-full h-48 bg-gray-300" />
  
        {/* Skeleton for title */}
        <div className="w-3/4 h-6 bg-gray-300 mt-4 mx-4 rounded" />
  
        {/* Skeleton for description */}
        <div className="w-5/6 h-4 bg-gray-300 mt-2 mx-4 rounded" />
        <div className="w-4/6 h-4 bg-gray-300 mt-2 mx-4 rounded" />
      </div>
    );
  };
  
  export default Card;