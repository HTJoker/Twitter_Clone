import { currentUser } from "@clerk/nextjs";
import { PostThread } from "@components/forms";
import { fetchUser } from "@lib/actions/user.actions";
import { redirect } from "next/navigation";

const CreateThread = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  console.log(userInfo);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
};

export default CreateThread;
