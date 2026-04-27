import Link from "next/link";

export default function UserButtonCustom() {
  return (
    <Link href={"/profile"}>
      <div className=" text-neutral-800 text-md">My Account</div>
    </Link>
  );
}
