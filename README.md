# vue-sui-dapp-kit
vue-sui-dapp-kit

# Demo目录 
* suidemo 试验工程
* suidemodoc 文档截图目录

## 首先本地安装 Vue
```
    npm install -g @vue/cli
```

* demo工程使用vue3  
![vue3和vue2的选择](./suidemodoc/step1.jpg "步骤1")


## 安装Vue成功后测试是否能够建立项目
```
    vue create suidemo
```


* Yarn PNPM NPM 根据喜好选择(我选择NPM)  
![Yarn PNPM NPM](./suidemodoc/step2.jpg "步骤2")

* 安装vue成功后可以根据提示测试一下  
![测试命令行](./suidemodoc/step2-1.jpg "步骤3")
执行
```
 npm run serve
```

* 一切正常将在本地起一个网页服  
![本地网页服](./suidemodoc/step3.jpg "步骤4")

* 将 http://localhost:8080/ 填入浏览器后将看到效果,说明本地vue已经搭建成功  
![本地页面](./suidemodoc/stepOver.jpg)

* 安装sui.js
```
    npm i @mysten/sui.js
```

* 安装dapp-kit (~~不可行因为dapp-kit是react的库~~)
```
    npm i --save @mysten/dapp-kit
```

* 测试sui.js中的 Faucet 函数来获取测试币
首先在demo中添加代码  
```
  methods:{
    handleClick(){
      requestSuiFromFaucetV0({
        host: getFaucetHost('devnet'),
        recipient: '0x73cc0ae26d786e8664ad129ecf9dd6df263fa57b198b0db5074780ce43e58bb9',
      });
      console.log("Faucet Press !");
    }
  }

```
在界面里添加按钮响应  
```
<button @click="handleClick">Faucet</button>
```
运行界面后点击按钮获得测试币  
![测试Faucet通过](./suidemodoc/testgetFaucet.jpg)


* 接着让我们愉快的推进吧  
* 未完待续...  

