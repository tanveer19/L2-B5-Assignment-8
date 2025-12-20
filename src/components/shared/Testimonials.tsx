export default function Testimonials() {
  const testimonials = [
    {
      name: "Aisha Rahman",
      location: "Bangladesh → Thailand",
      message:
        "I found an amazing travel buddy through this platform. We explored Phuket together and it was unforgettable!",
      image: "/images/testimonial1.jpg",
    },
    {
      name: "Michael Lee",
      location: "USA → Japan",
      message:
        "The matching system works great! I met someone with the same interests and we had a great time in Tokyo.",
      image: "/images/testimonial2.jpg",
    },
    {
      name: "Sara Ahmed",
      location: "UAE → Turkey",
      message:
        "Traveling alone felt scary, but this platform helped me find a friendly companion. Turkey was amazing!",
      image: "/images/testimonial3.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Thousands of travelers have already found companions for their dream
        trips!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* <div className="flex justify-center mb-4">
              <Image
                src={t.image}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div> */}

            <h3 className="text-lg font-semibold text-center">{t.name}</h3>
            <p className="text-sm text-center text-gray-500 mb-3">
              {t.location}
            </p>

            <p className="text-gray-700 text-center italic">“{t.message}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
