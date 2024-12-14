"use client";
import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/date-picker";
import { LoaderCircleIcon, Plus, X } from "lucide-react";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type PostFormData = z.infer<typeof postSchema>;

const PostManagementPage: React.FC = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
  });

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/users/${session?.user?.id}/posts`);
      setPosts(res?.data?.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchPosts();
    }
  }, [session]);

  const onSubmit = async (data: PostFormData) => {
    try {
      const payload = {
        title: data?.title,
        description: data?.description,
        imageUrl: data?.imageUrl,
      };

      const response = await axios.post(`/api/users/${session?.user?.id}/posts`, payload);

      if (response?.data?.success) {
        toast.success("Post created successfully!");
        reset();
        fetchPosts();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await axios.delete(`/api/users/${session?.user?.id}/posts/${postId}`);

      if (response?.data?.success) {
        toast.success("Post deleted successfully!");
        fetchPosts();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Post Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Input {...register("title")} placeholder="Enter post title" />
              {errors?.title && <p className="text-red-500 text-sm">{errors?.title?.message}</p>}
            </div>

            <div className="space-y-2">
              <Textarea {...register("description")} placeholder="Describe the post content" />
              {errors?.description && <p className="text-red-500 text-sm">{errors?.description?.message}</p>}
            </div>

            <div className="space-y-2">
              <Input {...register("imageUrl")} placeholder="Enter image URL" />
              {errors?.imageUrl && <p className="text-red-500 text-sm">{errors?.imageUrl?.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Post...
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 space-y-6">
        {loading ? (
          <div>Loading posts...</div>
        ) : (
          posts?.map((post: any) => (
            <Card key={post?.id}>
              <CardHeader>
                <CardTitle>{post?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={post?.imageUrl} alt={post?.title} className="w-full h-auto object-cover" />
                <p className="mt-4">{post?.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => handleDelete(post?.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PostManagementPage;