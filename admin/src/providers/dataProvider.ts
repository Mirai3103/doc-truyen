import graphqlDataProvider, { GraphQLClient } from "@refinedev/graphql";
import { axiosInstance } from "./axios";
const API_URL = "https://api.nestjsx-crud.refine.dev";
const client = new GraphQLClient(API_URL, {
  fetch: async (url: string, options: any) => {
    try {
      const response = await axiosInstance.request({
        data: options.body,
        url,
        ...options,
      });

      return { ...response, data: response.data };
    } catch (error: any) {
      const messages = error?.map((error: any) => error?.message)?.join("");
      const code = error?.[0]?.extensions?.code;

      return Promise.reject({
        message: messages || JSON.stringify(error),
        statusCode: code || 500,
      });
    }
  },
});
/**
 * Create the data provider with the custom client.
 */
const dataProvider = graphqlDataProvider(client);
export default dataProvider;
