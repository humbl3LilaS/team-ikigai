import { auth } from "@/auth";

import { getUserData } from "../actions/get-user-data";
import { IUser } from "../userdata";

import ProfileDetails from "./profileDetails";

export default async function DetailPage() {
    const session = await auth();

    if (!session) {
        throw new Error("User is not authenticated");
    }

    const userinfo = (await getUserData(session.user.id)) as unknown as IUser;
    if (!userinfo) {
        throw new Error("User information could not be retrieved");
    }

    return <ProfileDetails userinfo={userinfo} />;
}
