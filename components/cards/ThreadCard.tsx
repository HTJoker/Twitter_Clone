import Link from "next/link";
import Image from "next/image";
import React from "react";

interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  createdAt,
  community,
  comments,
}: ThreadCardProps) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="profile pic"
                fill
                className="cursor-pointer rounded-full "
              />
            </Link>
            <div className="thread-card_bar"/>
          </div>
        </div>
      </div>
      <h2 className=" text-small-regular text-light-2">{content}</h2>
    </article>
  );
};

export default ThreadCard;
