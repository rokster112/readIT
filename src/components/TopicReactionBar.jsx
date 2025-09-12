import brokenHeart from "../assets/broken-heart.png";
import brokenHeartFilled from "../assets/broken-heart-filled.png";
import heart from "../assets/heart.png";
import heartFilled from "../assets/heart-filled.png";
import { useState } from "react";
import commentBubble from "../assets/comment-bubble.png";
import { safeApiCall } from "../services/HomeService";
import { UpdateLikeDislike } from "../services/TopicSingleService";
import { useNavigate } from "react-router-dom";
export default function TopicReactionBar({ t, userId = false }) {
  const [error, setError] = useState(false);
  const [totalLikes, setTotalLikes] = useState(t.like - t.dislike);
  const [selectedReaction, setSelectedReaction] = useState({
    like: t?.likedBy?.includes(userId),
    dislike: t?.dislikeBy?.includes(userId),
  });
  const navigate = useNavigate();

  function redirect() {
    if (!userId) {
      navigate("/login", { state: "You are not logged in" });
      return true;
    }
    return false;
  }

  async function handleLike(id) {
    if (redirect()) return;

    const nextReaction = selectedReaction.like ? null : "like";
    setSelectedReaction({ like: nextReaction === "like", dislike: false });

    const { data, error } = await safeApiCall(() =>
      UpdateLikeDislike(id, { reaction: nextReaction })
    );
    if (error) return setError(error);

    setTotalLikes(data.like - data.dislike);
  }

  async function handleDislike(id) {
    if (redirect()) return;

    const nextReaction = selectedReaction.dislike ? null : "dislike";
    setSelectedReaction({ dislike: nextReaction === "dislike", like: false });

    const { data, error } = await safeApiCall(() =>
      UpdateLikeDislike(id, { reaction: nextReaction })
    );
    if (error) return setError(error);

    setTotalLikes(data.like - data.dislike);
  }

  return (
    <div className="flex flex-row items-center gap-2 mt-4">
      <div className="flex border-1 border-[#CF1818] px-2 py-1 rounded-full min-w-24 justify-between">
        <div className="flex flex-row justify-center items-center gap-1">
          <img
            className="h-7 w-7 cursor-pointer"
            src={selectedReaction.like ? heartFilled : heart}
            onClick={() => handleLike(t._id)}
          />
          <p className="text-gray-500 mr-2">{totalLikes.toString()}</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-1">
          <img
            className="h-7 w-7 cursor-pointer"
            src={selectedReaction.dislike ? brokenHeartFilled : brokenHeart}
            onClick={() => handleDislike(t._id)}
          />
        </div>
      </div>
      <div className="ml-4 flex flex-row gap-2 border-1 border-[#CF1818] rounded-full px-2 py-1 min-w-16 justify-between items-center">
        <img className="h-7 w-7" src={commentBubble} />
        <p className="text-gray-500">{t.comments && t.comments.length}</p>
      </div>
    </div>
  );
}
