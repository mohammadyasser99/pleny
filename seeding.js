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
const faker_1 = require("@faker-js/faker");
const brands_schema_1 = require("./brands-schema");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/plenyDb');
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 10; i++) {
        const newBrand = new brands_schema_1.Brand({
            brandName: faker_1.faker.company.name(),
            yearFounded: faker_1.faker.number.int({ min: 1600, max: new Date().getFullYear() }),
            headquarters: faker_1.faker.location.city(),
            numberOfLocations: faker_1.faker.number.int({ min: 1 }),
        });
        yield newBrand.save();
    }
});
seedData().then(() => {
    console.log('Data seeding complete');
}).catch(error => {
    console.error('Error during data seeding:', error);
});
