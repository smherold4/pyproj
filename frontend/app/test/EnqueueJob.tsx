"use client";

import { useState } from "react";
import { Counts, enqueueJob, getCounts } from "./utils/actions";

export function EnqueueJob(props: { initialCounts: Counts }) {
  const [result, setResult] = useState<number | null>(null);
  const [counts, setCounts] = useState<Counts>(props.initialCounts);

  return (
    <div>
      <form
        action={async () => {
          const data = await enqueueJob("test job 2");
          setResult(data?.jobId ?? null);
          const counts = await getCounts();
          setCounts(counts);
        }}
      >
        <button type="submit">Enqueue Job</button>

        <div>{result ? `Enqueued job ${result}` : "Job not enqueued"}</div>
        <br />
        <div>
          Processed {counts.processed} out of {counts.total}
        </div>
      </form>

      <hr />

      <form
        action={async () => {
          const counts = await getCounts();
          setCounts(counts);
        }}
      >
        <button type="submit">Refresh Counts</button>
      </form>
    </div>
  );
}
