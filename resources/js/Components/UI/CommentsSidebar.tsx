import { Comment, LaravelPagination, User } from '@/types/custom';
import { X } from 'lucide-react';
import { FC, useCallback, useMemo } from 'react';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface CommentsSidebarProps {
    comments: Comment[];
    currentUser: User;
    showComments: boolean;
    sidebarWidth: number;
    toggleComments: () => void;
    newComment: string;
    setNewComment: (value: string) => void;
    addComment: () => void;
    addReply: (commentId: number, content: string) => void;
    isSubmitting: boolean;
    commentListRef: React.RefObject<HTMLDivElement>;
}

export const CommentsSidebar: FC<CommentsSidebarProps> = ({
    comments,
    currentUser,
    showComments,
    sidebarWidth,
    toggleComments,
    newComment,
    setNewComment,
    addComment,
    addReply,
    isSubmitting,
    commentListRef,
}) => {
    // Group comments and their replies
    const groupedComments = useMemo(() => {
        const parentComments = comments.filter(
            (comment) => comment.parent_id === null,
        );

        return parentComments.map((parentComment) => {
            const replies = comments?.filter(
                (comment) => comment.parent_id === parentComment.id,
            );
            return {
                comment: parentComment,
                replies: replies,
            };
        });
    }, [comments]);

    return (
        <div
            className={`fixed right-0 top-0 z-10 h-full overflow-hidden border-l border-gray-200 bg-white transition-transform ${
                showComments ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
                width: `${sidebarWidth}px`,
            }}
        >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h3 className="text-lg font-medium">
                    Bình luận ({groupedComments.length})
                </h3>
                <button
                    onClick={toggleComments}
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Add comment form */}
            <div className="border-b border-gray-200 p-4">
                <CommentForm
                    user={currentUser}
                    value={newComment}
                    onChange={setNewComment}
                    onSubmit={addComment}
                    isSubmitting={isSubmitting}
                />
            </div>

            {/* Comments list */}
            <div
                ref={commentListRef}
                className="h-screen overflow-y-auto pb-16"
            >
                <div className="divide-y divide-gray-100">
                    {groupedComments.length > 0 ? (
                        groupedComments.map(({ comment, replies }) => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                replies={replies}
                                currentUser={currentUser}
                                onReply={(commentId, content) =>
                                    addReply(commentId, content)
                                }
                                isSubmitting={isSubmitting}
                            />
                        ))
                    ) : (
                        <div className="flex h-32 items-center justify-center">
                            <p className="text-center text-sm text-gray-500">
                                Chưa có bình luận nào.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
