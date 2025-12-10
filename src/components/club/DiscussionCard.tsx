import { useState } from 'react';
import { MessageCircle, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useStore, Discussion } from '@/contexts/StoreContext';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';

interface DiscussionCardProps {
  discussion: Discussion;
}

const DiscussionCard = ({ discussion }: DiscussionCardProps) => {
  const { getUserById, getBookById, addReply, currentUser } = useStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const author = getUserById(discussion.authorId);
  const book = getBookById(discussion.bookId);

  const handleReply = () => {
    if (replyContent.trim() && currentUser?.isClubMember) {
      addReply(discussion.id, replyContent);
      setReplyContent('');
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: uk });
  };

  return (
    <article className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{author?.avatar || '👤'}</span>
          <div>
            <p className="font-body font-medium text-foreground">{author?.name || 'Анонім'}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDate(discussion.createdAt)}
            </div>
          </div>
        </div>
        {book && (
          <span className="text-xs bg-muted px-2 py-1 rounded font-body text-muted-foreground">
            📖 {book.title}
          </span>
        )}
      </div>

      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
        {discussion.title}
      </h3>
      <p className="text-muted-foreground font-body mb-4 leading-relaxed">
        {discussion.content}
      </p>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-body"
      >
        <MessageCircle className="h-4 w-4" />
        {discussion.replies.length} відповідей
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 pl-4 border-l-2 border-border">
          {discussion.replies.map((reply) => {
            const replyAuthor = getUserById(reply.authorId);
            return (
              <div key={reply.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{replyAuthor?.avatar || '👤'}</span>
                  <span className="font-body font-medium text-foreground text-sm">
                    {replyAuthor?.name || 'Анонім'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-body">{reply.content}</p>
              </div>
            );
          })}

          {currentUser?.isClubMember && (
            <div className="flex gap-2">
              <Textarea
                placeholder="Ваша відповідь..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] text-sm"
              />
              <Button 
                variant="burgundy" 
                size="icon" 
                onClick={handleReply}
                disabled={!replyContent.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default DiscussionCard;
