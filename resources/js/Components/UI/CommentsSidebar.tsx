import { Comment, LaravelPagination, User } from '@/types/custom';
import { ReplyPaginationsMap } from '@/types/custom-extensions';
import { X } from 'lucide-react';
import { FC, useMemo } from 'react';
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
    loadMoreComments: () => void;
    loadMoreReplies: (commentId: number, page: number) => void;
    commentPagination?: LaravelPagination<Comment>;
    replyPaginations: ReplyPaginationsMap;
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
    loadMoreComments,
    loadMoreReplies,
    commentPagination,
    replyPaginations,
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
            className={`fixed right-0 top-0 z-10 h-full overflow-hidden bg-black/50  backdrop-blur-md transition-transform ${
                showComments ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
                width: `${sidebarWidth}px`,
            }}
        >
            <div className="flex items-center justify-between border-b p-4">
                <h3 className="text-lg font-medium text-white">
                    Bình luận (
                    {commentPagination?.total || groupedComments.length})
                </h3>
                <button
                    onClick={toggleComments}
                    className="rounded-full p-1.5 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Add comment form */}
            <div className="border-b  p-4">
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
                className="scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent h-[76vh] overflow-y-auto pb-16"
            >
                <div className="divide-y">
                    {groupedComments.length > 0 ? (
                        <>
                            {groupedComments.map(({ comment, replies }) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    replies={replies}
                                    currentUser={currentUser}
                                    onReply={(commentId, content) =>
                                        addReply(commentId, content)
                                    }
                                    isSubmitting={isSubmitting}
                                    loadMoreReplies={loadMoreReplies}
                                    replyPagination={
                                        replyPaginations[comment.id]
                                    }
                                />
                            ))}

                            {/* Load more comments button */}
                            {commentPagination &&
                                commentPagination.current_page <
                                    commentPagination.last_page && (
                                    <div className="flex justify-center p-4">
                                        <button
                                            onClick={loadMoreComments}
                                            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-gray-100 shadow-sm transition-colors hover:bg-gray-600"
                                        >
                                            Xem thêm bình luận
                                        </button>
                                    </div>
                                )}
                        </>
                    ) : (
                        <div className="flex h-32 items-center justify-center">
                            <p className="text-center text-sm text-gray-300">
                                Chưa có bình luận nào.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
