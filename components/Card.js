export default function Card({ data, loading }) {
  if (loading) {
    return <p>Skeleton Loader....</p>;
  }

  return (
    <>
      <div className="bg-[#d4d6cb] p-8 rounded-xl">
        <p>{data?.video_embedding?.conclusion}</p>
      </div>
    </>
  );
}
