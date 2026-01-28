import axios from "axios";

export class CurrencyService {
    private static API_URL = "https://api.exchangeratesapi.io/v1";
    private static API_KEY = process.env.EXCHANGE_API_KEY!;

    static async convert(
        amount: number,
        from: string,
        to: string,
    ): Promise<number> {
        if (from === to) return amount;

        const options = {
            method: 'GET',
            url: `${this.API_URL}/latest`,
            params: {
                base: from,
                symbols: to,
                access_key: this.API_KEY,
            },
            headers: {Accept: 'application/json'}
        };

        const {data} = await axios.request(options);
        if (!data?.success) {
            throw new Error("Currency API error");
        }

        const rate = data.rates[to];
        if (!rate) {
            throw new Error(`Rate not found for ${to}`);
        }

        return amount * rate;
    }
}
