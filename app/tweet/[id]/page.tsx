export default async function Tweet({
  params: { id },
}: {
  params: { id: string };
}) {
  return <main>tweet id: {id}</main>;
}
