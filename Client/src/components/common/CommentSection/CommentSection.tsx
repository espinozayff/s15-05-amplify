import React, { useEffect, useState } from "react";
import { Comment } from "./CommentSection.types";
import generateRandomComments from "../../../data/comment/generateComments";
import { Link } from "react-router-dom";

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const randomComments = generateRandomComments(4);
    setComments(randomComments);
  }, []);
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center space-x-4 justify-start">
          <div className="flex-shrink-0">
            <div
              className="w-12 h-12 rounded-full overflow-hidden
             bg-gray-200 border-2 border-b-gray-300 flex items-center justify-center"
            >
              <img
                src={comment.userImage}
                alt={`${comment.userName}'s avatar`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div>
            <div className="mb-2">
              <p className="text-gray-100">{comment.content}</p>
            </div>
            <div className="text-sm text-gray-500 mt-2 flex items-center justify-start">
              <Link to="/#" className="mr-2 text-white font-bold text-sm">
                {comment.userName}
              </Link>
              <p className="font-semibold text-sm">hace {comment.date} días</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
