const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    order_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "orders"
    },
    payerId: {
        type: String,
    },
    status: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    },
    paypal_id: {
        type: String,
    },
    payer: {
        type: Object,
    },
    transaction: [{
        type: Object,
    }]

}, {
    timestamps: true
})




module.exports = mongoose.model('Transaction', TransactionSchema);