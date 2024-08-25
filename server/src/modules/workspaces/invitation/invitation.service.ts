import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { InvitationLoader } from "./services/loader";
import { InvitationWriter } from "./services/writer";
import { Invitation } from "@prisma/client";
import { EmailService } from "@providers/email/mail.service";
import workspaceInvitation from "emails/workspaceInvitation";

@Injectable()
export class InvitationService {
    static EXPIRED_DAYS = 24;

    constructor(
        private _prisma: PrismaService,
        private _emailsService: EmailService
    ) {}

    /**
     * @desc return invitation loader
     * @returns {InvitationLoader}
     */
    loader() {
        return new InvitationLoader(this._prisma);
    }

    /**
     * @desc return invitation writer
     * @returns {InvitationWriter}
     */
    writer() {
        return new InvitationWriter(this._prisma);
    }

    /**
     * @desc send email invitation
     * @param {Invitation} invitation
     */
    async sendInvitationEmail(invitation: Invitation) {
		const workspaceExport = invitation.workspaceExport as any;
		const workspaceName = workspaceExport ? workspaceExport.name : "---";
		const verification_link = `${process.env.FRONT_END_URL}?t=${invitation.token}`;

		  
        // send email to invite
		await this._emailsService.sendEmail({
			to: invitation.email,
			subject:`Join ${workspaceName} on P}`,
			template: workspaceInvitation({
				inviterEmail: invitation.email,
				workspaceName: workspaceName,
				link: verification_link
			})
		})
    }
}
