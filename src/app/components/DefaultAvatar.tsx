import twitterDefaultAvatar from "@/assets/Twitter_default_profile.png";
import Image from "next/image";

interface DefaultAvatarProps {
  height: number;
  width: number;
}

export const DefaultAvatar = ({ height, width }: DefaultAvatarProps) => {
  return (
    <Image
      src={twitterDefaultAvatar.src}
      alt="avatar"
      width={width}
      height={height}
      className="inline-block rounded-full cursor-pointer"
      aria-label="Default Avatar"
    />
  );
};
