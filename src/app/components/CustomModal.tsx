import { XMarkIcon } from "@heroicons/react/24/outline";

interface CustomModalProps {
  title: React.ReactNode;
  body: React.ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
  footer?: React.ReactNode;
}

export const CustomModal = ({
  title,
  body,
  onClose,
  showCloseButton = true,
  footer,
}: CustomModalProps) => {
  return (
    <div
      className="relative z-10 cursor-default"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal container */}
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
        onClick={onClose} // Close modal when clicking on the backdrop
      ></div>

      <div
        className="fixed inset-0 z-10 overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing when clicking inside the modal
          onClose(); // Close the modal when clicking outside
        }}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Modal panel */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
            <div className="flex items-center justify-end">
              {showCloseButton && (
                <button
                  type="button"
                  className="absolute right-0 top-0 rounded-md cursor-pointer bg-white px-2 py-2 text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              )}
            </div>
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
              className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            >
              <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div
                    className="text-base font-semibold text-gray-900"
                    id="modal-title"
                  >
                    {title}
                  </div>
                  <div className="mt-2 w-full">
                    <div className="text-sm text-gray-500 w-full">{body}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {footer && footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
