const { expectRevert } = require('@openzeppelin/test-helpers');
const RaiToken = artifacts.require('RaiToken');

contract('RaiToken', ([alice, bob, carol]) => {
    beforeEach(async () => {
        this.rai = await RaiToken.new({ from: alice });
    });

    it('should have correct name and symbol and decimal', async () => {
        const name = await this.rai.name();
        const symbol = await this.rai.symbol();
        const decimals = await this.rai.decimals();
        assert.equal(name.valueOf(), 'RaiToken');
        assert.equal(symbol.valueOf(), 'RAI');
        assert.equal(decimals.valueOf(), '18');
    });

    it('should only allow owner to mint token', async () => {
        await this.rai.mint(alice, '100', { from: alice });
        await this.rai.mint(bob, '1000', { from: alice });
        await expectRevert(
            this.rai.mint(carol, '1000', { from: bob }),
            'Ownable: caller is not the owner',
        );
        const totalSupply = await this.rai.totalSupply();
        const aliceBal = await this.rai.balanceOf(alice);
        const bobBal = await this.rai.balanceOf(bob);
        const carolBal = await this.rai.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '100');
        assert.equal(bobBal.valueOf(), '1000');
        assert.equal(carolBal.valueOf(), '0');
    });

    it('should supply token transfers properly', async () => {
        await this.rai.mint(alice, '100', { from: alice });
        await this.rai.mint(bob, '1000', { from: alice });
        await this.rai.transfer(carol, '10', { from: alice });
        await this.rai.transfer(carol, '100', { from: bob });
        const totalSupply = await this.rai.totalSupply();
        const aliceBal = await this.rai.balanceOf(alice);
        const bobBal = await this.rai.balanceOf(bob);
        const carolBal = await this.rai.balanceOf(carol);
        assert.equal(totalSupply.valueOf(), '1100');
        assert.equal(aliceBal.valueOf(), '90');
        assert.equal(bobBal.valueOf(), '900');
        assert.equal(carolBal.valueOf(), '110');
    });

    it('should fail if you try to do bad transfers', async () => {
        await this.rai.mint(alice, '100', { from: alice });
        await expectRevert(
            this.rai.transfer(carol, '110', { from: alice }),
            'ERC20: transfer amount exceeds balance',
        );
        await expectRevert(
            this.rai.transfer(carol, '1', { from: bob }),
            'ERC20: transfer amount exceeds balance',
        );
    });
  });
