import { CoinQuote } from "@/app/types";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  const res = await axios.get<{
    data: Record<string, CoinQuote>;
  }>("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest", {
    headers: {
      Accepts: "application/json",
      "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
    },
    params: {
      id: id,
    },
  });

  const coinData = res.data.data[`${id}`];

  return NextResponse.json(coinData);
}
