import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@lib/controllers/user.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //Todo: getActivities
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((item) => (
              <Link key={item._id} href={`/thread/${item.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={item.author.image}
                    alt="pfp"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-primary-500">
                      {item.author.name}
                    </span>{" "}
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No Activity Yet!</p>
        )}
      </section>
    </section>
  );
};

export default Page;
