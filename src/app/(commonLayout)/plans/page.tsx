import Link from "next/link";
import { Calendar, MapPin, User, Plane, Clock, ArrowRight } from "lucide-react";

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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            All Travel Plans
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Discover amazing travel plans and find your perfect adventure companion
        </p>
      </div>

      {plans.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Plane className="w-10 h-10 text-blue-500" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No travel plans found</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Be the first to create one!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan: any) => {
          const startDate = new Date(plan.startDate);
          const endDate = new Date(plan.endDate);
          const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div
              key={plan.id}
              className="group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-6">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="font-bold text-2xl text-white mb-1 line-clamp-1">
                        {plan.destination}
                      </h2>
                      <p className="text-blue-50 text-sm font-medium flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {plan.city}
                      </p>
                    </div>
                    <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {duration}d
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Dates */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 dark:text-gray-400 text-xs font-medium">Travel Dates</p>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold">
                      {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {plan.description || "No description provided"}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                {/* Owner */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                      {plan.owner?.profileImage ? (
                        <img
                          src={plan.owner.profileImage}
                          alt={plan.owner.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Organized by</p>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {plan.owner?.fullName}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/profile/${plan.owner?.id}`}
                    className="group/btn px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
                  >
                    View
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
