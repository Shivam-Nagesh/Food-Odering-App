import axios from 'axios'
import React from 'react'

const TempButton = () => {

    const clickHandler = async (e) => {
        // try {
        //     let places = await axios('https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food,catering.cafe&filter=place:5192c278ae45465340593cc7c56416ab3c40f00101f90152da350000000000c0020692030d5061736368696d205669686172&limit=500&apiKey=a147945bd6fc459ebaa60ba6685ecf3e');
        //     console.log(places.data);
        // }
        // catch (e) {
        //     console.log(error);
        // }

        try {
            await axios.get('http://localhost:3500/temp/dumpResturants');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={clickHandler}>returant add from here</button>
    )
}

export default TempButton