import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  const [walletAddress, setWalletAddress] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  let contractAddress = "0x3f77711B8d343c6D394CDa7Cb16E3D976129Dc21";
  let contractAbi = ["function presaleBuy()"];

  async function requestAccount() {
    console.log('Requesting account...');

    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        updateEthers();
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		window.location.reload();
	}

  // listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = async () => {
		let tempProvider = new ethers.BrowserProvider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = await tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, contractAbi, tempSigner);
		setContract(tempContract);	
	}

  async function presaleBuyFromContract() {
    let bnbAmount = document.getElementById("bnbAmount").value;
    contract.presaleBuy({value: ethers.parseEther(bnbAmount)});
  }

  return (
    <div className="App">
      <div class="container">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <img alt="logo"/>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><a href="#community" class="nav-link px-2">Community</a></li>
        <li><a href="#howtobuy" class="nav-link px-2">How To Buy</a></li>
        <li><a href="#tokenomics" class="nav-link px-2">Tokenomics</a></li>
        <li><a href="#airdrop" class="nav-link px-2">Airdrop</a></li>
        <li><a href="#roadmap" class="nav-link px-2">Roadmap</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <a href="#presale"><button type="button" class="btn btn-primary">Join Presale Now</button></a>
      </div>
    </header>
  </div>


  <div class="px-4 py-5 my-5 text-center">
    <img class="d-block mx-auto mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 id="presale" class="display-5 fw-bold text-body-emphasis">PEPE WIN TOKEN - The Next 1000x Gem 💎 with Utility</h1>
    <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">Pepe is taking over the crypto world by storm. Why not win with $PEPEW token's revolutionary daily lottery utility. A lucky winner is picked daily where the prize pot is airdropped to. The higher the transaction volume, the higher the prize pot!</p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">

        <div class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <h3>Wallet Address: {walletAddress}</h3>
          <p>1 BNB = 10,000,000 $PEPEW</p>
          <input step="any" type="number" id="bnbAmount" placeholder="Amount of BNB..."/>
          <button class="w-100 btn btn-lg btn-outline-secondary" onClick={requestAccount}>Connect Wallet</button>
          <button class="w-100 btn btn-lg btn-primary" onClick={presaleBuyFromContract}>Presale Buy</button>
        </div>

      </div>
    </div>
  </div>

  <div id="community" class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">$PEPEW Token</h1>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      </div>
    </div>
  </div>

  <div class="container px-4 py-5" id="howtobuy">
    <h2 class="pb-2 border-bottom">How To Buy</h2>
    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          
        </div>
        <h3 class="fs-2 text-body-emphasis">Connect Your Wallet</h3>
        <p>Connect your wallet on the presale section at the top of our website. Make sure you're on BSC mainnet.</p>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          
        </div>
        <h3 class="fs-2 text-body-emphasis">Enter the amount of BNB</h3>
        <p>Enter the amount of BNB you will spend to buy $PEPEW tokens.</p>
      </div>
      <div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
          
        </div>
        <h3 class="fs-2 text-body-emphasis">Buy Tokens On Presale</h3>
        <p>Click the Presale Buy button which will prompt Metamask to execute the transaction and your tokens will be transferred to you at a discounted price!</p>
        <a href="#presale" class="icon-link">
          Join Presale Now!
        </a>
      </div>
    </div>
  </div>


  <div id="tokenomics" class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Tokenomics</h1>
        <h3>Token Supply:</h3>
        <ul>
          <li>10% developers</li>
          <li>45% presale</li>
          <li>45% public launch</li>
        </ul>
        <h3>Buy/Sell Tax:</h3>
        <ul>
          <li>2% developers</li>
          <li>3% lottery prize pot</li>
        </ul>
      </div>
    </div>
  </div>


  <div id="airdrop" class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Airdrop</h1>
        <p class="lead">Join the airdrop where we will select 100 lucky winners to airdrop 10,000 $PEPEW tokens!</p>
      </div>
    </div>
  </div>


  <div id="roadmap" class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Roadmap & Whitepaper</h1>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world's most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
      </div>
    </div>
  </div>


  <div class="container">
  <footer class="py-5">
    <div class="row">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Community</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">How To Buy</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Tokenomics</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Airdrop</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Roadmap</a></li>
      </ul>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4">
      <p>Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may go down as well as up. Profits may be subject to capital gains or other taxes applicable in your jurisdiction.</p>
      <ul class="list-unstyled d-flex">
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use></use></svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use></use></svg></a></li>
        <li class="ms-3"><a class="link-body-emphasis" href="#"><svg class="bi" width="24" height="24"><use></use></svg></a></li>
      </ul>
    </div>
  </footer>
</div>


    </div>
  );
}

export default App;
