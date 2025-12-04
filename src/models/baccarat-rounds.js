import mongoose from "mongoose";

const modelName = "baccarat_phien";

const cardSchema = new mongoose.Schema(
    {
        card: Number,
        type: Number,
    },
    { _id: false }
);

const handSchema = new mongoose.Schema(
    {
        card1: { type: cardSchema, required: false },
        card2: { type: cardSchema, required: false },
        card3: { type: cardSchema, required: false },
    },
    { _id: false }
);

const settlementResultSchema = new mongoose.Schema(
    {
        player: { type: Boolean, default: false },
        banker: { type: Boolean, default: false },
        big: { type: Boolean, default: false },
        small: { type: Boolean, default: false },
        tie: { type: Boolean, default: false },
        playerPair: { type: Boolean, default: false },
        bankerPair: { type: Boolean, default: false },
        natural: { type: Boolean, default: false },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    player: { type: handSchema, required: false },
    banker: { type: handSchema, required: false },
    result: settlementResultSchema,
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, required: true },
});

export default mongoose.model(modelName, Schema);
