import z from "zod";

// *********** REGISTER NEW USER **************
const fileListType =
  typeof FileList === "undefined" ? z.any() : z.instanceof(FileList);

export const registerUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  image: fileListType.optional(),
});

export type RegisterUserType = z.infer<typeof registerUserSchema>;

// *********** LOGIN USER **************

export const loginUserSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export type LoginUserType = z.infer<typeof loginUserSchema>;

// ************** USER **************

export const UserSchema = z.object({
  email: z.email(),
  image: z.string().optional(),
  name: z.string(),
  _id: z.string(),
  provider: z.enum(["google"]).optional(),
});

export type UserType = z.infer<typeof UserSchema>;

// ************** DELETE USER **************

export const deleteUserSchema = z.object({
  email: z.email(),
  image: z.string().optional(),
  name: z.string(),
  _id: z.string(),
  password: z.string().nullable(),
  provider: z.enum(["google"]).optional(),
});

export type DeleteUserType = z.infer<typeof deleteUserSchema>;

// ************** REPLY **************

export const replySchema = z.object({
  content: z.string(),
  userId: UserSchema,
  _id: z.string(),
  replyTo: UserSchema,
  productRequestId: z.string(),
  commentId: z.string(),
});

export const repliesSchema = z.array(replySchema);

export type RepliesType = z.infer<typeof repliesSchema>;

export type ReplyType = z.infer<typeof replySchema>;

// *********** COMMENTS  **************

export const CommentSchema = z.object({
  content: z.string(),
  productRequestId: z.string(),
  userId: UserSchema,
  _id: z.string(),
  replies: repliesSchema,
});

export const CommentsSchema = z.array(CommentSchema);

export type CommentType = z.infer<typeof CommentSchema>;

// *********** FEEDBACK DETAILS  **************

export const feedBackDetailsSchema = z.object({
  title: z.string(),
  category: z.enum(["feature", "UI", "UX", "enhancement", "bug"]),
  status: z.enum(["suggestion", "planned", "in-progress", "live"]),
  upVotes: z.number(),
  description: z.string(),
  userId: UserSchema,
  numOfComments: z.number(),
  _id: z.string(),
  comments: CommentsSchema,
});

export type ProductRequestType = z.infer<typeof feedBackDetailsSchema>;

// *********** PRODUCT REQUESTS  **************

export const productRequestsSchema = z.array(
  z.object({
    title: z.string(),
    category: z.enum(["feature", "UI", "UX", "enhancement", "bug"]),
    status: z.enum(["suggestion", "planned", "in-progress", "live"]),
    upVotes: z.number(),
    description: z.string(),
    userId: UserSchema.partial(),
    numOfComments: z.number(),
    _id: z.string(),
  }),
);

export type ProductRequestsType = z.infer<typeof productRequestsSchema>;

// *********** CREATE FEEDBACK  **************

export const createFeedbackSchema = z.object({
  description: z.string().trim().min(1, "Can't be empty"),
  title: z.string().trim().min(1, "Can't be empty"),
});

export type CreateFeedbackType = z.infer<typeof createFeedbackSchema>;

// *********** UPDATE FEEDBACK  **************

export const updateFeedbackSchema = z.object({
  description: z.string().trim().min(1, "Can't be empty"),
  title: z.string().trim().min(1, "Can't be empty"),
});

export type UpdateFeedbackType = z.infer<typeof updateFeedbackSchema>;
