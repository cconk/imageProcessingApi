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
exports.fileExtension = exports.thumbImagesPath = exports.imagesPath = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
exports.imagesPath = path_1.default.resolve(__dirname, '../../images/normal');
exports.thumbImagesPath = path_1.default.resolve(__dirname, '../../images/thumbs');
exports.fileExtension = '.jpg';
var ImageUtilities = /** @class */ (function () {
    function ImageUtilities() {
    }
    //seting up as a function so additional file types png gif etc. might be used in the future
    ImageUtilities.buildFilePath = function (filename) {
        return "".concat(exports.imagesPath, "\\").concat(filename).concat(exports.fileExtension);
    };
    //builds the thumb file path to send to the route
    ImageUtilities.buildThumbFilePath = function (filename, height, width) {
        var newFileName = filename && height && width ? filename + height + width : undefined;
        return "".concat(exports.thumbImagesPath, "\\").concat(newFileName).concat(exports.fileExtension);
    };
    //creates the new thumb file if it does not already exist
    ImageUtilities.buildThumbFile = function (filename, height, width) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbPath, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        thumbPath = this.buildThumbFilePath(filename, height, width);
                        path = this.buildFilePath(filename);
                        return [4 /*yield*/, (0, sharp_1.default)(path)
                                .resize(Number(height), Number(width))
                                .toFile(thumbPath, function () {
                                return;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Your image file called ".concat(filename, " was resized to a height of ").concat(height, " and a width of ").concat(width, ".")];
                }
            });
        });
    };
    //checks to see if the file already exists
    ImageUtilities.checkForThumbFile = function (filename, height, width) {
        return __awaiter(this, void 0, void 0, function () {
            var thumbPath, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        thumbPath = this.buildThumbFilePath(filename, height, width);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs_1.promises.access(thumbPath)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ImageUtilities;
}());
exports.default = ImageUtilities;
