import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { GoVerified } from "react-icons/go";
import useStore from "../../../states/store/useStore";
import NoResults from "../home/NoResults";

interface IComment {
  comment: string;
  lenght?: number;
  id: string;
  postedBy: string;
}

interface CommentsProps {
  comment: string;
  comments: IComment[];
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  isPostingComment: boolean;
}

const Comments: React.FC<CommentsProps> = ({
  comment,
  comments,
  setComment,
  addComment,
  isPostingComment,
}) => {
  const { data: session } = useSession();
  const { allUsers } = useStore();

  return (
    <>
      <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]">
        <div className="overflow-scroll lg:h-[475px]">
          {comments?.length ? (
            comments.map((comment: any, idx: any) => (
              <>
                {allUsers.map(
                  (user: any) =>
                    user.id === comment.userId && (
                      <div className="p-2 items-center" key={idx}>
                        <Link href={`/profile/${user.id}`}>
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8">
                              <Image
                                src={user.image}
                                width={34}
                                height={34}
                                className="rounded-full"
                                alt="user profile"
                                layout="responsive"
                              />
                            </div>
                            <div className="hidden xl:block">
                              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                {user.name.replaceAll(" ", "")}
                                <GoVerified className="text-blue-400" />
                              </p>
                              <p className="capitalize text-gray-400 text-xs">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <p>{comment.body}</p>
                        </div>
                      </div>
                    )
                )}
              </>
            ))
          ) : (
            <NoResults text="No comments yet!" />
          )}
        </div>
        {session && (
          <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
            <form onSubmit={addComment} className="flex gap-4">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add Comment"
                className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outiline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
              ></input>
              <button onClick={addComment} className="text-md text-gray-400">
                {isPostingComment ? "Commenting..." : "Comment"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
