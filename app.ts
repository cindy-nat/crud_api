import {server} from "./server";
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4001;

server.listen(PORT, () =>
  console.log(`The server is launched on Port ${PORT}`)
);
