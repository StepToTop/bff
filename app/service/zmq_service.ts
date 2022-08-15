import { Service } from 'egg';
import zmq from 'zeromq';
import fastJson from 'fast-json-stringify';
// import fastParser from 'fast-json-parse';

export const stringify = fastJson({
  title: 'CurrencyData',
  type: 'object',
  properties: {
    bitcoin: {
      type: 'string',
    },
    ethereum: {
      type: 'string',
    },
    monero: {
      type: 'string',
    },
    xrp: {
      type: 'string',
    },
    dogecoin: {
      type: 'string',
    },
    dash: {
      type: 'string',
    },
    litecoin: {
      type: 'string',
    },
  },
});

export interface CurrencyData {
  timestamp: string;
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export enum Currency {
  Bitcoin = 'bitcoin',
  Ether = 'ethereum',
  Litecoin = 'litecoin',
  Monero = 'monero',
  Ripple = 'xrp',
  Dogecoin = 'dogecoin',
  Dash = 'dash',
}

export const PublicData: Record<Currency, string | undefined> = {
  [Currency.Bitcoin]: undefined,
  [Currency.Ether]: undefined,
  [Currency.Litecoin]: undefined,
  [Currency.Monero]: undefined,
  [Currency.Ripple]: undefined,
  [Currency.Dogecoin]: undefined,
  [Currency.Dash]: undefined,
}

class DataWatcher {
  lastTime = 0;
  prices = [];
  tradeCounts = [];
  sock: zmq.Socket;
  constructor(target: string, symbol: Currency) {
    this.sock = zmq.socket('sub');
    this.sock.connect(target);
    this.sock.subscribe(symbol);
    this.sock.on('message', (topic: Currency, message:string) => {
      try {
        PublicData[String(topic) as Currency] = String(message); // fastParser(message) as CurrencyData;
      } catch (e) { }
    })
  }
}

const currencies = [
  Currency.Bitcoin,
  Currency.Dash,
  Currency.Dogecoin,
  Currency.Ether,
  Currency.Litecoin,
  Currency.Monero,
  Currency.Ripple,
];

currencies.forEach((currency: Currency) => {
  new DataWatcher('tcp://127.0.0.1:9528', currency);
});

export default class ZMQService extends Service {
  public async getData() {
    return PublicData;
  }
}
