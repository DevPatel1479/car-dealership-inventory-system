interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm(): void;
    onCancel(): void;
}

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    loading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
        >
            <div
                className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-2xl
        "
            >
                <h2 className="text-xl font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-3 text-gray-600">
                    {message}
                </p>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={onCancel}
                        className="
              rounded-lg
              border
              border-gray-300
              px-5
              py-2.5
              font-medium
              transition
              hover:bg-gray-100
              disabled:opacity-50
            "
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={onConfirm}
                        className="
              rounded-lg
              bg-red-600
              px-5
              py-2.5
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:bg-red-300
            "
                    >
                        {loading ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}