import Image from "next/image";

interface Billionare {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const fetchData = async (id: string) => {
  const response = await fetch(
    `https://billions-api.nomadcoders.workers.dev/person/${id}`
  );
  return response.json();
};

export default async function Detail({
  params: { id },
}: {
  params: { id: string };
}) {
  const billionare: Billionare = await fetchData(id);

  return (
    <main>
      <Image
        className="w-32 bg-gray-100"
        src={billionare.squareImage}
        alt={billionare.name}
        width={300}
        height={300}
      />
      <div>{billionare.name}</div>
    </main>
  );
}
