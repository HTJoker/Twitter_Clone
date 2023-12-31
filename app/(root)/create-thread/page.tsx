import { currentUser } from "@clerk/nextjs";
import { PostThread } from "@components/forms";
import { fetchUser } from "@lib/controllers/user.actions";
import { redirect } from "next/navigation";

const CreateThread = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
};

export default CreateThread;
