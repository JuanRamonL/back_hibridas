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
        }
    },
    collection_id: {
        type: String,
        required: true,
    },
    collection_status: {
        type: String,
        required: true,
    },
    payment_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
    },
    merchant_order_id: {
        type: String,
        required: true,
    },
    preference_id: {
        type: String,
        required: true,
    },
    site_id: {
        type: String,
        required: true,
    },
    processing_mode: {
        type: String,
        required: true,
    },

    }, { timestamps: true });

export const Payment = mongoose.model("payment", paymentSchema);