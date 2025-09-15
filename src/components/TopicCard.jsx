import { Link } from "react-router-dom";
import { TransformDate } from "../utils/TransformDate";
import imagePlacehodler from "../assets/No-image.png";
import TopicReactionBar from "./TopicReactionBar";
import CrudButtons from "./CrudButtons";

export default function TopicCard({
  t,
  linkable = true,
  payload,
  handleDelete,
  setToggleUpdateTopic,
}) {
  const Wrapper = linkable ? Link : "div";
  const wrapperProps = linkable ? { to: `/topics/${t._id}` } : {};

  return (
    <div
      className={`flex flex-col min-w-[345px] w-full max-w-[850px] h-fit m-2 bg-white p-4 border-white rounded-md transition-all ease-in-out duration-300 ${
        linkable ? "border-1 hover:border-[#CF1818]" : ""
      } shadow-2xl`}
    >
      <Wrapper {...wrapperProps}>
        {!linkable && payload && payload.userName === t.topicUser && (
          <CrudButtons
            handleDelete={handleDelete}
            setToggleUpdate={setToggleUpdateTopic}
          />
        )}
        <div className="flex flex-row justify-between mb-1 text-purple">
          <h1
            className={`${
              t.title ? "text-2xl" : "text-sm"
            } font-semibold mb-2 text-purple`}
          >
            {t.title ? t.title : `By ${t.topicUser}`}
          </h1>
          <p>{t.createdAt && TransformDate(t.createdAt)}</p>
        </div>
        <p className="text-purple">{t.topic}</p>

        <div className="relative w-full">
          {t._id && t.imageUrl && (
            <img
              src={t.imageUrl}
              onError={(e) => (e.target.src = imagePlacehodler)}
              className="float-right w-[200px] xs:w-[240px] md:w-[300px] m-1 rounded-lg aspect-video"
            />
          )}
          <p className="text-gray-500">{t.description}</p>
        </div>
      </Wrapper>
      <TopicReactionBar t={t} payload={payload} />
    </div>
  );
}
