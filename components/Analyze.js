import Card from "./Card";

const Analyze = ({ data, loading }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="p-4">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} loading={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {safeData.map((item) => (
            <Card key={item?.scene_number} loading={false} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Analyze;
