import { Link } from "@nextui-org/link";

export default function LinkNotFound() {
  return(
    <div className="flex justify-center flex-col items-center">
      <p>Link Not found</p>
      <Link href="/">return to homepage</Link>
    </div>
  )
}