import { CatchException } from "middlewares/catch-exception";
import { createHandler, Get, HttpCode } from "next-api-decorators";

/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: returns a message that says OK
 *     tags:
 *       - hello
 *     responses:
 *       200:
 *         description: OK
 */
@CatchException()
class TestHandler {
  @HttpCode(200)
  @Get()
  public test() {
    return { message: "OK" };
  }
}

export default createHandler(TestHandler);
