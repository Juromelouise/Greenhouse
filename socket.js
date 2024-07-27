import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://192.168.180.169:8080";

const config = {
  autoConnect: false,
};

export const socket = io(URL, config);
