import { PrismaService } from "@db/prisma.service";
import { Invitation } from "@prisma/client";

export class InvitationWriter {
    constructor(private _prisma: PrismaService) {
        this._prisma = _prisma;
    }

    /**
     * @desc create new invitation
     * @param data
     * @returns Workspace
     */
    async create(data): Promise<Invitation> {
        return this._prisma.invitation.create({
            data: {
                ...data,
            },
        });
    }
}
