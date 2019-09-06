import { observable, action, reaction, computed } from 'mobx';

export class FuelPricesStore {
  @observable fuelPrices: any = [];
  @observable aral1: any = [];
  @observable aral2: any = [];
  @observable supol: any = [];
  @observable omv: any = [];
  @observable isLoadingComplete: boolean = false;
  @observable selectedProvider: any = 'Aral1';
  @observable providers: any = [];

  constructor() {
    // reaction(
    //     // The callback will run only on change
    //     // of observables described in this function
    //     () => this.isLoadingComplete,
    //     // The callback, to be called each time the above expression changes
    //     () => {
    //         if (!this.isLoadingComplete) {
    //           this.getFuelPrices()
    //           .then(prices => {
    //             const flattenedPrices = this.flatPriceData(prices);
    //             this.updateFuelPrices(flattenedPrices)
    //             const priceByProvider = this.orderPriceByProvider(flattenedPrices);
    //             console.log(priceByProvider);
    //             this.updateAral1Price(priceByProvider.Aral1);
    //             this.updateAral2Price(priceByProvider.Aral2);
    //             this.updateSupolPrice(priceByProvider.Supol);
    //             this.updateOMVPrice(priceByProvider.OMV);
    //           });
    //         }
    //     }
    // )

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
  updateAral1Price(prices: any) {
    this.aral1 = prices;
  }

  @action
  updateAral2Price(prices: any) {
    this.aral2 = prices;
  }

  @action
  updateSupolPrice(prices: any) {
    this.supol = prices;
  }

  @action
  updateOMVPrice(prices: any) {
    this.omv = prices;
    this.isLoadingComplete = true;
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
