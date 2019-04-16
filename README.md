# v4-debug-helper

本项目主要目的是为了在用本地的前端的V4资源来替代`testing`,`sandbox`或者`production`等线上环境的V4资源，有下面几个好处：

* 线上环境的前端资源的经过压缩混淆的，本地环境的资源可以是非混淆的，在排查bug时可以相对容易定位
* 当本地修改完代码后，可以迅速的用线上的数据进行测试
* 。。。

支持所有通过V4构建的项目，希望可以给前端同学们带来一点帮助。

## Environment Required

Node: `>=8, <9`

### nvm 
[install nvm ](https://github.com/creationix/nvm)

:bulb:
 Note: If zsh has been set as default shell on your Mac( echo $0 will see which shell you are using ), you need to install nvm as follow: 
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | zsh
```
#### bash

##### Automatically call `nvm use`

Put the following at the end of your `$HOME/.bashrc`:

```bash
find-up () {
    path=$(pwd)
    while [[ "$path" != "" && ! -e "$path/$1" ]]; do
        path=${path%/*}
    done
    echo "$path"
}

cdnvm(){
    cd "$@";
    nvm_path=$(find-up .nvmrc | tr -d '[:space:]')

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version;
        default_version=$(nvm version default);

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [[ $default_version == "N/A" ]]; then
            nvm alias default node;
            default_version=$(nvm version default);
        fi

        # If the current version is not the default version, set it to use the default version
        if [[ $(nvm current) != "$default_version" ]]; then
            nvm use default;
        fi

        elif [[ -s $nvm_path/.nvmrc && -r $nvm_path/.nvmrc ]]; then
        declare nvm_version
        nvm_version=$(<"$nvm_path"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors $(<"./.nvmrc") | tail -1 | tr -d '\->*' | tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [[ "$locally_resolved_nvm_version" == "N/A" ]]; then
            nvm install "$nvm_version";
        elif [[ $(nvm current) != "$locally_resolved_nvm_version" ]]; then
            nvm use "$nvm_version";
        fi
    fi
}
alias cd='cdnvm'
```

This alias would search 'up' from your current directory in order to detect a `.nvmrc` file. If it finds it, it will switch to that version; if not, it will use the default version.

#### zsh

##### Calling `nvm use` automatically in a directory with a `.nvmrc` file

Put this into your `$HOME/.zshrc` to call `nvm use` automatically whenever you enter a directory that contains an
`.nvmrc` file with a string telling nvm which node to `use`:

```zsh
# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## 安装

这是一个非常简单的NodeJs项目，所以
```
npm install
```
## 启动

1. 首先修改`config.json`文件里面`redirectV4AppIndexUrl`配置,

```
"redirectV4AppIndexUrl": {
    "http://localhost:8321": [
        "DEFAULT"
    ],
    "http://localhost:8844": [
        "FapiaoManager",
        "CNPayTenantAdmin",
        ......
    ],
    "http://localhost:8102": [
        "BrandhouseLogisticsManager", 
        "PriceComparison", 
        ...
    ]
}
```
- `redirectV4AppIndexUrl`里面的key是本地V4项目的启动端口
- 数组里的内容是你想要debug的app的id(只需要列出自己需要debug的appId, 不需要列出所有)
- 如果在所有的数组中都没找到当前的appid, 那么默认用`DEFULAT`对应的转发地址`http://localhost:8321` 


2. 运行`npm start`，将会启动两个端口
* 8001: http(s)代理服务器端口
* 8002: 代理服务器web配置页面端口

## 使用
1. 安装证书

    1.1 生成证书
        运行`npx anyproxy-ca`, 然后自动打开证书目录。

    1.2 信任证书
        参考 [OSX系统信任CA证书](http://anyproxy.io/cn/#osx%E7%B3%BB%E7%BB%9F%E4%BF%A1%E4%BB%BBca%E8%AF%81%E4%B9%A6)
    

2. 为浏览器设置代理

    方法很多，自己装吧，推荐用插件，比如[Chrome Proxy SwitchySharp](https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm?hl=zh-CN)

3. 本地启动V4 APP

4. 完成！此时访问线上的V4 APP,将会使用本地的已经启动的V4 APP。

Enjoy!

