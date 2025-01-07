import { useEffect, useState } from "react";
import { getUserByUsername } from "../../api";

export default function ProfilePic({ username, size }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const sizes = {
    sm: "h-[24px] w-[24px] rounded-full",
    md: "h-[48px] w-[48px] rounded-full",
    comment: "h-[48px] w-[48px] rounded-sm",
  };

  useEffect(() => {
    getUserByUsername(username).then(({ data }) => {
      setAvatarUrl(() => {
        return data.user.avatar_url;
      });
    });
  });

  if (!username) return null;

  return (
    <div
      className={`flex aspect-square ${sizes[size]} overflow-clip  border-slate-300 border-[0.5px]`}
    >
      <img className="self-center justify-self-center" src={avatarUrl} />
    </div>
  );
}
