const Card = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="border rounded-lg shadow-lg overflow-hidden">
        <div className="aspect-video bg-gray-300 animate-pulse" />
        <div className="p-4">
          <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded mb-2" />
          <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  if (!data) {
    return null; // Handle case where data is null or undefined
  }

  if (!loading) {
    const getBorderColor = (severity) => {
      switch (severity) {
        case 0:
          return "yellow";
        case 1:
          return "green";
        case 2:
          return "red";
        default:
          return "gray";
      }
    };
    // Determine border color class based on severity
    const getBorderColorClass = (severity) => {
      switch (severity) {
        case 0:
          return "border-yellow-500";
        case 1:
          return "border-green-500";
        case 3:
          return "border-red-500";
        default:
          return "border-gray-500"; // Default border color class
      }
    };

    return (
      <div
        className={"border-8 mb-4 rounded-lg shadow-lg overflow-hidden"}
        style={{ borderColor: getBorderColor(data.severity) }}
      >
        <div className="aspect-video bg-gray-200">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">{data.title}</h3>
          <p className="text-gray-600">{data.description}</p>
        </div>
      </div>
    );
  }
};

export default Card;
