import status from 'http-status-codes';

import { Request, Response } from 'express';
import prisma from '../../config/prismaClient.config';

export async function rolePermissions(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = await prisma.rolePermission.findMany({
            where: {
                roleId: Number(id),
            },
            include: {
                role: {
                    select: { name: true },
                },
                permission: {
                    select: { name: true },
                },
            },
        });

        if (data) {
            return res.status(status.OK).json(data);
        }

        return res.status(status.NO_CONTENT).json({
            message: 'No Data!',
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function setRolePermission(req: Request, res: Response) {
    try {
        const {roleId, permissions } = req.body;
        const roleP = await prisma.rolePermission.findMany({
            where: {
                roleId: Number(roleId),
            },
            select: {
                permissionId: true
            }
        });

        const roleWithPermission = roleP.map(permission=> permission.permissionId)
        const inputBody = [];
        for (let index: number= 0; index < permissions?.length; index ++){
            let flag: boolean = false;
            for (let innerloop: number = 0; innerloop < roleWithPermission?.length; innerloop++){
                if(roleWithPermission[innerloop] == permissions[index]){
                    flag = true
                }
            }
            if(!flag){
                inputBody.push({roleId: Number(roleId), permissionId: Number(permissions[index])})
            }
        }
        const data = await prisma.rolePermission.createMany({
            data: inputBody
        })

        res.status(status.OK).json(data)

    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}

export async function removeRolePermission(req: Request, res: Response) {
    try {
        const {
            roleId,
            permissions
        } = req.body;

        for (let index: number= 0; index < permissions?.length; index ++){
            await prisma.rolePermission.deleteMany({
                where: {
                    AND: [
                        {
                            roleId: Number(roleId),
                            permissionId: Number(permissions[index]),
                        },
                    ],
                },
            });
        }

        return res.status(status.OK).json({
            status: true,
            message: 'Deleted  Succesfully :('
        });
    } catch (err) {
        return res.status(status.INTERNAL_SERVER_ERROR).json({
            message: 'Internal error',
            err,
        });
    }
}
