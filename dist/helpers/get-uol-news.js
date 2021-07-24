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
exports.getUolNews = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var getUolNews = function () { return __awaiter(void 0, void 0, void 0, function () {
    var siteData, $, pageData, mainManchet, h1, image, img, submancheteList;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, axios_1.default
                    .get('https://www.uol.com.br')
                    .then(function (response) { return response.data; })
                    .catch(function () { return null; })];
            case 1:
                siteData = _d.sent();
                if (!siteData) {
                    return [2 /*return*/, null];
                }
                $ = cheerio_1.default.load(siteData);
                pageData = {
                    sourceName: 'uol',
                    news: [],
                };
                mainManchet = $('a.manchete-editorial')[0];
                h1 = $(mainManchet).find('h1')[0];
                image = $(mainManchet).find('figure img')[0];
                img = ((_a = $(image).data('original')) !== null && _a !== void 0 ? _a : $(image).data('src'));
                pageData.news.push({
                    link: (_b = mainManchet === null || mainManchet === void 0 ? void 0 : mainManchet.attribs) === null || _b === void 0 ? void 0 : _b.href,
                    img: img,
                    title: (_c = $(h1)) === null || _c === void 0 ? void 0 : _c.text(),
                });
                submancheteList = $('.submanchete');
                submancheteList.each(function (i, $el) {
                    var _a, _b, _c;
                    var h1 = $($el).find('h2')[0];
                    var image = $($el).find('img')[0];
                    var anchor = $($el).find('a')[0];
                    var img = ((_a = $(image).data('original')) !== null && _a !== void 0 ? _a : $(image).data('src'));
                    pageData.news.push({
                        link: (_b = anchor === null || anchor === void 0 ? void 0 : anchor.attribs) === null || _b === void 0 ? void 0 : _b.href,
                        img: img,
                        title: (_c = $(h1)) === null || _c === void 0 ? void 0 : _c.text(),
                    });
                });
                return [2 /*return*/, pageData];
        }
    });
}); };
exports.getUolNews = getUolNews;
