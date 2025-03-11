import { Chapter, Comment, LaravelPagination, User } from '@/types/custom';
import { router } from '@inertiajs/react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

const useChapterComments = (chapter: Chapter, currentUser: User) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const commentListRef = useRef<HTMLDivElement>(null);

    // Initialize Pusher
    useEffect(() => {
        const pusher = new Pusher(
            import.meta.env.VITE_PUSHER_APP_KEY || 'a53de8327fa510a204f6',
            {
                cluster: 'ap1',
                authEndpoint: '/broadcasting/auth',
            },
        );

        // Subscribe to the chapter-specific channel
        const chapterChannel = pusher.subscribe(
            `private-chapter.${chapter.id}`,
        );
        const userChannel = pusher.subscribe(`private-user.${currentUser.id}`);

        // Listen for new comments
        chapterChannel.bind(
            'comment.activity',
            (data: { comment: Comment; action: string }) => {
                if (data.action === 'new') {
                    setComments((prevComments) => [
                        data.comment,
                        ...prevComments,
                    ]);

                    // Scroll to top of comment list where new comment appears
                    if (commentListRef.current) {
                        commentListRef.current.scrollTop = 0;
                    }
                }
            },
        );

        // Listen for replies to your comments
        userChannel.bind(
            'comment.activity',
            (data: { comment: Comment; action: string }) => {
                if (data.action === 'reply') {
                    setComments((prevComments) => [
                        ...prevComments,
                        data.comment,
                    ]);
                }
            },
        );

        (async () => {
            const { data } = await axios.get<LaravelPagination<Comment>>(
                route('chapter.comment', {
                    chapter_id: chapter.id,
                }),
            );
            setComments(data.data);
        })();

        return () => {
            // Cleanup
            pusher.unsubscribe(`private-chapter.${chapter.id}`);
            pusher.unsubscribe(`private-user.${currentUser.id}`);
        };
    }, [chapter.id, currentUser.id]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    // Add comment using Inertia
    const addComment = () => {
        if (newComment.trim() && !isSubmitting) {
            setIsSubmitting(true);

            router.post(
                route('chapter.comment.store', { chapter_id: chapter.id }),
                {
                    content: newComment,
                    chapter_id: chapter.id,
                    parent_id: null,
                },
                {
                    preserveState: true,
                    onSuccess: () => {
                        setNewComment('');
                        setIsSubmitting(false);
                        // Comment will be added via Pusher
                    },
                    onError: (errors) => {
                        console.error('Failed to add comment:', errors);
                        setIsSubmitting(false);
                    },
                },
            );
        }
    };

    // Add reply using Inertia
    const addReply = (commentId: number, replyText: string) => {
        if (replyText.trim() && !isSubmitting) {
            setIsSubmitting(true);

            router.post(
                route('chapter.comment.store', { chapter_id: chapter.id }),
                {
                    content: replyText,
                    chapter_id: chapter.id,
                    parent_id: commentId,
                },
                {
                    preserveState: true,
                    onSuccess: () => {
                        setIsSubmitting(false);
                        // Reply will be added via Pusher
                    },
                    onError: (errors) => {
                        console.error('Failed to add reply:', errors);
                        setIsSubmitting(false);
                    },
                },
            );
        }
    };

    return {
        showComments,
        comments,
        newComment,
        setNewComment,
        isSubmitting,
        commentListRef,
        toggleComments,
        addComment,
        addReply,
    };
};

export default useChapterComments;
