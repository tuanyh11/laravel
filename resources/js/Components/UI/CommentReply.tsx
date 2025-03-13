import { Comment } from '@/types/custom';
import { formatDate } from '@/utils/formatDate';
import { ThumbsUp } from 'lucide-react';
import { FC } from 'react';
import Avatar from './Avatar';

interface CommentReplyProps {
    reply: Comment;
}

export const CommentReply: FC<CommentReplyProps> = ({ reply }) => {
    return (
        <div className="flex items-start space-x-2">
            <Avatar user={reply.user} size="sm" />
            <div className="flex-grow">
                <div className="rounded-lg bg-gray-50 p-2">
                    <div className="flex items-center justify-between">
                        <h5 className="text-xs font-medium text-gray-900">
                            {reply.user.name}
                        </h5>
                        <span className="text-xs text-gray-500">
                            {formatDate(reply.created_at)}
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">
                        {reply.content}
                    </p>
                </div>
                {/* <button className="mt-1 flex items-center space-x-1 pl-1 text-xs text-gray-500 hover:text-blue-600">
                    <ThumbsUp size={12} />
                    <span>Thích</span>
                </button> */}
            </div>
        </div>
    );
};

export default CommentReply;
