import { Core } from "sc-game-base";
import { resultHelper } from "../helpers/index";

export default class BaccaratRoundQuery extends Core.QueryApis.RoundQuery {
    async getList(limit, projections) {
        const rounds = await this.roundsRepository
            .find({}, projections, { sort: { _id: -1 }, limit: limit })
            .lean()
            .exec();

        return rounds.map((round) => {
            const result = round.result && round.result.tie === undefined ? round.result : this.convertResult(round);
            const settlementResult = round.settlementResult ?? this.convertSettlementResult(result);

            return {
                roundId: round.id,
                result,
                settlementResult,
            };
        });
    }

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
