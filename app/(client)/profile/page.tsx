import { auth } from "@/auth";
import ProfileLayout from "@/features/user/profile/components/profileLayout";

const ProfilePage = async () => {
    const session = await auth();
    if (!session) {
        throw new Error("User is not authenticated");
    }
    return <ProfileLayout userId={session.user.id} />;
};

export default ProfilePage;
