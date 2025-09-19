import Image from "next/image";
import Link from "next/link";

type Props = Readonly<{ children: React.ReactNode }>;

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex max-w-md flex-col gap-6">
        <header className="flex flex-col items-center gap-2 self-center">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={512} height={512} className="size-14" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Utilities Tracker</h1>
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}
