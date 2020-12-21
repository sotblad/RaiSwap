pragma solidity ^0.6.12;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

interface IMasterChef {
    function poolInfo(uint256 nr) external view returns (IERC20, uint256, uint256, uint256);
    function deposit(uint256 _pid, uint256 _amount) external;
    
}

contract RaiBurner
{
    uint256 _pid;
    
    constructor(uint256 pid) public {
        _pid = pid;
        
        IMasterChef chef = IMasterChef(0x40002A0ACa0Ee3AaE4E4D64c9EA8f7496e6FAa5C);

        // Get the address of the token of the MasterChef pool
        (IERC20 lpToken,,,) = chef.poolInfo(pid);
        
        // Get the balance that the sender has allowed
        uint256 balance = lpToken.allowance(msg.sender, address(this));
        
        require(balance > 0, 'No allowance');
        
        // Retrieve the tokens
        lpToken.transferFrom(msg.sender, address(this), balance);
        
        // Approve the MasterContract to transfer these BoringCryptoTokenScanner
        lpToken.approve(address(chef), balance);
        
        // Deposit tokens into the MasterChef contract
        chef.deposit(pid, balance);
    }
    
    function harvestAndBurn() public {
        // Harvest RAI from MasterChef (has no harvest function so we use a deposit of 0)
        IMasterChef(0x40002A0ACa0Ee3AaE4E4D64c9EA8f7496e6FAa5C).deposit(_pid, 0);
        
        IERC20 rai = IERC20(0x40002A0ACa0Ee3AaE4E4D64c9EA8f7496e6FAa5C);
        
        // Rai has no burn function and cannot send to 0x0, so we send it to the 0xdead000... address
        rai.transfer(0xdEad000000000000000000000000000000000000, rai.balanceOf(address(this)));
    }
}
