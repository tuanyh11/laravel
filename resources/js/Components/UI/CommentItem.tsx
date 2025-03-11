import { Comment, User } from '@/types/custom';
import { formatDate } from '@/utils/formatDate';
import { MoreVertical, Reply, ThumbsUp } from 'lucide-react';
import { FC, useState } from 'react';
import Avatar from './Avatar';
import { CommentForm } from './CommentForm';
import { CommentReply } from './CommentReply';

interface CommentItemProps {
    comment: Comment;
    replies: Comment[];
    currentUser: User;
    onReply: (commentId: number, content: string) => void;
    isSubmitting: boolean;
}

export const CommentItem: FC<CommentItemProps> = ({
    comment,
    replies,
    currentUser,
    onReply,
    isSubmitting,
}) => {
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    const handleReply = () => {
        if (replyText.trim()) {
            onReply(comment.id, replyText);
            setReplyText('');
            setReplyingTo(null);
        }
    };

    return (
        <div className="p-4">
            <div className="flex items-start space-x-3">
                <Avatar user={comment.user} size="md" />
                <div className="flex-grow">
                    <div className="rounded-lg bg-gray-50 p-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900">
                                {comment.user.name}
                            </h4>
                            <div className="flex items-center space-x-1">
                                <span className="text-xs text-gray-500">
                                    {formatDate(comment.created_at)}
                                </span>
                                <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                                    <MoreVertical size={14} />
                                </button>
                            </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">
                            {comment.content}
                        </p>
                    </div>

                    <div className="mt-1 flex items-center space-x-4 pl-1">
                        <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600">
                            <ThumbsUp size={14} />
                            <span>Thích</span>
                        </button>
                        <button
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-blue-600"
                            onClick={() => setReplyingTo(comment.id)}
                        >
                            <Reply size={14} />
                            <span>Trả lời</span>
                        </button>
                    </div>

                    {/* Reply form */}
                    {replyingTo === comment.id && (
                        <div className="mt-3 pl-2">
                            <CommentForm
                                user={currentUser}
                                value={replyText}
                                onChange={setReplyText}
                                onSubmit={handleReply}
                                isSubmitting={isSubmitting}
                                placeholder="Viết phản hồi..."
                                rows={2}
                                onCancel={() => setReplyingTo(null)}
                            />
                        </div>
                    )}

                    {/* Replies */}
                    {replies.length > 0 && (
                        <div className="mt-2 space-y-3 pl-6">
                            {replies.map((reply) => (
                                <CommentReply key={reply.id} reply={reply} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
