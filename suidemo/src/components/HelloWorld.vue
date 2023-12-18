<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button class="faucetbt" @click="handleClick">Faucet</button>

    <p @click="$wallet.disconnect()">Address: {{ $wallet.address }}</p>
    <p>Balance: {{ balance / 1000000000 }}</p>
    <p style="text-align: center;margin-left: 820px;">
      <WalletMultiButton />
    </p>

  </div>
</template>

<script setup>
  import { useWallet, useCoinBalance,WalletMultiButton } from 'vuiet'
  const $wallet = useWallet()
  const { balance } = useCoinBalance()

</script>

<script>

// import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";//不可用
import { getFaucetHost, requestSuiFromFaucetV0 } from '@mysten/sui.js/faucet';

export default {
  
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){

  },
  methods:{
    handleClick(){
      requestSuiFromFaucetV0({
        host: getFaucetHost('devnet'),
        recipient: '0x73cc0ae26d786e8664ad129ecf9dd6df263fa57b198b0db5074780ce43e58bb9',
      });
      console.log("Faucet Press !");
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
    .faucetbt {  
      background-color: #4CAF50; /* 按钮的背景颜色 */  
      border: none; /* 移除边框 */  
      color: white; /* 文本颜色 */  
      padding: 10px 20px; /* 内边距 */  
      text-align: center; /* 文本居中 */  
      text-decoration: none; /* 移除下划线 */  
      display: inline-block; /* 使按钮保持在一行 */  
      font-size: 16px; /* 字体大小 */  
      border-radius: 4px; /* 边框圆角 */  
      transition-duration: 0.4s; /* 过渡效果 */  
      cursor: pointer; /* 鼠标悬停时的光标样式 */  
    }  
  
    .faucetbt:hover {  
      background-color: #45a049; /* 鼠标悬停时的背景颜色 */  
      color: white; /* 鼠标悬停时的文本颜色 */  
    }  

</style>
