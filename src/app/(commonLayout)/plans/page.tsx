import Link from "next/link";

async function getPublicPlans() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/travel-plans/public`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch travel plans");

  return res.json();
}

export default async function PlansPage() {
  const { data: plans } = await getPublicPlans();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Travel Plans</h1>

      {plans.length === 0 && (
        <p className="text-gray-500">No travel plans found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan: any) => (
          <div key={plan.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">
              {plan.destination}, {plan.city}
            </h2>

            <p className="text-gray-600">
              {new Date(plan.startDate).toLocaleDateString()} →{" "}
              {new Date(plan.endDate).toLocaleDateString()}
            </p>

            <p className="mt-1 text-gray-700">{plan.description}</p>

            <p className="mt-2 font-semibold">
              Traveler: {plan.owner?.fullName}
            </p>

            <Link
              href={`/profile/${plan.owner?.id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              View Profile →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
