import { auth } from "@/auth";
import ProfileDetails from "@/features/user/details/components/profile-details";

export default async function ProfilePage() {
    const session = await auth();
    if (!session) throw new Error("User is not authenticated");

    return <ProfileDetails userid={session.user.id} />;
}
