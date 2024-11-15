import LinkList from "~/components/LinkList";
import { Suspense } from "react";

export default async function Links() {

  return(
    <Suspense fallback={<div>Loading...</div>}>
      <LinkList/>
    </Suspense>
  )
}