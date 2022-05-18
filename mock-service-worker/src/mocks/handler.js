import { rest } from "msw";

export const handlers = [
  rest.get("/login", async (req, res, ctx) => {
    return res(
      ctx.json({
        id: "fdf3rf2-vdasv-vklkmm43",
        firstName: "Hong",
        lastName: "Kyle",
      })
    );
  }),
  rest.get(
    "https://raw.githubusercontent.com/techoi/raw-data-api/main/simple-api.json",
    async (req, res, ctx) => {
      const id = req.url.searchParams.get("id");

      const originalResponse = await ctx.fetch(req);
      const originalResponseData = await originalResponse.json();

      return res(
        // ctx.status(403),
        // // And a response body, if necessary
        // ctx.json({
        //   errorMessage: "Data not Found",
        // })
        ctx.json({
          data: {
            people: [
              ...originalResponseData.data.people,
              {
                name: id,
                age: 135,
              },
            ],
          },
        })
      );
    }
  ),
];
