"use server";

import Thread from "@lib/models/thread.model";
import User from "@lib/models/user.model";
import { connectToDB } from "@lib/mongoose";
import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  userId: string;
  username: string;
  name: string;
  image: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  await connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), name, image, bio, onboarded: true },
      { upsert: true },
    );

    if (path === "/profile/edit") revalidatePath(path);
  } catch (error) {
    throw new Error(`Failed to update user: ${error}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
  } catch (error) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: User,
        select: "name image id",
      },
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error}`);
  }
}

export async function fetchAllUsers({
  userId,
  pageNumber = 1,
  pageSize = 20,
  searchString = "",
  sortBy = "desc",
}: {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  searchString?: string;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);
    const users = await usersQuery.exec();

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error}`);
  }
}

export async function getActivities(userId: string) {
  try {
    connectToDB();

    const userThreads = await Thread.find({ author: userId });

    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}
