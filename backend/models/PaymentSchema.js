import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true,
        unique: false,
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuario",
            required: false,
            unique: false,
        }
    },
    collection_id: {
        type: String,
        required: true,
        unique: false,
    },
    collection_status: {
        type: String,
        required: true,
        unique: false,
    },
    payment_id: {
        type: String,
        required: true,
        unique: false,
    },
    status: {
        type: String,
        required: true,
        unique: false,
    },
    payment_type: {
        type: String,
        required: true,
        unique: false,
    },
    merchant_order_id: {
        type: String,
        required: true,
        unique: false,
    },
    preference_id: {
        type: String,
        required: true,
        unique: false,
    },
    site_id: {
        type: String,
        required: true,
        unique: false,
    },
    processing_mode: {
        type: String,
        required: true,
        unique: false,
    },

    }, { timestamps: true });

export const Payment = mongoose.model("payment", paymentSchema);