import cluster from "cluster";
import { cpus } from "os";
import { server } from "./server.js";
import * as dotenv from "dotenv";

dotenv.config()

const totalCPUs = cpus().length;
const PORT = process.env.PORT || 4001;

if(cluster.isMaster) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
}
else {
  server.listen(PORT, () => {
    console.log(`Worker ${cluster.worker.id} launched on port: ${PORT}`);
  });
}




