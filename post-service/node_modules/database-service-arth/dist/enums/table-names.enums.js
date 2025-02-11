"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TABLENAME = void 0;
const graphql_1 = require("@nestjs/graphql");
var TABLENAME;
(function (TABLENAME) {
    TABLENAME["ACTIVITIES"] = "ACTIVITIES";
    TABLENAME["COMMENTS"] = "COMMENTS";
    TABLENAME["LIKES"] = "LIKES";
    TABLENAME["REPLIES"] = "REPLIES";
    TABLENAME["USERS"] = "USERS";
    TABLENAME["POSTS"] = "POSTS";
    TABLENAME["CHANNELS"] = "CHANNELS";
    TABLENAME["USERCHANNELMAPPING"] = "USERCHANNELMAPPING";
})(TABLENAME || (exports.TABLENAME = TABLENAME = {}));
(0, graphql_1.registerEnumType)(TABLENAME, {
    name: 'TABLENAME',
});
//# sourceMappingURL=table-names.enums.js.map