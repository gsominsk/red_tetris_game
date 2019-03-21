import io                       from "socket.io-client"

class Socket {
    constructor() {
        this.socket = io.connect("http://localhost:3000");
    }
}

export default new Socket();