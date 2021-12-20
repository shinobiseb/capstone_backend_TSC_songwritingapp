"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose = require("mongoose");
var ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
});
var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
}, { strict: false });
exports.User = mongoose.model("users", UserSchema);
//# sourceMappingURL=Users.js.map