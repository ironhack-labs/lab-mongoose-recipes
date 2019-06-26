"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GetCodeGecha = function () {
    var fecha = new Date();
    var codeFecha = fecha.getFullYear().toString();
    var m = fecha.getMonth() + 1;
    codeFecha += (m < 10 ? "0" : "") + m.toString();
    m = fecha.getDate();
    codeFecha += (m < 10 ? "0" : "") + m.toString();
    m = fecha.getHours();
    codeFecha += " " + (m < 10 ? "0" : "") + m.toString();
    m = fecha.getMinutes();
    codeFecha += ":" + (m < 10 ? "0" : "") + m.toString();
    return codeFecha;
};
exports.default = GetCodeGecha;
//# sourceMappingURL=GetCodeFecha.js.map