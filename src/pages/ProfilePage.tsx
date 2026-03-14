import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User, Mail, Phone, ImageIcon } from "lucide-react";

import { updateProfile } from "../api/user";
import { useAuthStore } from "../store/authStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Avatar from "../components/ui/Avatar";
import { RoleBadge, VerifiedBadge } from "../components/ui/Badge";

const schema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  mob_no: z.string().min(5).max(10),
  profile_pic: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
});

type Form = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, setAuth, accessToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      mob_no: user?.mob_no ?? "",
      profile_pic: user?.profile_pic ?? "",
    },
  });

  const previewName = watch("name");
  const previewPic = watch("profile_pic");

  const mutation = useMutation({
    mutationFn: (data: Form) =>
      updateProfile({
        ...data,
        role: user!.role,
        profile_pic: data.profile_pic || undefined,
      }),
    onSuccess: (updated) => {
      setAuth(updated, accessToken!);
      toast.success("Profile updated!");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.detail ?? "Update failed.");
    },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-extrabold text-brand-navy">My Profile</h1>

      {/* Profile card header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
        <Avatar name={previewName || "U"} src={previewPic} size="lg" />
        <div>
          <p className="font-bold text-brand-navy text-lg">{previewName}</p>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {user?.role && <RoleBadge role={user.role} />}
            <VerifiedBadge verified={user?.is_verified} />
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <h2 className="font-bold text-brand-navy mb-5">Edit Details</h2>
        <form
          onSubmit={handleSubmit((d) => mutation.mutate(d))}
          className="space-y-5"
        >
          <Input
            label="Full Name"
            leftIcon={<User size={15} />}
            error={errors.name?.message}
            {...register("name")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              leftIcon={<Mail size={15} />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Mobile No."
              leftIcon={<Phone size={15} />}
              error={errors.mob_no?.message}
              {...register("mob_no")}
            />
          </div>
          <Input
            label="Profile Picture URL"
            placeholder="https://example.com/avatar.jpg"
            leftIcon={<ImageIcon size={15} />}
            error={errors.profile_pic?.message}
            {...register("profile_pic")}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              loading={mutation.isPending}
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}