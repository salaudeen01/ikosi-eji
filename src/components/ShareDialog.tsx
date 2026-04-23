"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useArticleStore } from "@/store/clients/useArticleStore";

interface ShareDialogProps {
  title: string;
  url: string;
  image?: string
}

const ShareDialog = ({ title, url }: ShareDialogProps) => {
  const article = useArticleStore((s) => s.article);
  const { toast } = useToast();
  const [fullUrl, setFullUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const cleanUrl = url.startsWith("http")
        ? url
        : `${origin}${url.startsWith("/") ? "" : "/"}${url}`;
      setFullUrl(cleanUrl);
    }
  }, [url]);

  // const encodedUrl = encodeURIComponent(fullUrl);
  // const encodedTitle = encodeURIComponent(title);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to clipboard.",
    });
  };
  const handleShare = async () => {
    if (!article) return;

    const shareData = {
      title: article.title,
      text: article.summary || "Check out this article!",
      url: `${window.location.origin}/articles/${article.slug}`,
    };

    // ✅ Use Web Share API if available (mobile-friendly)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        // console.log("Article shared successfully");
      } catch (err) {
        console.error("Share cancelled or failed", err);
      }
    } else {
      // ✅ Fallback: copy link to clipboard
      await navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  const encodedUrl = encodeURIComponent(`${window.location.origin}/${article?.categoryName}/article/${article?.id}/${article?.slug}`);
  const encodedTitle = encodeURIComponent(article?.title || '');

// const shareLinks = {
//   twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
//   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
//   whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
// };


  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareToFacebook = () =>
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);

  const shareToTwitter = () =>
    openShareWindow(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`);

  const shareToLinkedIn = () =>
    openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`);

  const shareToWhatsApp = () =>
    openShareWindow(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`);
  // openShareWindow(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleShare} variant="outline" size="sm" className="border-border-color text-navy hover:bg-primary/5 hover:text-primary transition-colors h-10">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
          <DialogDescription>
            Choose how you’d like to share this article
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <Button onClick={shareToFacebook} variant="outline" className="w-full">
            <Facebook className="h-4 w-4 mr-2" /> Facebook
          </Button>
          <Button onClick={shareToTwitter} variant="outline" className="w-full">
            <Twitter className="h-4 w-4 mr-2" /> Twitter
          </Button>
          <Button onClick={shareToLinkedIn} variant="outline" className="w-full">
            <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
          </Button>
          <Button onClick={shareToWhatsApp} variant="outline" className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
          </Button>
        </div>

        <div className="flex items-center space-x-2 mt-4 w-72">
          <div className="flex-1 bg-[hsl(var(--secondary))] p-3 rounded-md text-sm truncate">
            {fullUrl || "Loading..."}
          </div>
          <Button onClick={copyToClipboard} size="sm" variant="outline">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
