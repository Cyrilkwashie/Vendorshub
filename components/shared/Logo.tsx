import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image src="/logo.png" alt="VendorsHub" width={48} height={48} className="h-12 w-12 rounded-full object-cover" priority />
    </Link>
  );
}