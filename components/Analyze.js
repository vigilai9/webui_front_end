import Card from "./Card";

const Analyze = ({ data, loading }) => {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <>
      <div>
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} loading={loading} data={data} />
          ))
        ) : (
          <div className="flex-1 overflow-y-auto p-4">
            {safeData.map((item) => (
              <Card key={item.id} loading={loading} data={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Analyze;
