import awilix from "awilix";
import { Table } from "sc-game-base";
import { OutGameConsumer, PlaceBetConsumer, RoundResultConsumer, SettleGameRoundConsumer } from "./consumers";
import { Bot, BaccaratProcessBetQueue } from "./crons/index";
import { bets, hourlySummaries, results, rounds, tmpBets } from "./models";
import BaccaratRoundQuery from "./query-apis/baccarat-round-query";
import RTPQuery from "./query-apis/rtp-query";
import { HttpRouter, SocketRouter } from "./routers";

const { asClass, asValue } = awilix;

export default class BaccaratContainerRegistry extends Table.TableContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            resultsRepository: asValue(results),
            hourlySummariesRepository: asValue(hourlySummaries),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(PlaceBetConsumer).singleton(),
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
            roundResultConsumer: asClass(RoundResultConsumer).singleton(),
            userDisconnectConsumer: asClass(OutGameConsumer).singleton(),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            bot: asClass(Bot).singleton(),
            processBetQueue: asClass(BaccaratProcessBetQueue).singleton().proxy(),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            roundQuery: asClass(BaccaratRoundQuery).singleton(),
            rtpQuery: asClass(RTPQuery).singleton(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            socketRouter: asClass(SocketRouter).proxy(),
            httpRouter: asClass(HttpRouter),
        });
    }
}
