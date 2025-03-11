<?php

namespace App\Notifications;

use App\Models\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class CommentReplyNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $comment;

    /**
     * Create a new notification instance.
     */
    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'comment_id' => $this->comment->id,
            'commenter_name' => $this->comment->user->name,
            'commenter_id' => $this->comment->user_id,
            'content' => $this->comment->content,
            'chapter_id' => $this->comment->chapter_id,
            'comic_id' => $this->comment->comic_id,
            'parent_id' => $this->comment->parent_id,
            'created_at' => $this->comment->created_at,
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'comment_id' => $this->comment->id,
            'commenter_name' => $this->comment->user->name,
            'commenter_id' => $this->comment->user_id,
            'content' => $this->comment->content,
            'chapter_id' => $this->comment->chapter_id,
            'parent_id' => $this->comment->parent_id,
            'created_at' => $this->comment->created_at,
            'time' => now()->diffForHumans(),
        ]);
    }
}