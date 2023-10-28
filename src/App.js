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
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom" id="navbar">
      <div class="col-md-3 mb-2 mb-md-0">
        <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <img class="logo" id="logo" src={require('./images/logo.jpeg')} alt="logo"/>
        </a>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 hidden-xs">
        <li><a href="#community" class="nav-link px-2">Features</a></li>
        <li><a href="#howtobuy" class="nav-link px-2">About</a></li>
        <li><a href="#tokenomics" class="nav-link px-2">Blog</a></li>
        <li><a href="" target="_blank" class="nav-link px-2">Contract</a></li>
      </ul>

      <div class="col-md-3 text-end">
        <button type="button" class="btn btn-primary" onClick={requestAccount}>Connect Wallet</button>
      </div>
    </header>
  </div>


  <div class="px-4 py-5 my-5 text-center">
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
        
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">🐸 Introducing PepeWin $PEPEW 🐸</h1>
        <p class="lead">Are you ready to dive into the exciting world of memecoins and join a community that combines fun, excitement, and financial potential? Look no further than PepeWin ($PEPEW), the hottest new memecoin on Binance Smart Chain that's taking the crypto scene by storm!
<br/>
<b>🎉 Embrace the Power of Memes:</b><br/>
PepeWin is not just another memecoin - it's a movement. Inspired by the internet's favorite frog, Pepe, this vibrant and dynamic token has captured the essence of viral internet culture.
<br/>
<b>🏆 Daily Lottery Draw:</b><br/>
What sets PepeWin apart from the rest is its innovative lottery utility. Every day, one lucky winner is randomly selected from the PepeWin community, and they receive an astonishing 3% of every transaction made on the platform. Imagine the thrill of waking up to the news that you've won a share of the daily earnings - it's like hitting the jackpot, but with a memecoin twist!
</p>
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
        </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Airdrop</h1>
        <p class="lead"><a href="" target="_blank">Join the airdrop</a> where we will select 100 lucky winners to airdrop 10,000 $PEPEW tokens!</p>
        <p class="lead"><b>💰 Earn While You HODL:</b><br/>
Investors in PepeWin are registered to a pool of wallet addresses and a random wallet address is picked daily where 3% of transaction fees are sent to. Investors that sold can't enter the lottery!
</p>
      </div>
    </div>
  </div>


  <div id="roadmap" class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Roadmap & Whitepaper</h1>
        <p class="lead"></p>
        <a href="./whitepaper.pdf" target="_blank"><p class="lead">Access the $PEPEW Whitepaper here.</p></a>
        <p class="lead"><b>🤝 Join the PepeWin Community:</b><br/>
Investing in PepeWin means more than just buying tokens - it means becoming part of a thriving and passionate community. Connect with fellow meme enthusiasts, share in the excitement of daily lottery draws, and contribute to the growth of PepeWin as it takes its place in the crypto landscape</p>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3 blue">
              <h4 class="my-0 fw-normal">Phase 1 - FOUNDATION</h4>
            </div>
            <div class="card-body">
              <ul class="list-unstyled mt-3 mb-4">
                <li>👨‍💻 Smart Contract Development</li>
                <li>🌐 Social Media Account Creation (Telegram, Twitter, Discord) and Community Building</li>
                <li>🪙 Launch Presale</li>
                <li>🤣 Memes</li>
              </ul>
              <a href="#presale"><button type="button" class="w-100 btn btn-lg btn-outline-primary">Join Presale Now</button></a>
            </div>
          </div>
      </div>
      <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3 blue">
            <h4 class="my-0 fw-normal">Phase 2 - LAUNCH</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>🚀 Token Launch on Pancakeswap</li>
              <li>🤝 Partnerships With Influencers and Marketing Campaigns</li>
              <li>💎 Listing on ICO Directories (CoinMarketCap, CoinGecko and more)</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
      <div class="card mb-4 rounded-3 shadow-sm">
          <div class="card-header py-3 blue">
            <h4 class="my-0 fw-normal">Phase 3 - MAINSTREAM</h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>💥 Listing on popular CEXs</li>
              <li>🐸 $PEPEW NFT Collection</li>
              <li>🏆 Creation of Meme Labs - a collection of memecoins with revolutionary utilities!</li>
              <li>🤣 More Memes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div><br/>

  <div class="container">
    <div class="row">
      <div class="col">
        
      </div>

    </div>
  </div>


  <div class="container">
  <footer class="py-5">
    <div class="row">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item"><a href="#community" class="nav-link px-2 text-body-secondary">Community</a></li>
          <li class="nav-item"><a href="#howtobuy" class="nav-link px-2 text-body-secondary">How To Buy</a></li>
          <li class="nav-item"><a href="#tokenomics" class="nav-link px-2 text-body-secondary">Tokenomics</a></li>
          <li class="nav-item"><a href="#airdrop" class="nav-link px-2 text-body-secondary">Airdrop</a></li>
          <li class="nav-item"><a href="#roadmap" class="nav-link px-2 text-body-secondary">Roadmap</a></li>
          <li class="nav-item"><a href="" target="_blank" class="nav-link px-2 text-body-secondary">Contract</a></li>
      </ul>
    </div>

    <div class="d-flex flex-column flex-sm-row justify-content-between">
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
