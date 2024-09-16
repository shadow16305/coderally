import { Reply, User } from "@prisma/client";

export interface ReplyWithChildren extends Reply {
  children?: ReplyWithChildren[];
  author: User;
}
