"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIKETYPE = void 0;
const graphql_1 = require("@nestjs/graphql");
var LIKETYPE;
(function (LIKETYPE) {
    LIKETYPE["POST"] = "POST";
    LIKETYPE["COMMENT"] = "COMMENT";
    LIKETYPE["REPLY"] = "REPLY";
})(LIKETYPE || (exports.LIKETYPE = LIKETYPE = {}));
(0, graphql_1.registerEnumType)(LIKETYPE, {
    name: 'LIKETYPE',
});
//# sourceMappingURL=like-type.enum.js.map