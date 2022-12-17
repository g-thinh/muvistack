import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { createRequest, createResponse, RequestOptions } from "node-mocks-http";
import helloHandler from "pages/api/hello";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type APiResponse = NextApiResponse & ReturnType<typeof createResponse>;

describe("/api/hello", () => {
  async function testRequest(handler: NextApiHandler, options: RequestOptions) {
    const req = createRequest<ApiRequest>(options);
    const res = createResponse<APiResponse>();

    await handler(req, res);

    return { req, res };
  }
  it("returns a message that says OK", async () => {
    const { req, res } = await testRequest(helloHandler, {
      method: "GET",
      url: "/api/hello",
    });

    expect(res.statusCode).toBe(200);
    expect(res._getData()).toEqual({ message: "OK" });
  });
});
