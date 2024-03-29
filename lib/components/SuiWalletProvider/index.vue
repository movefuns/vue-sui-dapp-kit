<template>
    <slot/>
</template>

<script setup lang="ts">
import {computed, inject, onMounted, provide, Ref} from "vue";
import {getFullnodeUrl} from "@mysten/sui.js/client"
import {SuiClient} from "@mysten/sui.js/client";
import {isWalletWithRequiredFeatureSet} from "@mysten/wallet-standard";

import {CONTEXT_NAMES} from "@/walletContext.ts";
import {createWalletStore, type WalletStoreType} from "./store"
import {getWalletConnectionInfo, getWalletIdentifier} from "@/walletUtils.ts";
import type {IdentifierString, WalletAccount} from "@mysten/wallet-standard";
import type {SuiClientOptions} from "@mysten/sui.js/client";
import type {SuiNetworksType, AutoConnectType, BrowserWalletType} from "@/types.ts";



const props = defineProps({
    id: {
        type: String,
        default: "vue-sui-dapp-kit-wallet-provider"
    },
    autoConnect: {
        type: String as () => AutoConnectType,
        default: "disable"
    },
    network: {
        type: String as () => SuiNetworksType,
        default: "mainnet"
    },
    customClientParam: {
        type: Object as () => SuiClientOptions,
    },
    preferredWallets: {
        type: Array as () => string[],
        default: () => ["Sui Wallet"]
    },
    requiredFeatures: {
        type: Array as () => IdentifierString[],
        default: () => ["standard:connect", "sui:signAndExecuteTransactionBlock"]
    },

    // v-models
    allBrowserWallets: {
        type: Object as () => BrowserWalletType[],
        required: false
    },
    wallet: {
        type: Object as () => WalletStoreType,
        required: false
    }
})

const emits = defineEmits(["update:allBrowserWallets", "update:wallet"])
const client = new SuiClient(props.customClientParam ? props.customClientParam : {
    url: getFullnodeUrl(props.network),
})

const walletStore = createWalletStore({
    id: props.id,
    network: props.network,
    suiClient: client,
    autoConnect: props.autoConnect
})


const allEligibleWallets = computed((): BrowserWalletType[] => {
    let wallets = inject<Ref<BrowserWalletType[]>>(CONTEXT_NAMES.allBrowserWallets)?.value

    if (!wallets) {
        return []
    }

    // filter by requiredFeatures
    let eligible = wallets.filter(
        (wallet) => isWalletWithRequiredFeatureSet(wallet, props.requiredFeatures)
    )

    // sort wallets by preferredWallets
    return [
        // covert name to wallet
        ...props.preferredWallets
            .map((name) => eligible.find((wallet) => wallet.name === name))
            .filter(Boolean),

        // contain other wallet
        ...eligible.filter((wallet) => !props.preferredWallets.includes(wallet.name))

    ] as BrowserWalletType[]
})

async function autoConnect(){
    let allWallets = allEligibleWallets.value;
    if (props.autoConnect === "disable" || allWallets.length === 0 || !walletStore) {
        return
    }

    let connectionInfo = getWalletConnectionInfo(props.id)

    // have connection-info
    if (connectionInfo) {
        // auto connect
        if (props.autoConnect === "last"){
            let wallet = allWallets.find((wallet) => getWalletIdentifier(wallet) === connectionInfo?.wallet_ident)
            wallet && await walletStore.connect(wallet)

            // change to last account if
            let found_account = walletStore.accounts.find((account: WalletAccount) => account.address === connectionInfo?.account_addr)
            found_account && (walletStore.currentAccount = found_account)
        }
        return;
    } else {
        // Not connected yet for every.
        if (props.autoConnect === "enable") {
            await walletStore.connect(allWallets[0])
        }
    }
}

provide(CONTEXT_NAMES.allEligibleWallets, allEligibleWallets.value)
emits("update:allBrowserWallets", allEligibleWallets)

// pass to superior
emits("update:wallet", walletStore)
provide(CONTEXT_NAMES.wallet, walletStore)

onMounted(async () => {
    await autoConnect()
})

</script>
