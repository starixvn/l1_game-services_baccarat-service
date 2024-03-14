import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { startTrace } from "sc-instrument";

startTrace(appConfigs.otel?.enabled, appConfigs.otel?.endpoint, appConfigs.otel?.system, appConfigs.sentry.env, gameSettings.name);

import { Core, Table } from "sc-game-base";

import BaccaratContainerRegistry from "./baccarat-container-registry";
import { resultHelper } from "./helpers";

const run = async () => {
    const definition = new Table.TableGameDefinition(
        gameSettings,
        resultHelper.generateResult,
        resultHelper.getSettlementResult,
        resultHelper.generateRawResultForHash
    );
    const gameData = new Table.TableGameData(gameSettings.durations.wholeRound);

    const container = new BaccaratContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("Baccarat", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
