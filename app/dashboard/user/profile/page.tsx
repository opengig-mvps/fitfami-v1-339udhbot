'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import api from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LoaderCircleIcon } from 'lucide-react';
import { DateTimePicker } from '@/components/ui/date-picker';

const profileSchema = z.object({
  profilePicture: z.instanceof(File).optional(),
  bio: z.string().min(1, 'Bio is required').max(500, 'Bio must be less than 500 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/profile`);
        const profileData = res?.data?.data;
        setValue('profilePicture', profileData?.profilePicture);
        setValue('bio', profileData?.bio);
        setValue('firstName', profileData?.firstName);
        setValue('lastName', profileData?.lastName);
        setValue('email', profileData?.email);
        setValue('birthDate', new Date(profileData?.birthDate));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const formData = new FormData();
      if (data?.profilePicture) formData.append('profilePicture', data?.profilePicture);
      formData.append('bio', data?.bio);
      formData.append('firstName', data?.firstName);
      formData.append('lastName', data?.lastName);
      formData.append('email', data?.email);
      if (data?.phone) formData.append('phone', data?.phone);
      if (data?.birthDate) formData.append('birthDate', data?.birthDate.toISOString());

      const res = await api.put(`/api/users/${session?.user?.id}/profile`, formData);

      if (res?.data?.success) {
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Profile Management</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={session?.user?.image as any} />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture</Label>
                <Input
                  type="file"
                  {...register('profilePicture')}
                  accept="image/*"
                  className="border p-2 rounded-md"
                />
                {errors?.profilePicture && (
                  <p className="text-red-500 text-sm">{errors?.profilePicture?.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea {...register('bio')} placeholder="Tell us about yourself" />
              {errors?.bio && (
                <p className="text-red-500 text-sm">{errors?.bio?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input {...register('firstName')} placeholder="Enter your first name" />
              {errors?.firstName && (
                <p className="text-red-500 text-sm">{errors?.firstName?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input {...register('lastName')} placeholder="Enter your last name" />
              {errors?.lastName && (
                <p className="text-red-500 text-sm">{errors?.lastName?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register('email')} type="email" placeholder="Enter your email" />
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input {...register('phone')} type="tel" placeholder="Enter your phone number" />
              {errors?.phone && (
                <p className="text-red-500 text-sm">{errors?.phone?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date</Label>
              <DateTimePicker
                date={undefined}
                setDate={(date: any) => setValue('birthDate', date)}
              />
              {errors?.birthDate && (
                <p className="text-red-500 text-sm">{errors?.birthDate?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" variant="outline" disabled={isSubmitting || loading}>
              {loading ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Updating Profile...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;