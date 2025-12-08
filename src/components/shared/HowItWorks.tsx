import { UserPlus, MapIcon, Users } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Sign Up",
      description: "Create your account and set up your traveler profile.",
      icon: <UserPlus size={32} />,
    },
    {
      title: "Create Your Travel Plan",
      description:
        "Add destination, dates, budget, and your preferred travel type.",
      icon: <MapIcon size={32} />,
    },
    {
      title: "Find a Travel Buddy",
      description:
        "Match with travelers who share similar destinations and interests.",
      icon: <Users size={32} />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Start your journey in three easy steps—connect, plan, and explore!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {steps.map((step) => (
          <div
            key={step.title}
            className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4 text-primary">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
