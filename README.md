# TS MIDDLEMAN

TS MIDDLEMAN is a multi-platform and multi-browser supported frontend debug tool which provide two powerful function:

- Use local front-end V4 resources to replace online V4 resources for easier local debugging(environments like testing, sandbox or production)
- Mock urls and their response to replace the real backend requests in any environments, so that front-end developers can keep developing even when the backend interface has not been completed.

## Support platforms

- Mac
- Windows
- Linux

## How to use

1. Go to [releases](https://github.com/TradeshiftCN/v4-debug-helper/releases) page to download and install the latest version.
2. Follow the use guide in help page to setup the environment.

## How to develop

This section is only for `ts-middleman` developer, please omit it if you only want to use it as a tool.

### Environment Required

- Node: `>=8`
- Npm: `>5`


### Install dependencies

```
npm ci
cd browser
export ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true && npm ci
```

###  Install root certificate

run `npx anyproxy-ca`, the certificate directory will be printed on the console.

Install the root certificate according to you OS platform.

###  Start

#### Start proxy server

```
npm start
```
#### Start ui server

```
cd browser
npm start 
```


#### Set Proxy to Browser

- Chrome && firefox
    
    1. Install `SwitchyOmega` plugin [Chrome](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif?hl=zh-CN) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/switchyomega/)
    
    2. Import config: `./browser/public/OmegaOptions_tsMiddleman.bak` to `SwitchyOmega`
    
    3. Set SwitchyOmega to rule `auto-ts-middleman`
    
> Note: Firefox should set config `security.mixed_content.block_active_content` to false.


## How to package

### Build browser resources

```
cd browser
npm ci
npm run build
```

### Build to runnable application

```
cd ..
npm ci
export ELECTRON_BUILDER_ALLOW_UNRESOLVED_DEPENDENCIES=true && npm run dist
```
