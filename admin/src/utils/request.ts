import { GraphQLClient } from "graphql-request";
import axios from "axios";
const endpoint = "http://localhost:8080/graphql";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const gqlClient = new GraphQLClient(endpoint, {});
