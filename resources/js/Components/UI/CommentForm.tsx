import { User } from '@/types/custom';
import { FC } from 'react';
import Avatar from './Avatar';

interface CommentFormProps {
    user: User;
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    placeholder?: string;
    rows?: number;
    onCancel?: () => void;
}

export const CommentForm: FC<CommentFormProps> = ({
    user,
    value,
    onChange,
    onSubmit,
    isSubmitting,
    placeholder = 'Thêm bình luận của bạn...',
    rows = 3,
    onCancel,
}) => {
    return (
        <div className="flex items-start space-x-3">
            <Avatar user={user} size={onCancel ? 'sm' : 'md'} />
            <div className="flex-grow">
                <textarea
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={rows}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <div className="mt-2 flex space-x-2">
                    <button
                        className={`rounded-md bg-orange-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-orange-500 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi'}
                    </button>
                    {onCancel && (
                        <button
                            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                            onClick={onCancel}
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
