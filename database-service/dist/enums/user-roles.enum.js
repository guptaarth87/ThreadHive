"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERROLE = void 0;
const graphql_1 = require("@nestjs/graphql");
var USERROLE;
(function (USERROLE) {
    USERROLE["ADMIN"] = "ADMIN";
    USERROLE["SUPERADMIN"] = "SUPERADMIN";
    USERROLE["USER"] = "USER";
})(USERROLE || (exports.USERROLE = USERROLE = {}));
(0, graphql_1.registerEnumType)(USERROLE, {
    name: 'USERROLE',
});
//# sourceMappingURL=user-roles.enum.js.map