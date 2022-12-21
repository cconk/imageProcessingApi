"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utilities_1 = __importDefault(require("../../utilities/utilities"));
var images = express_1.default.Router();
images.get('/', function (req, res) {
    res.send("<p>You can use this api to process images by supplying the query parameters to the following path. For Example\n    /api/images/process?filename=sampleFile&height=200&width=200 will return a file resized to the height and width parameters given\n    and with a filename of sampleFile.</p>");
});
images.get('/process', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, height, width, thumbFileCheck;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                filename = (_a = req.query.filename) === null || _a === void 0 ? void 0 : _a.toString();
                height = (_b = req.query.height) === null || _b === void 0 ? void 0 : _b.toString();
                width = (_c = req.query.width) === null || _c === void 0 ? void 0 : _c.toString();
                if (!(!filename || !height || !width)) return [3 /*break*/, 1];
                res.send('Please enter all necessary parameters for your file to be diplayed including filename, height and width.');
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, utilities_1.default.checkForThumbFile(filename).then(function (value) {
                    return value;
                })];
            case 2:
                thumbFileCheck = _d.sent();
                if (!!thumbFileCheck) return [3 /*break*/, 4];
                //if no file exists then create it based on imaged given and return it to browser compensating for processing delay
                return [4 /*yield*/, utilities_1.default.buildThumbFile(filename, Number(height), Number(width)).then(function () {
                        res.setTimeout(4000, function () {
                            res.sendFile(utilities_1.default.buildThumbFilePath(filename));
                        });
                    })];
            case 3:
                //if no file exists then create it based on imaged given and return it to browser compensating for processing delay
                _d.sent();
                return [3 /*break*/, 5];
            case 4:
                //if file is cached return it with no processing delay
                res.sendFile(utilities_1.default.buildThumbFilePath(filename));
                _d.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = images;
