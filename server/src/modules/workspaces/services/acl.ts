import { User, Workspace } from "@prisma/client";
import { ARR } from "@shared/array";

export class WorkspacesAcl {
    constructor(private _workpace: Workspace) {}

	/**
	 * @desc check if user is admin
	 * @param user
	 * @returns 
	 */
	private isAdmin(user: User){
		return ARR.contain(this._workpace.admins, user.id);
	}


	/**
	 * @desc check if user is owner
	 * @param user 
	 * @returns 
	 */
	private isOwner(user: User){
		return ARR.contain(this._workpace.owners, user.id);
	}


	/**
	 * @desc check if user if follower
	 * @return user
	 * @returns 
	 */
	private isMember(user: User){
		return ARR.contain(this._workpace.members, user);
	}


	/**
	 * @desc check if user can view
	 * @param user 
	 */
	canView(user: User){
		return this.isOwner(user) || this.isMember(user) || this.isAdmin(user);
	}


	/**
	 * @desc check if user can manage
	 * @param user
	 */
	canManage(user: User){
		return this.isOwner(user) || this.isAdmin(user);
	}

}
