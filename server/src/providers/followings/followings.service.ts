import { User } from "@prisma/client";

export interface IFollowingsService<T> {
    getExport(obj: T, user: User);
}
