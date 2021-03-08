import { Core } from "sc-game-base";
import { resultHelper } from "../helpers/index";

export default class BaccaratRoundQuery extends Core.QueryApis.RoundQuery {
    convertSettlementResult(roundResult) {
        return resultHelper.getSettlementResult(roundResult);
    }

    convertResult(round) {
        return {
            player: round.player,
            banker: round.banker,
        };
    }
}
