import { PrismaService } from "@db/prisma.service";
import { Injectable } from "@nestjs/common";
import { InvitationLoader } from "./services/loader";
import { InvitationWriter } from "./services/writer";
import { Token } from "@shared/token";
import { DTC } from "@shared/dtc";
import { Invitation } from "@prisma/client";

@Injectable()
export class InvitationService{
	static EXPIRED_DAYS = 24;

	constructor(private _prisma: PrismaService){
	}


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
	async sendInvitationEmail(invitation: Invitation){
		// send email to invite
		
	}
}