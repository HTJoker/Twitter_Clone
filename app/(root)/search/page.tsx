import { currentUser } from "@clerk/nextjs";
import { fetchAllUsers, fetchUser } from "@lib/actions/user.actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  //Todo: Fet All Users
  const result = await fetchAllUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  console.log(result);

  return (
    <section>
      <h1 className="head-text">Search</h1>
    </section>
  );
};

export default Page;
