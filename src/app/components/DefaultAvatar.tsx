interface DefaultAvatarProps {
  height: number;
  width: number;
}

export const DefaultAvatar = ({ height, width }: DefaultAvatarProps) => {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
      alt="avatar"
      width={width}
      height={height}
      className="inline-block rounded-full cursor-pointer"
    />
  );
};
