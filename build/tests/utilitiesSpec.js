"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utilities_1 = __importDefault(require("../utilities/utilities"));
describe('utilities tests', function () {
    it('should return a string', function () {
        var string = utilities_1.default.buildFilePath('test');
        expect(string).toContain('');
    });
});
