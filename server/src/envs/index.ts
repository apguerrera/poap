import { Provider, JsonRpcProvider } from 'ethers/providers';
import { Wallet, getDefaultProvider } from 'ethers';
import { Address } from '../types';

require('dotenv').config();


export interface EnvVariables {
  provider: Provider;
  poapAdmin: Wallet;
  poapAddress: Address;
}

function getDevelopmentVariables(): EnvVariables {
  const provider: Provider = new JsonRpcProvider('http://localhost:9545');

  console.log("getDevelopmentVariables executed");
  console.log(process.env.ETH_NETWORK);

  return {
    provider,
    poapAddress: '0xBe0B0f08A599F07699E98A9D001084e97b9a900A',
    poapAdmin: new Wallet(
      '0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773',
      provider
    ),
  };
}

function ensureEnvVariable(name: string): string {
  if (!process.env[name]) {
    console.error(`ENV variable ${name} is required`);
    process.exit(1);
  }
  return process.env[name]!;
}

function getVariables(): EnvVariables {
  const network = ensureEnvVariable('ETH_NETWORK');
  // const ownerAddress = ensureEnvVariable('POAP_OWNER_ADDR')
  const ownerPK = ensureEnvVariable('POAP_OWNER_PK');

  const provider: Provider = getDefaultProvider(network);

  const poapAddress = ensureEnvVariable('POAP_CONTRACT_ADDR');

  console.log("getVariables executed: ", network, ownerPK, provider)

  return {
    provider,
    poapAddress,
    poapAdmin: new Wallet(ownerPK, provider),
  };
}

console.log("node_env is ", process.env.NODE_ENV);

const variables =
  process.env.NODE_ENVIROMENT === 'development' ? getDevelopmentVariables() : getVariables();

export default function getEnv(): EnvVariables {
  return variables;
}
