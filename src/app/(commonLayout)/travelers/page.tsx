import Link from "next/link";
import { MapPin, Heart, Globe, User } from "lucide-react";

async function getUsers() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    cache: "no-store",
  });
  
  const data = await res.json();
  
  // Fetch full profile for each user to get interests and visitedCountries
  if (data?.data) {
    const usersWithDetails = await Promise.all(
      data.data.map(async (user: any) => {
        try {
          const profileRes = await fetch(
            `${process.env.NEXT_PUBLIC_API}/users/${user.id}`,
            { cache: "no-store" }
          );
          if (profileRes.ok) {
            const profileData = await profileRes.json();
            return profileData.data;
          }
        } catch (err) {
          console.error(`Failed to fetch profile for ${user.id}`, err);
        }
        return user;
      })
    );
    return { ...data, data: usersWithDetails };
  }
  
  return data;
}

export default async function ExplorePage() {
  const data = await getUsers();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
          Explore Travelers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with fellow travelers and find your perfect travel buddy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((user: any) => {
          // Parse interests and visitedCountries if they're strings
          const interests = Array.isArray(user.interests) 
            ? user.interests 
            : typeof user.interests === 'string' 
              ? user.interests.split(',').map((s: string) => s.trim()).filter(Boolean)
              : [];
          
          const visitedCountries = Array.isArray(user.visitedCountries)
            ? user.visitedCountries
            : typeof user.visitedCountries === 'string'
              ? user.visitedCountries.split(',').map((s: string) => s.trim()).filter(Boolean)
              : [];

          return (
            <Link
              key={user.id}
              href={`/profile/${user.id}`}
              className="group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Profile Header */}
              <div className="relative h-24 bg-gradient-to-br from-blue-500 to-cyan-500">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg overflow-hidden">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10" />
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="pt-12 px-6 pb-6 space-y-3">
                {/* Name */}
                <h2 className="font-bold text-xl text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {user.fullName}
                </h2>

                {/* Location */}
                {user.currentLocation && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>{user.currentLocation}</span>
                  </div>
                )}

                {/* Interests */}
                {interests.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Heart className="w-4 h-4 text-blue-500" />
                      <span>Interests</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {interests.slice(0, 3).map((interest: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800"
                        >
                          {interest}
                        </span>
                      ))}
                      {interests.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Visited Countries */}
                {visitedCountries.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Globe className="w-4 h-4 text-cyan-500" />
                      <span>Visited Countries</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {visitedCountries.slice(0, 3).map((country: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full border border-cyan-200 dark:border-cyan-800"
                        >
                          {country}
                        </span>
                      ))}
                      {visitedCountries.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                          +{visitedCountries.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* View Profile Link */}
                <div className="pt-2">
                  <span className="text-sm font-medium text-blue-600 dark:text-cyan-400 group-hover:underline">
                    View Profile →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {(!data?.data || data.data.length === 0) && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">No travelers found</p>
        </div>
      )}
    </div>
  );
}
