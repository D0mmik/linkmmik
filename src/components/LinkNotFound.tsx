import { Link } from "@nextui-org/link";
import Navbar from "~/components/Navbar";

export default function LinkNotFound() {
  return(
    <>
      <Navbar/>
      <div className="flex justify-center flex-col items-center">
        <p>Link Not found</p>
        <Link href="/">return to homepage</Link>
      </div>
    </>
  )
}