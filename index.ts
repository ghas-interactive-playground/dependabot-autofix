import _ from 'lodash';
import Keycloak from 'keycloak-js';
import { ethers } from 'ethers';
import express, { Request, Response, NextFunction } from 'express';
import { generatePrivateKey } from 'nostr-tools';
import { getCLS, getFID, getLCP } from 'web-vitals';
import execa from 'execa';
import { Toucan } from 'toucan-js';

console.log(_.includes([1,2,3], 1))

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('This middleware will behave differently');
    next(); 
  });
  
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

const privateKey = generatePrivateKey();
console.log(`Generated private key: ${privateKey}`);

const keycloak = Keycloak();
keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
  console.log(authenticated ? 'Authenticated' : 'Not authenticated');
}).catch(error => {
  console.error('Failed to initialize Keycloak', error);
});


// Using ethers to generate a random wallet
const wallet = ethers.Wallet.createRandom();
console.log(`Generated wallet address: ${wallet.address}`);

// Using web-vitals to measure performance metrics
getCLS(console.log);
getFID(console.log);
getLCP(console.log);

// Using execa to run a shell command
(async () => {
  try {
      const { stdout } = await execa('echo', ['Hello, world!']);
      console.log(stdout);
  } catch (error) {
      console.error('Failed to execute command', error);
  }
})();
