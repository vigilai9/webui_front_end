// dummy api remove in production with actual api

export async function GET(req) {
  const alerts = [
    {
      time: "12:45:32 PM",
      title: "Unauthorized Access Detected",
      description:
        "Individual attempting to access restricted area through south entrance.",
      severity: "CRITICAL",
      zone: "Zone B-4",
      bgColor: "bg-red-100", // Background color
      borderColor: "border-l-red-500", // Left border color
      severityBg: "bg-red-500", // Background color for severity label
      severityText: "text-white",
    },
    {
      time: "12:43:18 PM",
      title: "Suspicious Movement",
      description:
        "Repeated movement pattern detected near secure storage facilities.",
      severity: "HIGH",
      zone: "Zone A-2",
      bgColor: "bg-red-50",
      borderColor: "border-l-red-400",
      severityBg: "bg-orange-500",
      severityText: "text-white",
    },
    {
      time: "12:38:55 PM",
      title: "Unattended Object",
      description:
        "Package left unattended in main corridor for over 5 minutes.",
      severity: "MEDIUM",
      zone: "Zone C-1",
      bgColor: "bg-yellow-50",
      borderColor: "border-l-yellow-500",
      severityBg: "bg-yellow-500",
      severityText: "text-black",
    },
    {
      time: "12:32:07 PM",
      title: "Unusual Traffic Pattern",
      description:
        "Higher than normal foot traffic in east wing during off-hours.",
      severity: "LOW",
      zone: "Zone D-3",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
      severityBg: "bg-green-500",
      severityText: "text-white",
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Response(JSON.stringify(alerts), {
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
