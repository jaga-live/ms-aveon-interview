import {Response, NextFunction } from "express";
import { Req } from "../../../core/custom_types/custom.types";
import { HttpException } from "../../../core/exception";
import { ROLES } from "../../user/enum/roles";

export const RolesGuard = (roles: any) => {
    return (req: Req, res: Response,next: NextFunction) => {
        const currentUser = req.userData.role
        if (!roles.includes(currentUser)) throw new HttpException('Roles has no sufficient permissions', 403)
        next()
    }
}