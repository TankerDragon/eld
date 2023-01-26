import React from "react";
import { useState } from "react";
import { deleteLog } from "./api/axios";
import { FaTrashAlt } from "react-icons/fa";

const Post = React.forwardRef(({ post }, ref) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const requestDelete = (id) => {
    deleteLog(id)
      .then((data) => {
        if (data.status === 200) {
          setIsDeleted(true);
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const postBody = (
    <div className={isDeleted ? "deleted" : ""}>
      <h2>{post.hr}</h2>
      <p>{post.data}</p>
      <p>
        {post.date} {post.time}
      </p>
      <p>
        Post ID: {post.id} ({post.code})
      </p>
      <FaTrashAlt
        style={{ marginTop: "15px", color: "red", cursor: "pointer" }}
        onClick={() => requestDelete(post.id)}
      />
    </div>
  );

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});

export default Post;
