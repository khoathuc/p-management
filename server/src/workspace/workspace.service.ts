import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}

  async createWorkspace(data: Prisma.WorkspaceCreateInput) {
    if(data.name) {
      const Workspace = await this.prisma.workspace.findUnique({
        where: {name: data.name as string}
      })

      if(Workspace) throw new HttpException('WorkspaceName already taken', 400)
    }

    return this.prisma.workspace.create({
      data: {
        ...data
      }
    })
  }
  
  async getWorkspace() {
    const Workspace = await this.prisma.workspace.findMany()
    if(!Workspace.length) throw new HttpException('Workspace Not Found', 404)
    return Workspace
  }
  
  async getWorkspaceById(id: string) {
    const Workspace = await this.prisma.workspace.findUnique({
      where: { id }
    })

    if(!Workspace) throw new HttpException('Workspace Not Found', 404)
    return Workspace
  }

  async updateWorkspace(id: string, data: Prisma.WorkspaceUpdateInput) {
    const Workspace = await this.getWorkspaceById(id)
    if(!Workspace) throw new HttpException('Workspace Not Found', 404)
    
    if(data.name) {
      const Workspace = await this.prisma.workspace.findUnique({
        where: {name: data.name as string}
      })

      if(Workspace) throw new HttpException('WorkspaceName already taken', 400)
    }
  
    return this.prisma.workspace.update({
      where: { id },
      data
    })
  }
  
  async deleteWorkspace(id: string) {
    const Workspace = await this.prisma.workspace.findUnique({
      where: { id }
    })

    if(!Workspace) throw new HttpException('Workspace Not Found', 404)
    return this.prisma.workspace.delete
  }
}
