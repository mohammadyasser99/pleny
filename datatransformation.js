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
const mongoose_1 = __importDefault(require("mongoose"));
const brands_schema_1 = require("./brands-schema");
mongoose_1.default.connect('mongodb://localhost:27017/plenyDb'); // Replace with your MongoDB URI
const transformData = () => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield brands_schema_1.Brand.find();
    for (const brand of brands) {
        brand.brandName = String(brand.brandName) || String(brand.brand.name) || 'Unknown'; // Set brand name to 'Unknown' if it is missing
        brand.yearFounded = Number(brand.yearFounded) || Number(brand.yearCreated) || 1600; // Set year founded to 1900 if it is missing
        brand.headquarters = String(brand.headquarters) || 'Unknown'; // Set headquarters to 'Unknown' if it is missing
        //brand.numberOfLocations = 1; // Set number of locations to 1 if it is missing
        if (typeof brand.numberOfLocations !== 'number') {
            brand.numberOfLocations = 1;
        }
        try {
            //  await brand.validate(); // Validate against the schema
            yield brand.save(); // Save if validation passes
            console.log(`Updated brand: ${brand.brandName}`);
        }
        catch (error) {
            console.error(`Validation failed for brand: ${brand.brandName}`, error);
        }
    }
});
transformData().then(() => {
    console.log('Data transformation complete');
    mongoose_1.default.connection.close();
}).catch(error => {
    console.error('Error during data transformation:', error);
    mongoose_1.default.connection.close();
});
