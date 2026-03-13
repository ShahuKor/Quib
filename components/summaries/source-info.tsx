export default function SourceInfo({ filename }: { filename: string }) {
  return (
    <p className="text-xs font-semibold sm:font-normal sm:text-md md:text-lg text-zinc-600 ">
      {filename}
    </p>
  );
}
