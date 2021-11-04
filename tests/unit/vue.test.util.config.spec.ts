import { config } from "@vue/test-utils";

config.global.mocks.$t = (key: string, ...args: unknown[]) =>
  key + args.map((x) => x).toString();
