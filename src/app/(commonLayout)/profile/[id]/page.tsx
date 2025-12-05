import { getUserProfile } from "@/lib/utils";

export default async function PublicProfilePage({ params }: any) {
  const data = await getUserProfile(params.id);
  const user = data.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={user.profileImage} className="w-32 h-32 rounded-full" />
      <h1 className="text-2xl font-semibold mt-4">{user.fullName}</h1>
      <p className="text-gray-600 mt-2">{user.bio}</p>

      <div className="mt-4">
        <h2 className="font-semibold mb-1">Visited Countries:</h2>
        <p>{user.visitedCountries?.join(", ") || "None"}</p>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold mb-1">Interests:</h2>
        <p>{user.interests?.join(", ") || "None"}</p>
      </div>

      <p className="mt-4">
        <span className="font-semibold">Current Location:</span>{" "}
        {user.currentLocation}
      </p>
    </div>
  );
}
