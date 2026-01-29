import axios from "axios";

export class CurrencyService {
    private static API_URL = "https://v6.exchangerate-api.com/v6/";
    private static API_KEY = process.env.EXCHANGE_API_KEY!;

    static async getRate(
        from: string,
        to: string,
    ): Promise<number> {
        if (from === to) return 1;

        const options = {
            method: 'GET',
            url: `${this.API_URL}/${this.API_KEY}/pair/${from}/${to}`,
            headers: {Accept: 'application/json'}
        };

        const {data} = await axios.request(options);
        if (data?.result !== 'success') {
            throw new Error("Currency API error");
        }

        const rate = data.conversion_rate;
        if (!rate) {
            throw new Error(`Rate not found for ${to}`);
        }

        return rate;
    }
}
