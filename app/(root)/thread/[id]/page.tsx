import { ThreadCard } from "@components/cards";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@lib/actions/user.actions";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@lib/actions/thread.actions";
import { Comment } from "@components/forms";

const page = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user?.id || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          createdAt={thread.createdAt}
          community={thread.community}
          comments={thread.comments}
        />
      </div>

      <div className="mt-7">
        <Comment
          threadId={thread.id}
          currentUserImage={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
    </section>
  );
};

export default page;
