import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

const Home = () => {
    const [walletAddress, setWalletAddress] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  let contractAddress = "0x3f77711B8d343c6D394CDa7Cb16E3D976129Dc21";
  let contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "buyNFTForFloorPrice",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "seller",
          "type": "address"
        }
      ],
      "name": "buyNFTFromAnotherUser",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "checkIfHoldingNFT",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "checkUsernameExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        }
      ],
      "name": "getCreatorDetails",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "getWalletAddressOfUser",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "offerNFTForSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "noOfMembers",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_floorPrice",
          "type": "uint256"
        }
      ],
      "name": "setProfile",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdrawCommissions",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

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

  //run transactions on the smart contract
  async function presaleBuyFromContract() {
    //contract.presaleBuy({value: ethers.parseEther()});
  }
  return (
    <div className="Home">
    <div class="container">
  <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom" id="navbar">
    <div class="col-md-3 mb-2 mb-md-0">
      <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
        <img class="logo" id="logo" src={require('./images/logo.jpeg')} alt="logo"/>
      </a>
    </div>

    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 hidden-xs">
      <li><a href="#features" class="nav-link px-2">Features</a></li>
      <li><a href="/about" class="nav-link px-2">About</a></li>
      <li><a href="/blog" class="nav-link px-2">Blog</a></li>
      <li><a href="elonmusk.js" class="nav-link px-2">Creator</a></li>
      <li><a href="https://coston2-explorer.flare.network/address/0x3f77711B8d343c6D394CDa7Cb16E3D976129Dc21/transactions" target="_blank" class="nav-link px-2">Contract</a></li>
    </ul>

    <div class="col-md-3 text-end">
      <button type="button" class="btn btn-primary" onClick={requestAccount}>Connect Wallet</button>
    </div>
  </header>
</div>


<div class="px-4 py-5 my-5 text-center">
  <h1 id="presale" class="display-5 fw-bold text-body-emphasis">NFTreon: A Crypto-Based Social Platform</h1>
  <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">NFTreon is a social media platform where users purchase membership to gain access to exclusive content via NFTs on the Flare blockchain.</p>
  </div>
</div>

<div class="container px-4 py-5" id="howtobuy">
  <h2 class="pb-2 border-bottom">what Is NFTreon?</h2>
  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Exclusive Content to NFT Holders</h3>
      <p>Not only having access to content, content creators could offer exclusive benefits to their NFT holders and attract more audiences.</p>
    </div>
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Incentive Environment</h3>
      <p>Popularity of a creator depends on the value of their NFT. The better contents you create, the higher your NFT value gets as more users are willing to buy your NFT.</p>
    </div>
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Diverse Functions</h3>
      <p>NFTreon could can act as an investment platform where users can buy or sell NFTs to earn flares or a community for fans to support creators by purchasing their NFTs.</p>

    </div>
  </div>

  <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Exclusive Content to NFT Holders</h3>
      <p>Not only having access to content, content creators could offer exclusive benefits to their NFT holders and attract more audiences.</p>
    </div>
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Incentive Environment</h3>
      <p>Popularity of a creator depends on the value of their NFT. The better contents you create, the higher your NFT value gets as more users are willing to buy your NFT.</p>
    </div>
    <div class="feature col">
      <h3 class="fs-2 text-body-emphasis">Diverse Functions</h3>
      <p>NFTreon could can act as an investment platform where users can buy or sell NFTs to earn flares or a community for fans to support creators by purchasing their NFTs.</p>

    </div>
  </div>
</div>
</div>
  );
};

export default Home;
