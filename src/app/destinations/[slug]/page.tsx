import Image from "next/image";
import { notFound } from "next/navigation";
import { destinations } from "@/data/destinations";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DestinationDetailsPage({ params }: Props) {
  const { slug } = await params;

  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    notFound();
  }

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <div className="relative h-[420px] w-full rounded-lg overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          //   className="object-cover"
          priority
        />
      </div>

      <div className="mt-8 space-y-4">
        <h1 className="text-4xl font-bold">
          {destination.name}, {destination.country}
        </h1>

        <p className="text-lg text-gray-700">{destination.description}</p>

        <div className="inline-block bg-blue-100 px-4 py-2 rounded-md">
          <strong>Best time:</strong> {destination.bestTime}
        </div>
      </div>
    </section>
  );
}
