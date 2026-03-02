import ProfileClient from "./_components/ProfileClient";
import { getProfile } from "@/lib/actions/user";

export default async function ProfilePage() {
  const result = await getProfile();

  if (!result?.data) throw new Error("Something went wrong!");

  return <ProfileClient user={result.data} />;
}
