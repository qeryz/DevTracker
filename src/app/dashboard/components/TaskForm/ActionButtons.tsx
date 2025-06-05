interface ActionButtonsProps {
  onCancel: () => void;
  submitLabel: string;
  cancelLabel: string;
}

const ActionButtons = ({
  onCancel,
  submitLabel,
  cancelLabel,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-row justify-center gap-2 items-end">
      <button
        type="submit"
        className="bg-indigo-600 text-white py-1.5 px-3 rounded cursor-pointer min-w-50"
      >
        {submitLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-gray-500 text-white py-1.5 px-3 rounded cursor-pointer min-w-50"
        aria-label={`Cancel ${cancelLabel}`}
      >
        {cancelLabel}
      </button>
    </div>
  );
};

export default ActionButtons;
