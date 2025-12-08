import Image from "next/image";

const destinations = [
  {
    name: "Bali, Indonesia",
    image: "/destinations/bali.jpg",
  },
  {
    name: "Paris, France",
    image: "/destinations/paris.jpg",
  },
  {
    name: "Tokyo, Japan",
    image: "/destinations/tokyo.jpg",
  },
  {
    name: "Dubai, UAE",
    image: "/destinations/dubai.jpg",
  },
  {
    name: "Bangkok, Thailand",
    image: "/destinations/bangkok.jpg",
  },
  {
    name: "Sydney, Australia",
    image: "/destinations/sydney.jpg",
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular Destinations
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {destinations.map((item) => (
          <div
            key={item.name}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
