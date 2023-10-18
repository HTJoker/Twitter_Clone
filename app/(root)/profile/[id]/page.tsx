import { currentUser } from "@clerk/nextjs";
import { ProfileHeader } from "@components/shared";
import { fetchUser } from "@lib/actions/user.actions";
import { redirect } from "next/navigation";

const Profile = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  console.log(userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.imageUrl}
        bio={userInfo.bio}
      />
    </section>
  );
};

export default Profile;
