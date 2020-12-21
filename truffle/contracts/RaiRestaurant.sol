pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";


contract RaiRestaurant {
    using SafeMath for uint256;
    event Enter(address indexed user, uint256 amount);
    event Leave(address indexed user, uint256 amount);

    IERC20 public rai;

    uint256 public reductionPerBlock;
    uint256 public multiplier;
    uint256 public lastMultiplerProcessBlock;

    uint256 public accRaiPerShare;
    uint256 public ackRaiBalance;
    uint256 public totalShares;

    struct UserInfo {
        uint256 amount; // RAI stake amount
        uint256 share;
        uint256 rewardDebt;
    }

    mapping(address => UserInfo) public userInfo;

    constructor(IERC20 _rai, uint256 _reductionPerBlock) public {
        rai = _rai;
        reductionPerBlock = _reductionPerBlock;
        // Use 999999390274979584 for 10% per month
        multiplier = 1e18;
        // Should be good for 20 years
        lastMultiplerProcessBlock = block.number;
    }

    // Clean the restaurant. Called whenever someone enters or leaves.
    function cleanup() public {
        // Update multiplier
        uint256 reductionTimes = block.number.sub(lastMultiplerProcessBlock);
        uint256 fraction = 1e18;
        uint256 acc = reductionPerBlock;
        while (reductionTimes > 0) {
            if (reductionTimes & 1 != 0) {
                fraction = fraction.mul(acc).div(1e18);
            }
            acc = acc.mul(acc).div(1e18);
            reductionTimes = reductionTimes / 2;
        }
        multiplier = multiplier.mul(fraction).div(1e18);
        lastMultiplerProcessBlock = block.number;
        // Update accRaiPerShare / ackRaiBalance
        if (totalShares > 0) {
            uint256 additionalRai = rai.balanceOf(address(this)).sub(ackRaiBalance);
            accRaiPerShare = accRaiPerShare.add(additionalRai.mul(1e12).div(totalShares));
            ackRaiBalance = ackRaiBalance.add(additionalRai);
        }
    }

    // Get user pending reward. May be outdated until someone calls cleanup.
    function getPendingReward(address _user) public view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        return user.share.mul(accRaiPerShare).div(1e12).sub(user.rewardDebt);
    }

    // Enter the restaurant. Pay some RAIs. Earn some shares.
    function enter(uint256 _amount) public {
        cleanup();
        safeRaiTransfer(msg.sender, getPendingReward(msg.sender));
        rai.transferFrom(msg.sender, address(this), _amount);
        ackRaiBalance = ackRaiBalance.add(_amount);
        UserInfo storage user = userInfo[msg.sender];
        uint256 moreShare = _amount.mul(multiplier).div(1e18);
        user.amount = user.amount.add(_amount);
        totalShares = totalShares.add(moreShare);
        user.share = user.share.add(moreShare);
        user.rewardDebt = user.share.mul(accRaiPerShare).div(1e12);
        emit Enter(msg.sender, _amount);
    }

    // Leave the restaurant. Claim back your RAIs.
    function leave(uint256 _amount) public {
        cleanup();
        safeRaiTransfer(msg.sender, getPendingReward(msg.sender));
        UserInfo storage user = userInfo[msg.sender];
        uint256 lessShare = user.share.mul(_amount).div(user.amount);
        user.amount = user.amount.sub(_amount);
        totalShares = totalShares.sub(lessShare);
        user.share = user.share.sub(lessShare);
        user.rewardDebt = user.share.mul(accRaiPerShare).div(1e12);
        safeRaiTransfer(msg.sender, _amount);
        emit Leave(msg.sender, _amount);
    }

    // Safe rai transfer function, just in case if rounding error causes pool to not have enough RAIs.
    function safeRaiTransfer(address _to, uint256 _amount) internal {
        uint256 raiBal = rai.balanceOf(address(this));
        if (_amount > raiBal) {
            rai.transfer(_to, raiBal);
            ackRaiBalance = ackRaiBalance.sub(raiBal);
        } else {
            rai.transfer(_to, _amount);
            ackRaiBalance = ackRaiBalance.sub(_amount);
        }
    }
}