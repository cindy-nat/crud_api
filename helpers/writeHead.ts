export const writeHead = (res, code) => {
  res.writeHead(code, { "Content-Type": "application/json" });
};
