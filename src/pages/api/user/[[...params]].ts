import { AuthGuard } from "middlewares/auth-guard";
import { CatchException } from "middlewares/catch-exception";
import { createHandler, Delete, Get, Param } from "next-api-decorators";
import { UserService } from "services/user-service";

@AuthGuard()
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
