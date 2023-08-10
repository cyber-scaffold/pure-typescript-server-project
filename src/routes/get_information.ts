import { Router } from "express";
import { responseWrap } from "@/utils/responseWrap";

export const router = Router();

/**
 * @openapi
 * /api/get_information:
 *   get:
 *     tags:
 *       - 信息类
 *     summary: ddddd
 *     description: dffffff!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/api/get_information", responseWrap(async () => {


}));