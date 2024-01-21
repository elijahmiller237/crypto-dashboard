import { CoinOption } from "@/app/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const searchStr = queryParams.get("searchStr")?.toLocaleLowerCase();

  const res = await axios.get<{ data: CoinOption[] }>(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
    {
      headers: {
        Accepts: "application/json",
        "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
      },
    }
  );

  const seenNames = new Set<string>();
  const seenIds = new Set<number>();
  const coinOptions = res.data.data.filter((option) => {
    if (seenIds.has(option.id) || seenNames.has(option.name)) return false;
    seenIds.add(option.id);
    seenNames.add(option.name);

    return searchStr == null || option.name.toLowerCase().startsWith(searchStr);
  });

  return NextResponse.json(coinOptions);
}
