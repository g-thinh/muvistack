import Ably, { Types } from "ably/promises";
import { CatchException } from "middlewares/catch-exception";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  BadRequestException,
  createHandler,
  Get,
  HttpCode,
  Req,
  Res,
} from "next-api-decorators";

const api_key = process.env.ablyApiKey as string;

/**
 * authenticates client to the Ably pub/sub service using a token
 * @see {@link https://ably.com/blog/realtime-chat-app-nextjs-vercel#realtime-pub-sub-messaging-with-ably}
 */
@CatchException()
class AblyHandler {
  @HttpCode(200)
  @Get("/createTokenRequest")
  public async createToken(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse<Types.TokenRequest>
  ) {
    try {
      const clientId = req.query.clientId as string;
      const client = new Ably.Realtime(api_key);
      const tokenRequestData = await client.auth.createTokenRequest({
        clientId,
      });

      res.json(tokenRequestData);
    } catch (error) {
      const e = error as Types.ErrorInfo;
      throw new BadRequestException(e.message);
    }
  }
}

export default createHandler(AblyHandler);
