import { observable, action, reaction, computed } from 'mobx';

export class FuelPricesStore {
  @observable fuelPrices: any = [];
  @observable aral1: any = [];
  @observable aral2: any = [];
  @observable supol: any = [];
  @observable omv: any = [];
  @observable isLoadingComplete: boolean = false;
  @observable selectedProvider: string = 'Aral1';
  @observable selectedFuelType: string = '';
  @observable providers: any = [];

  constructor() {
    this.getProviders()
      .then(providers => {
        const providersName = providers.map((provider: any) => provider.name + provider.id);
        this.updateProvidersList(providersName);
      });

    this.getFuelPrices()
      .then(prices => {
        const flattenedPrices = this.flatPriceData(prices);
        this.updateFuelPrices(flattenedPrices);
        // const priceByProvider = this.orderPriceByProvider(flattenedPrices);
        // console.log(priceByProvider);
        // this.updateAral1Price(priceByProvider.Aral1);
        // this.updateAral2Price(priceByProvider.Aral2);
        // this.updateSupolPrice(priceByProvider.Supol);
        // this.updateOMVPrice(priceByProvider.OMV);
      });
  }

  @computed
  get pricesByProvider() {
    const priceByProvider = this.orderPriceByProvider(this.fuelPrices);
    return priceByProvider[this.selectedProvider];
  }

  @computed
  get pricesByFuelType() {
    const pricesByProvider = this.pricesByProvider;
    const selectedType = this.selectedFuelType;
    console.log(pricesByProvider);
    return pricesByProvider;
  }

  @computed
  get typesByProviders() {
    const [ pricesByProvider ] = this.pricesByProvider ? this.pricesByProvider : [null];
    return pricesByProvider ? Object.keys(pricesByProvider.price) : [];
  }

  @action
  updateProvidersList(providers: Array<string>) {
    console.log('Providers', providers);
    this.providers = providers;
  }

  @action
  updateSelectedProvider(provider: string) {
    console.log('selectedProvider', provider);
    this.selectedProvider = provider;
  }

  @action
  updateSelectedFuelType(type: string) {
    console.log('selectedType', type);
    this.selectedFuelType = type;
  }

  @action
  updateFuelPrices(prices: any) {
    this.fuelPrices = prices;
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
