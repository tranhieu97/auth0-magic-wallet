import { Magic } from 'magic-sdk'
import { OpenIdExtension } from '@magic-ext/oidc';
import { FlowExtension } from '@magic-ext/flow'

export const magic = new Magic('pk_live_E6C7C79E48C18223', {
  extensions: [
    new OpenIdExtension(),
    new FlowExtension({
      rpcUrl: "https://rest-testnet.onflow.org",
      network: "testnet"
    })
  ],
})