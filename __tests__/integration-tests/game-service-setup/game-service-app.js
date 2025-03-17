import { Core, Table } from "sc-game-base";
import { initAPIStub, stubUserService } from "sc-game-service-integration-utils";

import appConfigs from "../../../src/app-configs.IGT";
import BaccaratContainerRegistry from "../../../src/baccarat-container-registry";
import gameSettings from "../../../src/game-settings";
import { resultHelper } from "../../../src/helpers";
import { registerViewModule } from "../../../src/register-view-module";
import GameData from "../../../src/game-data";

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    stubUserService(appConfigs);
    const definition = new Table.TableGameDefinition(
        gameSettings,
        resultHelper.generateResult,
        resultHelper.getSettlementResult,
        resultHelper.generateRawResultForHash
    );
    const gameData = new GameData(gameSettings.durations.wholeRound);

    const container = new BaccaratContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("Baccarat", appConfigs);
    await app.run();
    await app.startGame(container);
    registerViewModule(app, container, definition);
};

run();
