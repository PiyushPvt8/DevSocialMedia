const monggose = require('mongoose');


const connectionRequestSchema = new monggose.Schema({
    fromUserId: {
        type: monggose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    toUserId: {
        type: monggose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['ignored', 'interested', 'accepted', 'rejected'],
            Message: `{VALUE} is not a valid status`
        }
    }
}, 
{ timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }, { unique: true });

connectionRequestSchema.pre("save", async function () {
    if (this.fromUserId.equals(this.toUserId)) {
        throw new Error("You cannot send a connection request to yourself");
    }
});

const ConnectionRequestModel = new monggose.model('ConnectionRequest', connectionRequestSchema);

module.exports = ConnectionRequestModel;