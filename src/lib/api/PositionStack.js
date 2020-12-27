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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionStack = void 0;
const axios_1 = __importDefault(require("axios"));
exports.PositionStack = {
    geocode: (address) => __awaiter(void 0, void 0, void 0, function* () {
        const params = {
            access_key: process.env.POSITIONSTACK_GEOCODE_KEY,
            query: address,
        };
        try {
            const res = yield axios_1.default.get('http://api.positionstack.com/v1/forward', {
                params,
            });
            const data = res.data.data[0];
            let country = null;
            let admin = null;
            let city = null;
            if (data.country) {
                country = data.country;
            }
            if (data.region) {
                admin = data.region;
            }
            if (data.locality) {
                city = data.locality;
            }
            return { country, admin, city };
        }
        catch (err) {
            throw new Error(err.message);
        }
    }),
};
