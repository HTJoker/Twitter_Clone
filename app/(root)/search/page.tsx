import { currentUser } from "@clerk/nextjs";
import { UserCard } from "@components/cards";
import { fetchUsers, fetchUser } from "@lib/actions/user.actions";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });


  return (
    <section>
      <h1 className="head-text">Search</h1>
      //Todo: Search Bar
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
              key={person.id}
              id={person.id}
              name={person.name}
              username={person.username}
              imgUrl={person.imgage}
              personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
