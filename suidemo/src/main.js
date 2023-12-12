import { createApp } from 'vue'
import App from './App.vue'
import SuiWallet from 'vuiet'

import 'vuiet/dist/style.css'
// createApp(App).mount('#app')

// app.use(SuiWallet, {
//     autoConnect: true,
//     chainOverwrite: {
//       SUI_DEVNET: {
//         faucetUrl: 'https://faucet.devnet.sui.io/gas'
//       }
//     }
//   })

// app.mount('#app')

createApp(App)
  .use(SuiWallet, {
    autoConnect: true,
    chainOverwrite: {
      SUI_DEVNET: {
        faucetUrl: 'https://faucet.devnet.sui.io/gas'
      }
    }
  })
  .mount('#app')
