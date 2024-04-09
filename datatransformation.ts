import mongoose from "mongoose";
import { Brand } from './brands-schema';
mongoose.connect('mongodb://localhost:27017/plenyDb'); // Replace with your MongoDB URI

const transformData = async () => {

    const brands = await Brand.find();
    for (const brand of brands) {
brand.brandName = String( brand.brandName ) || String( brand.brand.name ) || 'Unknown'; // Set brand name to 'Unknown' if it is missing
brand.yearFounded = Number(brand.yearFounded)  || Number(brand.yearCreated)  || 1600; // Set year founded to 1900 if it is missing
  brand.headquarters = String(brand.headquarters) || 'Unknown'; // Set headquarters to 'Unknown' if it is missing

//brand.numberOfLocations = 1; // Set number of locations to 1 if it is missing

if(typeof brand.numberOfLocations !== 'number'){
brand.numberOfLocations =1;
}



      try {
      //  await brand.validate(); // Validate against the schema
        await brand.save(); // Save if validation passes
        console.log(`Updated brand: ${brand.brandName}`);
      } catch (error) {
        console.error(`Validation failed for brand: ${brand.brandName}`, error);
      }
    }
    
    };

transformData().then(() => {
  console.log('Data transformation complete');
  mongoose.connection.close();
}).catch(error => {
  console.error('Error during data transformation:', error);
  mongoose.connection.close();
});
