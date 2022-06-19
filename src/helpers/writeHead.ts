import { ServerResponse } from "http";

export const writeHead = (res: ServerResponse, code: number) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
};
