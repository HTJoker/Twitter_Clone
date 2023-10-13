import * as zod from "zod";

export const UserValidation = zod.object({
  profile_photo: zod.string().url(),
  name: zod.string().min(2).max(30),
  username: zod.string().min(2).max(30),
  bio: zod.string().max(255),
});
