import ProfileClient from "./_components/ProfileClient";
import { getProfile } from "@/lib/actions/user";

export default async function ProfilePage() {
  const result = await getProfile();

  if (result.status === "error") throw new Error(result.message);

  return <ProfileClient user={result.data} />;
}
