import { AuthGuard } from "middlewares/auth-guard";
import { CatchException } from "middlewares/catch-exception";
import { RoleGuard } from "middlewares/role-guard";
import { createHandler, Delete, Get, Param } from "next-api-decorators";
import { UserService } from "services/user-service";

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: returns all users
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: OK
 */
@AuthGuard()
@RoleGuard(["ADMIN"])
@CatchException()
class UserHandler {
  constructor(private readonly userService: UserService) {
    this.userService = new UserService();
  }

  @Get()
  public listAll() {
    return this.userService.findAll();
  }

  @Get("/:id")
  public getProfile(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Delete("/:id")
  public async deleteProfile(@Param("id") id: string) {
    return this.userService.removeById(id);
  }
}

export default createHandler(UserHandler);
