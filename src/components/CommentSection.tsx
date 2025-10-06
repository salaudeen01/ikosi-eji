import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
}

const CommentSection = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: "Chidinma Okeke",
      email: "chidinma.o@email.com",
      comment: "This is a very insightful analysis of Nigeria's economic prospects. The World Bank's projection seems realistic given the recent reforms.",
      date: "October 1, 2025",
    },
    {
      id: 2,
      name: "Adewale Johnson",
      email: "adewale.j@email.com",
      comment: "I'm cautiously optimistic about these projections. While the reforms are commendable, we need to see sustained implementation to achieve these growth targets.",
      date: "October 1, 2025",
    },
  ]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !comment.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: comments.length + 1,
      name: name.trim(),
      email: email.trim(),
      comment: comment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setComment("");

    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="mt-12 pt-8 border-t border-[hsl(var(--border))]">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-[hsl(var(--secondary))] p-6 rounded-lg">
        <h4 className="font-semibold mb-4">Leave a Comment</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
            />
          </div>
        </div>
        <Textarea
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="mb-4"
          rows={4}
          maxLength={1000}
        />
        <Button type="submit">Post Comment</Button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 p-4 bg-[hsl(var(--secondary))]/50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
                {getInitials(comment.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h5 className="font-semibold">{comment.name}</h5>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{comment.date}</span>
              </div>
              <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {comment.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
