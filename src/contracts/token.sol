// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Token is ERC20, ERC20Burnable {
    address payable public admin;
    uint256 developerTax = 2;
    uint256 lotteryTax = 3;
    uint256 tokenSupply = 1000000000 * (10 ** 18);
    address[] public holders;
    mapping(address => bool) public holderExists;

    bool presaleOn;
    uint256 maxPresaleTokens = 450000000 * 10 ** 18;
    uint256 presaleSoldTokens = 0;

    constructor() ERC20("Token", "MTK") {
        admin = payable(msg.sender);
        _mint(admin, tokenSupply);
        holders.push(msg.sender);
        holderExists[msg.sender] = true;
        
        presaleOn = true;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "Only the admin is allowed to execute this function!");
        _;
    }

    function transfer(address to, uint amount) public override returns (bool) {
        uint balanceSender = balanceOf(msg.sender);
        require(balanceSender >= amount, "ERC20: Not enough balance for transfer.");
        uint devTaxAmount = (amount * developerTax) / 100;
        uint lotteryTaxAmount = (amount * lotteryTax) / 100;
        uint transferAmount = amount - devTaxAmount - lotteryTaxAmount;
        
        _transfer(msg.sender, to, transferAmount);
        _transfer(msg.sender, admin, devTaxAmount);
        _transfer(msg.sender, address(this), lotteryTaxAmount);

        if (!holderExists[to]) {
            holders.push(to);
            holderExists[to] = true;
        }

        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        address spender = _msgSender();
        uint devTaxAmount = (amount * developerTax) / 100;
        uint lotteryTaxAmount = (amount * lotteryTax) / 100;
        uint transferAmount = amount - devTaxAmount - lotteryTaxAmount;

        _spendAllowance(from, spender, transferAmount); //already checks for sufficient funds
        _transfer(from, to, transferAmount);
        _transfer(from, admin, devTaxAmount);
        _transfer(from, address(this), lotteryTaxAmount);

        if (!holderExists[to]) {
            holders.push(to);
            holderExists[to] = true;
        }

        return true;
    }

    //Lottery Functions
    function getLotteryPot() public view returns (uint) {
        return balanceOf(address(this));
    }

    function getNumberOfHolders() public view returns (uint) {
        return holders.length;
    }

    function sendToWinner(address winner) public onlyAdmin {
        _transfer(address(this), winner, getLotteryPot());
    }

    //Presale Functions
    function presaleBuy() public payable {
        require(presaleOn == true, "Presale is closed!");
        require(presaleSoldTokens <= maxPresaleTokens, "Presale raised enough money so it is closed!");
        //convert how much BNB is sent to how many tokens they can buy
        //0.1 BNB = 1,000,000 tokens
        uint256 tokens = msg.value * 10000000;
        _transfer(admin, msg.sender, tokens);
        presaleSoldTokens += tokens;
    }

    function presaleFinish() public onlyAdmin {
        presaleOn = false;
    }

    function withdraw() public onlyAdmin {
        payable(admin).transfer(address(this).balance);
    }

}