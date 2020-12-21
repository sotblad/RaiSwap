const hello = artifacts.require("RaiToken");

contract("RaiToken", function (accounts) {
  before(async () => {
    this.instance = await hello.deployed();
  });

  // 단위 케이스 테스트
  it("should be initialized with correct value", async () => {
    const greeting = await this.instance.ping();

    assert.equal(greeting, "pong!", "Wrong initialized value!");
  });
});
