"use server"
import Link from 'next/link';

export default async function NotFoundPage() {
  return (
    <div className="flex justify-center flex-col items-center">
      <p>Link Not found</p>
      <Link href="/" prefetch>return to homepage</Link>
    </div>
  )
}