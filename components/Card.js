import { useState } from "react";

export default function Card({ data, loading }) {
  const [showModal, setShowModal] = useState(false);
  if (loading) {
    return (
      <div className="p-4 bg-gray-200 rounded-md animate-pulse">
        <div className="h-4 w-1/4 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded mb-2"></div>
        <div className="h-16 w-full bg-gray-300 rounded mb-2"></div>

        <div className="mt-2 flex justify-between items-center">
          <div className="h-6 w-20 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }
  const {
    video_number,
    scene_number,
    scene_timestamp,
    upload_time,
    video_embedding: {
      conclusion,
      scene_description,
      severity_rating,
      prominent_items,
      people,
      actions,
    } = {},
  } = data || {};

  const stylesBasedOnSeverity = (rating) => {
    switch (true) {
      case rating > 8:
        return "bg-red-500 border-red-900"; 
      case rating > 5:
        return "bg-red-100 border-red-600"; 
      case rating > 3:
        return "bg-yellow-200 border-yellow-800"; 
      default:
        return "bg-green-100 border-green-800"; 
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
          showModal
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="overflow-y-auto w-2/3 h-4/5 bg-white p-6 rounded-lg">
          {/* <h2 className="text-2xl font-bold">Full Analysis</h2> */}
          <h3 className="text-xl font-semibold">
            Scene Number: {scene_number}
          </h3>
          <p className="mt-2">Timestamp: {scene_timestamp}</p>
          <p className="font-bold text-lg">Scene Description:</p>
          <p className="">{scene_description}</p>
          <p className="font-bold text-lg mt-2">Conclusion:</p>
          <p className="">{conclusion}</p>
          <p className="font-bold text-lg mt-2">Actions:</p>
          <p className="">{actions}</p>
          <p className="font-bold text-xl">Prominent Items: </p>
          {prominent_items.map((item, index) => (
            <p key={index}>
              {index + 1}. {item}
            </p>
          ))}
          <p className="font-bold text-xl">People: </p>
          {people.map((item, index) => (
            <p key={index}>
              {index + 1}. {item}
            </p>
          ))}
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-1/8 right-1/6 text-white px-4 py-2 rounded"
        >
          <img src="close_1.png" className="w-5 h-5" />
        </button>
      </div>

      <div
        className={`p-4 ${stylesBasedOnSeverity(
          severity_rating
        )} rounded-md border-l-4 ${data.borderColor} overflow-y-auto`}
      >
        <p>{scene_timestamp}</p>
        <p className="font-semibold text-lg">{conclusion.slice(0, 20)}...</p>
        <p>{scene_description.slice(0, 100)}</p>
        <div className="mt-2 flex justify-between items-center">
          <p
            className={`px-2 py-1 text-xs rounded ${data.severityBg} ${data.severityText}`}
          >
            Severity: {severity_rating}
          </p>
          <button onClick={() => setShowModal(true)}>Read More</button>
        </div>
      </div>
    </>
  );
}
