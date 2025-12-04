export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "https://hd-api.lumigame.com",
        authUrl: "https://hd-auth.lumigame.com",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 2000,
        enabledApiLogs: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://hotdog_backend:HotdogBackend@10.10.50.12:39400,10.10.50.13:39400,10.10.50.14:39400/?replicaSet=SPLocal0&appName=Baccarat",
        options: {
            dbName: "hotdog_minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    sentry: {
        sentryUrl: "http://e6e2bdc2d3ab40c682d0d27c1b1f912a@sentry.lumigame.com/13",
        logIdentifier: "baccarat",
        env: "LOCAL",
    },
    authenticateSettings: {
        url: "https://hd-auth.lumigame.com",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "https://hd-proxy.lumigame.com/user",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    enableMsgpackParser: false,
};
