const net = require('net');
const dgram = require('dgram');
//获取本地时间字符串
function getDateStr() {
    return (new Date()).toLocaleString();
}
// 创建TCP代理
function proxyTCP(key, conf) {

    let [bind, server] = [conf.bind, conf.server];
    let tcpServer = net.createServer((c) => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - TCP Client connect ${c.remoteAddress}:${c.remotePort}`);
        // 192.168.1.1 :80
        let client = net.connect({ port: server[1], host: server[0] }, () => {
            c.pipe(client);
        });
        client.pipe(c);
        client.on('error', (err) => {//read ECONNRESET 主动中断
            console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
            c.destroy();
        });
        c.on('error', (err) => {
            console.error(`[${getDateStr()}] [${key}] [ERROR] -  ${err}`);
            client.destroy();
        });
    });
    tcpServer.listen({ host: bind[0], port: bind[1] }, () => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - TCP Server start ${bind[0]}:${bind[1]}`);
    });
    return tcpServer;
}
// 创建UDP代理
function proxyUDP(key, conf) {
    let [bind, server] = [conf.bind, conf.server];
    const serverUDP = dgram.createSocket('udp4');
    serverUDP.on('error', (err) => {
        console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
    });
    serverUDP.on('message', (msg, rinfo) => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - UDP Client connect ${rinfo.address}:${rinfo.port} `);
        let client = dgram.createSocket('udp4');
        client.on('error', (err) => {
            console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
            client.close();
        });
        client.on('message', (fbMsg, fbRinfo) => {
            serverUDP.send(fbMsg, rinfo.port, rinfo.address, (err) => {
                if (err) console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
            });
            client.close();
        });
        client.send(msg, server[1], server[0], (err) => {
            if (err) {
                console.error(`[${getDateStr()}] [${key}] [ERROR] - ${err}`);
                client.close();
            }
        });
    });
    serverUDP.bind(bind[1], bind[0], () => {
        console.info(`[${getDateStr()}] [${key}] [INFO] - UDP Server start ${bind[0]}:${bind[1]}`);
    });
    return serverUDP;
}

const proxyConfig = {
    "http": {
        mode: "tcp",
        bind: ["0.0.0.0", 8087],
        server: ['192.168.1.1', 80]
    },
    "dns": {
        mode: "udp",
        bind: ["0.0.0.0", 53],
        server: ['118.118.118.118', 53]
    },
    "远程": {
        mode: "tcp",
        bind: ["0.0.0.0", 13333],
        server: ['192.168.1.17', 3389]
    },
};
const servers = {};
for (let k in proxyConfig) {
    let conf = proxyConfig[k];
    if (conf.mode == "tcp") {
        servers[k] = proxyTCP(k, conf);
    } else if (conf.mode == "udp") {
        servers[k] = proxyUDP(k, conf);
    }
}

