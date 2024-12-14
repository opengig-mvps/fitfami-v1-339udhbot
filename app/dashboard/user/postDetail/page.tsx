"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Heart, MessageSquare, LoaderCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { isAxiosError } from "axios";

const PostDetailPage: React.FC = () => {
  const { data: session } = useSession();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [likes, setLikes] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/posts/${postId}`);
        setPost(response?.data?.data);
        setLikes(response?.data?.data?.likes);
        setComments(response?.data?.data?.comments);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const handleLike = async () => {
    if (!session) return;

    try {
      const response = await api.post(`/api/posts/${postId}/like`, {
        userId: session?.user?.id,
      });
      if (response?.data?.success) {
        setLikes((prev) => prev + 1);
        toast.success("Liked the post!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !commentText.trim()) return;

    try {
      const response = await api.post(`/api/posts/${postId}/comment`, {
        userId: session?.user?.id,
        text: commentText,
      });

      if (response?.data?.success) {
        setComments((prev) => [...prev, response?.data?.data]);
        setCommentText("");
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{post?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post?.content}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={handleLike}>
              <Heart className="h-5 w-5" />
              <span className="sr-only">Like</span>
            </Button>
            <span>{likes} Likes</span>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        {comments?.map((comment) => (
          <Card key={comment?.id} className="mb-4">
            <CardContent>
              <p>{comment?.text}</p>
            </CardContent>
          </Card>
        ))}

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment">Add a Comment</Label>
              <Textarea
                id="comment"
                value={commentText}
                onChange={(e: any) => setCommentText(e?.target?.value)}
                placeholder="Write your comment here..."
              />
            </div>
            <Button type="submit" className="w-full">
              {loading ? <LoaderCircleIcon className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetailPage;