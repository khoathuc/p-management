import { Invitation, PrismaClient } from "@prisma/client";

export class InvitationLoader {
    constructor(private _prisma: PrismaClient) {
        this._prisma = _prisma;
    }

    /**
     * @desc get all invitations
     * @returns
     */
    async getAll() {
        return await this._prisma.invitation.findMany();
    }

    /**
     * @desc get invitation by id
     * @param string id
     * @returns
     */
    async getById(id: string): Promise<Invitation> {
        return await this._prisma.invitation.findUnique({
            where: { id },
        });
    }
    
    
    /**
     * @desc get invitation by email
     * @param string email
     * @param string workspaceId
     * @returns
     */
    async getByEmailAndWorkspace(email: string, workspaceId: string): Promise<Invitation> {
        return await this._prisma.invitation.findUnique({
            where: {
                workspaceId_email: {
                    email,
                    workspaceId
                }
            },
        });
    }
}
