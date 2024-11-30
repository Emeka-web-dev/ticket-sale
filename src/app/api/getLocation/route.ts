import { NextResponse } from "next/server";
import axios from "axios";
import qs from "query-string";
import { LocationData } from "../../../../typings";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get("location");
    const apiRoute = "https://wft-geo-db.p.rapidapi.com/v1/geo/places";

    const url = qs.stringifyUrl({
      url: apiRoute,
      query: {
        countryIds: "NG",
        namePrefix: location,
        limit: 10,
      },
    });

    const locationDetails: LocationData[] = [];
    const response = await axios.get(url, {
      headers: {
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "Content-Type": "application/json",
      },
    });

    response.data.data.forEach((place: LocationData) => {
      return locationDetails.push({
        name: place.name,
        latitude: place.latitude,
        longitude: place.longitude,
        id: place.id,
      });
    });

    return NextResponse.json(locationDetails);
  } catch (error) {
    console.log("INTERNAL_ERROR", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
