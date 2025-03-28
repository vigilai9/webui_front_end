"use client";
import FileUpload from "@/components/FileUpload";
import Home from "../../page";

export default function Chat({ params }) {
  return (
    <>
      Hello dynamic chats {params.id}
      <FileUpload />
    </>
  );
}
