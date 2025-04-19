interface TagsListProps {
  tags: { name: string }[];
}

export const TagsList = ({ tags }: TagsListProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags?.map((tag, index) => (
        <span
          key={index}
          className={`${
            index % 2 === 0
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          } text-xs font-bold px-2.5 py-0.5 rounded-full uppercase`}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};
