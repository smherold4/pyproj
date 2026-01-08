"use server";

export type Counts = {
  total: number;
  processed: number;
};

export async function getCounts(): Promise<Counts> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/queue_counts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch counts");
  return res.json();
}

type EnqueueResponseData = {
  jobId: number;
};

export async function enqueueJob(
  jobName: string
): Promise<EnqueueResponseData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enqueue`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: jobName }),
  });

  if (!res.ok) throw new Error("Failed to enqueue job");

  return res.json();
}
