export async function GET(req) {
  const data = [
    {
      id: 1,
      title: "Card 1",
      description: "This is the first card.",
      imageUrl: "https://via.placeholder.com/400",
      severity: 0
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is the second card.",
      imageUrl: "https://via.placeholder.com/400",
      severity: 1
    },
    {
      id: 3,
      title: "Card 3",
      description: "This is the third card.",
      imageUrl: "https://via.placeholder.com/400",
      severity: 2
    },
  ];
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Response(JSON.stringify(data), {
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
