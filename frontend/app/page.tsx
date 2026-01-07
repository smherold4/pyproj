import Image from "next/image";

// frontend/app/page.tsx

type Counts = {
  total: Number;
  processed: Number;
};

async function getCounts(): Promise<Counts> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/queue_counts`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}

export default async function Home() {
  const counts = await getCounts();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Testing api calls
          </h1>

          <div>{`Processed ${counts.processed} outz of ${counts.total}`}</div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
