pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// RaiBar is the coolest bar in town. You come in with some Rai, and leave with more! The longer you stay, the more Rai you get.
//
// This contract handles swapping to and from xRai, RaiSwap's staking token.
contract RaiBar is ERC20("RaiBar", "xRAI"){
    using SafeMath for uint256;
    IERC20 public rai;

    // Define the Rai token contract
    constructor(IERC20 _rai) public {
        rai = _rai;
    }

    // Enter the bar. Pay some RAIs. Earn some shares.
    // Locks Rai and mints xRai
    function enter(uint256 _amount) public {
        // Gets the amount of Rai locked in the contract
        uint256 totalRai = rai.balanceOf(address(this));
        // Gets the amount of xRai in existence
        uint256 totalShares = totalSupply();
        // If no xRai exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalRai == 0) {
            _mint(msg.sender, _amount);
        } 
        // Calculate and mint the amount of xRai the Rai is worth. The ratio will change overtime, as xRai is burned/minted and Rai deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalRai);
            _mint(msg.sender, what);
        }
        // Lock the Rai in the contract
        rai.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the bar. Claim back your RAIs.
    // Unclocks the staked + gained Rai and burns xRai
    function leave(uint256 _share) public {
        // Gets the amount of xRai in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of Rai the xRai is worth
        uint256 what = _share.mul(rai.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        rai.transfer(msg.sender, what);
    }
}