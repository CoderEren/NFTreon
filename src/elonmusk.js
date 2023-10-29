import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

const ElonMusk = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  let username = "elonmusk";
  let contractAddress = "0x3f77711B8d343c6D394CDa7Cb16E3D976129Dc21";
  let rawAbi = [
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
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "username",
          "type": "string"
        }
      ],
      "name": "usernameToWallet",
      "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  let contractAbi = new ethers.Interface(rawAbi);
  console.log(contractAbi);

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
        const networkId = await provider.getNetwork();
        console.log(networkId);
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
  async function buyNFT() {
    contract.buyNFTForFloorPrice({username: "elonmusk", value: ethers.parseEther("0.1")});
  }

  async function getWalletAddress() {
    console.log(contract.getWalletAddressOfUser({username: "elonmusk"}));
  }

  async function getFloorPrice() {
    //return contract.walletToCreator(usernameToWallet(username)).floorPrice;
  }
  return (
    <div className='ElonMusk'>
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
        <h1 id="presale" class="display-5 fw-bold text-body-emphasis">NFTreon Creator: Elon Musk</h1>
        <h4>Number of NFTs: 500<br />Number of Holders: 496<br />Floor Price: 100 FLR</h4>
        <button class="btn btn-success" onClick={buyNFT}>Buy NFT</button>
        <button class="btn btn-danger" onClick={getWalletAddress}>Offer NFT For Sale</button>

        <br />
        <h4>Sellers:</h4>
        <ul class="list-group" id="listOfSellers">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            0x981723...<br />
            101 FLR
            <span class="badge bg-primary rounded-pill">Buy Their NFT</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            0xkusd8fo...
            <br />
            102 FLR
            <span class="badge bg-primary rounded-pill">Buy Their NFT</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            0xjs89m3n...<br />
            101.5 FLR
            <span class="badge bg-primary rounded-pill">Buy Their NFT</span>
          </li>
        </ul>
      </div>
      
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card mb-4 rounded-3 shadow-sm">
                <div class="card-header py-3 blue">
                  <a href="https://google.com"><h4 class="my-0 fw-normal"><b>Cover Letter Template</b></h4></a>
                </div>
                <div class="card-body">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum porttitor ante, sit amet pretium velit pharetra bibendum. In tristique libero vel sem tristique ornare.</p>
                
                </div>
              </div>
          </div>
          <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3 blue">
              <a href="https://google.com"><h4 class="my-0 fw-normal"><b>Exclusive SpaceX Internship</b></h4></a>
              </div>
              <div class="card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum porttitor ante, sit amet pretium velit pharetra bibendum. In tristique libero vel sem tristique ornare.</p>
              </div>
            </div>
          </div>
          <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
              <div class="card-header py-3 blue">
              <a href="https://google.com"><h4 class="my-0 fw-normal"><b>Access Tesla Blueprints</b></h4></a>
              </div>
              <div class="card-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum porttitor ante, sit amet pretium velit pharetra bibendum. In tristique libero vel sem tristique ornare.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ElonMusk;
