import { faker } from '@faker-js/faker';
import {Brand} from "./brands-schema";
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/plenyDb');
const seedData = async () => {
  for (let i = 0; i < 10; i++) {
    const newBrand = new Brand({
      brandName: faker.company.name(),
      yearFounded: faker.number.int({ min: 1600, max: new Date().getFullYear() }),
      headquarters: faker.location.city(),
      numberOfLocations: faker.number.int({ min: 1 }),
    });

    await newBrand.save();
  }
};

seedData().then(() => {
  console.log('Data seeding complete');
}).catch(error => {
  console.error('Error during data seeding:', error);
});
