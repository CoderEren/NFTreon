// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.17;

contract NFTSocial {
    // variables
    address public admin;
    uint256 noOfCreators;
    uint commission = 5;
    uint creatorCommission = 10;

    mapping(string => address) usernameToWallet;
    mapping(address => Creator) walletToCreator;

    constructor () {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Only admin is allowed to execute this function!");
        _;
    }

    // structs
    struct Creator {
        uint256 noOfNFTs;
        uint256 floorPrice;
        uint256 noOfHolders;
        mapping(address => bool) holdingNFT;
        mapping(address => uint256) sellingNFTForPrice;
        address[] sellers;
    }

    // functions
    function checkUsernameExists(string memory username) public view returns(bool) {
        if (usernameToWallet[username] == address(0)) {
            return false;
        } else {
            return true;
        }
    }

    function setProfile(string memory username, uint256 noOfMembers, uint256 _floorPrice) public {
        require(checkUsernameExists(username) == false, "This username already exists!");
        require(walletToCreator[msg.sender].noOfNFTs == 0, "You can't create multiple profiles!");
        usernameToWallet[username] = msg.sender;
        noOfCreators += 1;
        Creator storage creator = walletToCreator[msg.sender];
        creator.noOfNFTs = noOfMembers;
        creator.floorPrice = _floorPrice;
        creator.noOfHolders = 0;
    }

    function getWalletAddressOfUser(string memory username) public view returns(address) {
        return usernameToWallet[username];
    }

    function getCreatorDetails(address walletAddress) public view returns(uint256, uint256, uint256) {
        Creator storage creator = walletToCreator[walletAddress];
        return (creator.noOfNFTs, creator.floorPrice, creator.noOfHolders);
    }

    function checkIfHoldingNFT(string memory username) public view returns(bool) {
        Creator storage creator = walletToCreator[usernameToWallet[username]];
        if (creator.sellingNFTForPrice[msg.sender] != 0) {
            return true;
        } else {
            return creator.holdingNFT[msg.sender];
        }
    }

    //buying and selling NFTs functions
    function buyNFTForFloorPrice(string memory username) public payable {
        require(checkIfHoldingNFT(username) == false, "You already own an NFT of this creator!");
        Creator storage creator = walletToCreator[usernameToWallet[username]];
        require(msg.value >= creator.floorPrice, "You must pay the exact price or higher!");
        require(creator.noOfHolders < creator.noOfNFTs, "All NFTs are sold out! You can only buy them from another user who wants to sell it for higher.");
        //send money to NFT seller
        (bool sent, bytes memory data) = usernameToWallet[username].call{value: msg.value * (100 - commission) / 100}("");
        require(sent, "Failed to send Ether to seller");
        //send commissions to the smart contract
        (bool sent2, bytes memory data2) = admin.call{value: msg.value * commission / 100}("");
        require(sent2, "Failed to send Ether to the smart contract");
        //add ownership of NFT
        creator.noOfHolders += 1;
        creator.holdingNFT[msg.sender] = true;
    }

    function buyNFTFromAnotherUser(string memory username, address seller) public payable {
        require(checkIfHoldingNFT(username) == false, "You already own an NFT of this creator!");
        Creator storage creator = walletToCreator[usernameToWallet[username]];
        require(msg.value >= creator.sellingNFTForPrice[seller], "You must pay the exact price or higher!");
        require(creator.sellingNFTForPrice[seller] > 0, "That user is not selling their NFT!");
        //send money to NFT seller
        (bool sent, bytes memory data) = seller.call{value: msg.value * (100 - commission - creatorCommission) / 100}("");
        require(sent, "Failed to send Ether to seller");
        //send commissions to the smart contract
        (bool sent2, bytes memory data2) = admin.call{value: msg.value * commission / 100}("");
        require(sent2, "Failed to send Ether to the smart contract");
        //send commissions to the creator
        (bool sent3, bytes memory data3) = usernameToWallet[username].call{value: msg.value * creatorCommission / 100}("");
        require(sent3, "Failed to send Ether to seller");
        //change ownership of the NFT
        creator.holdingNFT[seller] = false;
        creator.holdingNFT[msg.sender] = true;
        creator.sellingNFTForPrice[seller] = 0;
        for (uint i = 0; i < creator.sellers.length; i++) {
            if (creator.sellers[i] == seller) {
                delete creator.sellers[i];
            }
        }
    }

    function offerNFTForSale(string memory username, uint256 price) public {
        require(checkIfHoldingNFT(username) == true, "You must own an NFT of the creator first!");
        Creator storage creator = walletToCreator[usernameToWallet[username]];
        creator.sellingNFTForPrice[msg.sender] = price;
        creator.sellers.push(msg.sender);
    }

    //admin functions
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdrawCommissions() public onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }
}