import Image from "next/image";
import { getCounts } from "./utils/actions";
import { EnqueueJob } from "./EnqueueJob";

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

          <EnqueueJob initialCounts={counts} />
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row"></div>
      </main>
    </div>
  );
}
