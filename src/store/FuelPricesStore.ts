import {observable, action, computed, reaction} from 'mobx';

export class FuelPricesStore {
    @observable fuelPrices: any = [];
    @observable pricesByProvider: any = [];
    @observable isLoadingComplete: boolean = false;
    @observable selectedProvider: string = '';
    @observable selectedFuelType: string = '';
    @observable providers: any = [];

    constructor() {
        reaction(
            () => [],
            async () => {
                await this.getProviders()
                    .then(providers => {
                        const providersName = providers.map((provider: any) => provider.name + provider.id);
                        this.updateProvidersList(providersName);
                    });

                await this.getFuelPrices()
                    .then(prices => {
                        const flattenedPrices = this.flatPriceData(prices);
                        const pricesByProviders = this.orderPriceByProvider(flattenedPrices);
                        this.updateFuelPrices(pricesByProviders);
                    });
            }, {
                fireImmediately: true,
            }
        );

        reaction(
            () => [this.fuelPrices, this.selectedProvider],
            async () => {
                if (this.fuelPrices) {
                    const pricesByProvider = this.fuelPrices[this.selectedProvider];
                    this.updatePricesByProviders(pricesByProvider);
                    const [types] = this.typesByProviders;

                    // Logic to select the 1st Fuel Type in case provider is changed
                    this.updateSelectedFuelType(types);
                }
            }
        )
    }

    @computed
    get pricesByFuelType() {
        return this.pricesByProvider ? this.pricesByProvider.map((providers: any) => providers.price[this.selectedFuelType])
            : [];
    }

    @computed
    get typesByProviders() {
        const [pricesByProvider] = this.pricesByProvider ? this.pricesByProvider : [null];
        return pricesByProvider ? Object.keys(pricesByProvider.price) : [];
    }

    @computed
    get maxPricesByFuelType() {
        if (this.pricesByFuelType && this.pricesByFuelType.length) {
            return this.pricesByFuelType
                .map((prices: any) => prices.max)
                .flat()
                .sort((a: any, b: any) => a.timestamp - b.timestamp)
                .map((payload: any) => ({
                    y: payload.price,
                    x: new Date(payload.timestamp)
                }))
        }
        return [];
    }

    @computed
    get minPricesByFuelType() {
        if (this.pricesByFuelType && this.pricesByFuelType.length) {
          return this.pricesByFuelType
              .map((prices: any) => prices.min)
              .flat()
              .sort((a: any, b: any) => a.timestamp - b.timestamp)
              .map((payload: any) => ({
                y: payload.price,
                x: new Date(payload.timestamp)
              }))
        }
        return [];
    }

    @action
    updateProvidersList(providers: Array<string>) {
        this.providers = providers;
        this.updateSelectedProvider(providers[0]);
    }

    @action
    updateSelectedProvider(provider: string) {
        this.selectedProvider = provider;
    }

    @action
    updateSelectedFuelType(type: string) {
        this.selectedFuelType = type;
    }

    @action
    updateFuelPrices(prices: any) {
        this.fuelPrices = prices;
    }

    @action
    updatePricesByProviders(prices: any) {
        this.pricesByProvider = prices;
    }

    private orderPriceByProvider = (priceData: any) => {
        return priceData.reduce((acc: any, item: any) => {
            acc[item.name] = acc[item.name] || [];
            acc[item.name].push(item);
            return acc;
        }, {});
    };

    private flatPriceData = (priceData: any) => {
        return priceData.map((price: { dailyPrices: any; }) => price.dailyPrices).flat();
    };

    private async getFuelPrices(): Promise<any> {
        const url = 'https://my-fuel-prices.achyut.now.sh/prices';
        return fetch(url)
            .then(res => res.json())
            .then(res => res);
    }

    private async getProviders(): Promise<any> {
        const url = 'https://my-fuel-prices.achyut.now.sh/list-providers';
        return fetch(url)
            .then(res => res.json())
    }
}

export default new FuelPricesStore();
