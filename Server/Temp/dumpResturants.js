import axios from "axios";
import Restaurant from "../model/resturant.js";
import express from 'express';

const router = express.Router();

router.get('/dumpResturants', async (req, res) => {
  let places;
  let address =
    "https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food,catering.cafe&filter=circle:77.06484160025661,28.63601316523024,7000&bias=proximity:77.06484160025661,28.63601316523024&limit=500";
  let apikey = "apiKey=a147945bd6fc459ebaa60ba6685ecf3e";
  try {
    // a147945bd6fc459ebaa60ba6685ecf3e
    places = await axios(`${address}&${apikey}`);
    // console.log(places.data.features);
  } catch (e) {
    console.log(error);
  }
  let count = 0;
  let alreadyexist = 0;
  const prefix = places.data.features;
  console.log("places.data.features.length : ", places.data.features.length);
  try {
    for (let i = 0; i < places.data.features.length; i++) {
      if (!prefix[i].properties.name || !prefix[i].properties.formatted || !prefix[i].properties.county || !prefix[i].properties.state || !prefix[i].properties.lat || !prefix[i].properties.lon) 
        continue;
    //   console.log(prefix[i].properties.name, prefix[i].properties.formatted, prefix[i].properties.county, prefix[i].properties.state, prefix[i].properties.lat, prefix[i].properties.lon) ;
      const resturant = await Restaurant.findOne({
        name: prefix[i].properties.name,
      });

      if (resturant) {
        const location = {
            address: prefix[i].properties.formatted,
            city: prefix[i].properties.county,
            state: prefix[i].properties.state,
            coordinates: {
              latitude: prefix[i].properties.lat,
              longitude: prefix[i].properties.lon,
            },
        };
        const checklocation = await Restaurant.findOne({
          name: prefix[i].properties.name,
          locations: {
            $elemMatch: {
              "coordinates.latitude": location.coordinates.latitude,
              "coordinates.longitude": location.coordinates.longitude,
            },
          },
        });
        if (checklocation) {
          console.log("alreadyexist ", resturant.name);
          alreadyexist++;
          continue;
        }
        count++;
        await Restaurant.updateOne(
          { _id: resturant._id },
          {
            $push: {
              locations: location,
            },
          }
        );
        console.log(`resturant updated ${resturant.name}`);
      } else {
        count++;
        await Restaurant.create({
          name: prefix[i].properties.name,
          description: prefix[i].properties.name,
          locations: [
            {
              address: prefix[i].properties.formatted,
              city: prefix[i].properties.county,
              state: prefix[i].properties.state,
              coordinates: {
                latitude: prefix[i].properties.lat,
                longitude: prefix[i].properties.lon,
              },
            },
          ],
        });
        console.log("new account created");
      }
    }
    console.log("added: ", count);
    console.log("already Exists", alreadyexist);
  } catch (e) {
    console.log(e);
  }

  return res.sendStatus(200);
});

export default router;