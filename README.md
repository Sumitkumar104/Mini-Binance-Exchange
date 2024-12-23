### Demo

![Watch The Application Priview](https://i.imgur.com/uqaVfjN.png)


### Project Information

- This project is a small version of any `Exchange` application like `Binance, Backpack CoinDTX` etc. Here I show the Realtime price, chart, trade, asks and bids of any currency like `Bitcoin`, `Solana`, `Ethereum` and many more.
- Here I try to implement my own backend Service for trade and RealTime logic. Use can Also see the Backend Architecture here.

[for Reference I use the docs of Binance](https://binance-docs.github.io/apidocs)

### Setup Guide

This Project contains following services and folders:

- `Frontend`: A Next application to see all data of Exchange and GUI for Trading.
- `api-Server`: An Express API Server for REST API's to interact with frontend.
- `tradeEngine`: A highly Scalabe NodeJs server which Contain the core Logic to perform all RealTime trade by using the Message Queue for high performance.
- `wsSocketServer`: A Web Socket server responsible for Realtime communication between the client and server. To scale the Web Socket I use the PUB/SUBS architecture.
- `DataBase`: A timeScale PostgesQL DataBase to store the market data and Trade information.
- `Redis`: Use to implement a Message queue and a Publisher/Subscriber architecture.

### Local Setup

- This repo is create with `TurboRepo`. Because TurboRepo provides efficient monorepo management, enabling `faster builds` and streamlined workflows by sharing dependencies, `caching results`, and optimizing project configurations.

1. Run `npm run build` in root folder to build all the 5 serivces. TurboRepo start all service simultaneously.
2. SetUp all `.env files` in all service folders.
3. Run `docker-compose up` command to run the Redis and PostgresQL database in docker container.
4. Run `npm run dev` in root folder to up all service in development enviroment.
 
At this point following services would be up and running:

| S.No | Service            | PORT    |
| ---- | ------------------ | ------- |
| 1    | `Frontend`         | `:3000` |
| 2    | `Api server`       | `:4000` |
| 3    | `Web Socket server`| `:9000` |


Learn more about the power of `Turborepo`:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)


### Backend Architecture

![Architecture](https://i.imgur.com/qf8XiiF.png)

### Docker Process View

![Architecture](https://i.imgur.com/dSHkwcA.png)

