import NewUrlInput from "~/components/NewUrlInput";

export default async function HomePage() {
  return (
    <div className="mt-32 max-sm:mt-16 flex justify-center">
      <div className="w-1/2 max-sm:w-11/12">
        <NewUrlInput />
      </div>
    </div>
  );
}
