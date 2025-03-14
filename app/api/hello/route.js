export async function GET(req) {
  const videoAnalysisData = {
    "video_analysis": [
      {
        "description": "<h1>Incident Analysis</h1><h2>Abstract</h2><p>The video captures a series of events leading up to an altercation.</p><h2>Key Personalities</h2><ul><li><strong>Subject A (Black Hoodie, Blue Jeans):</strong> Observed pacing back and forth.</li><li><strong>Subject B (White Shirt, Black Pants):</strong> Initially seated, then suddenly stands up.</li><li><strong>Subject C (Red Jacket, Grey Pants):</strong> Seen interacting with Subject B before the event.</li></ul>",
        "start_time": "02:15:10",
        "end_time": "02:20:45",
        "level": 1,
        "brief": "Tension builds up before an argument breaks out.",
        "serial_no": 12,
        "images": [
          "https://via.placeholder.com/150/0000FF",
          "https://via.placeholder.com/150/FF0000"
        ]
      },
      {
        "description": "<h1>Incident Analysis</h1><h2>Abstract</h2><p>The video captures a series of events leading up to an altercation.</p><h2>Key Personalities</h2><ul><li><strong>Subject A (Black Hoodie, Blue Jeans):</strong> Observed pacing back and forth.</li><li><strong>Subject B (White Shirt, Black Pants):</strong> Initially seated, then suddenly stands up.</li><li><strong>Subject C (Red Jacket, Grey Pants):</strong> Seen interacting with Subject B before the event.</li></ul>",
        "start_time": "01:15:10",
        "end_time": "01:20:45",
        "level": 2,
        "brief": "Normal fight occured",
        "serial_no": 12,
        "images": [
          "https://via.placeholder.com/150/0000FF",
          "https://via.placeholder.com/150/FF0000"
        ]
      }
    ],
    "video_id": "camera_7_ab12cd34"
  };
   
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Response(JSON.stringify(videoAnalysisData), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

export async function POST(req) {
  const body = await req.formData();
  const file = body.get("video");
  if (!file) {
    return new Response(JSON.stringify({ message: "Video upload failed" }));
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(file);
  return new Response(
    JSON.stringify({
      message: "Video uploaded successfully",
      filePath: `/uploads/abc`,
    }),
    {
      headers: { "Content-Type": "application/json" },
      status: 201,
    }
  );
}
