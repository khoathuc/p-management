import {
    BadRequestException,
    Body,
    Controller,
    HttpException,
    HttpStatus,
    Post,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { WorkspacesService } from "./workspaces.service";
import { UsersService } from "@modules/users/users.service";
import { CreateWorkspaceInvitationDto } from "./invitation/dto/create.invitation.dto";
import { InvitationService } from "./invitation/invitation.service";
import { Token } from "@shared/token";
import { DTC } from "@shared/dtc";

@Controller("workspaces/:id/invitation")
@ApiTags("workspaces")
export class WorkspaceInvitationController {
    constructor(
        readonly workspacesService: WorkspacesService,
        readonly usersService: UsersService,
        readonly invitationService: InvitationService
    ) {}

    @Post()
    @ApiOperation({
        summary: "Invite to workspace",
        description: "Invite to workspace",
    })
    async create(
        @Body() createWorkspaceInvitationDto: CreateWorkspaceInvitationDto
    ) {
        try {
            const { viaEmail, workspaceId, email, role } =
                createWorkspaceInvitationDto;

            const workspace = await this.workspacesService
                .loader()
                .getById(workspaceId);
            if (!workspace) {
                throw new BadRequestException("Invalid workspace");
            }

            // //TODO: check if current user is can manage
            // if(!this.workspacesService.acl(workspace).canManage()){
            // 	throw new BadRequestException("You do not have permission to invite new user to this workspace");
            // }

            // Check if email is already invited
            const invitationExisted = await this.invitationService
                .loader()
                .getByEmailAndWorkspace(email, workspaceId);

            if (invitationExisted) {
                throw new BadRequestException(
                    "This email has already been invited"
                );
            }

            // create new invitation
            const invitation = await this.invitationService.writer().create({
                workspaceId: workspaceId,
                email: email,
                role: role,
                token: Token.generate(),
                expires: DTC.nextDays(InvitationService.EXPIRED_DAYS),
            });

            // Invite by email
            if (viaEmail) {
                console.log(invitation);
                // this.invitationService.sendInvitationEmail(invitation);
            }

            // TODO: Invite by link

            return;
        } catch (error) {
            console.log(error);
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
