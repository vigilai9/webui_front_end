import { useState } from "react";

export default function Card({ data, loading }) {
  const [showModal, setShowModal] = useState(false);
  if (loading) {
    return <p>Skeleton Loader....</p>;
  }

  const {
    video_number,
    scene_number,
    upload_time,
    video_embedding: {
      conclusion,
      scene_description,
      prominent_items,
      people,
      actions,
    } = {},
  } = data || {};

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black flex justify-center items-center">
          <div className="overflow-y-auto w-2/3 h-4/5 bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold">Full Analysis</h2>
            <h3 className="text-xl font-semibold">
              Scene Number: {scene_number}
            </h3>

            <p className="">{scene_description}</p>
            <p className="">{conclusion}</p>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
      <div className="bg-[#d4d6cb] p-8 rounded-xl">
        <p>Conclusion: {conclusion}</p>
        <button onClick={() => setShowModal(true)}>Read More</button>
      </div>
    </>
  );
}
