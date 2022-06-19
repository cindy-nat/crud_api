import { IncomingMessage } from "http";

export const getPostData = (req: IncomingMessage) => new Promise((resolve, reject) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
  } catch (error) {
    reject(error);
  }
});
