'use client';

import { useEffect, useState } from "react";

type ApiResponse = {
  message: string;
};

export default function Home() {
  const [data, setData] = useState<ApiResponse | null>(null);

  async function getData(): Promise<void> {
    const res = await fetch("/api/test");
    const data: ApiResponse = await res.json();

    console.log(data);
    setData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl">
        API message:{" "}
        <span className={data ? "text-green-400" : "text-amber-400"}>
          {data ? data.message : "LOADING"}
        </span>
      </h1>
    </div>
  );
}