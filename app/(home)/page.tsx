import Image from "next/image";
import Link from "next/link";

interface Billionare {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

const fetchData = async () => {
  const response = await fetch("https://billions-api.nomadcoders.workers.dev/");
  return response.json();
};

export default async function Home() {
  const billionaries: Billionare[] = await fetchData();

  return (
    <main>
      <ul className="grid grid-cols-4">
        {billionaries
          .filter((b) => !b.squareImage.includes("undefined"))
          .map((b) => (
            <li key={b.id}>
              <Link href={`/person/${b.id}`}>
                <div>
                  <Image
                    className="w-full bg-gray-100"
                    src={b.squareImage}
                    alt={b.name}
                    width={300}
                    height={300}
                  />
                </div>
                <div>{b.name}</div>
                <div>
                  {b.netWorth} / {b.industries[0]}
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </main>
  );
}
