var RealEstate = artifacts.require("./RealEstate.sol");

contract('RealEstate', function(accounts){
    var realEstateInstance;

    it("컨트랙트의 소유자 초기화 테스트", function() {
        return RealEstate.deployed().then(function(instance) {
            realEstateInstance = instance;
            return realEstateInstance.owner.call();
        }).then(function(owner) {
            assert.equal(owner.toUpperCase(), accounts[0].toUpperCase(), "owner가 배포계정과 동일하지 않습니다.")
        })
    })

    it("가나슈 두번째 계정으로 매물 0번 매입 후 이벤트 생성 및 매입자 정보와 buyer 확인", function() {
        return RealEstate.deployed().then(function(instance) {
            realEstateInstance = instance;
            return realEstateInstance.buyRealEstate(0, "sejong", 13, {from: accounts[1], value: web3.utils.toWei("1.50", "ether")});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, "이벤트 하나 생성 안됨");
            assert.equal(receipt.logs[0].event, "LogBuyRealEstate", "이벤트가 LogBuyRealEstate가 아닙니다.");
            assert.equal(receipt.logs[0].args._buyer, accounts[1], "매입자가 가나슈 계정이 아닙니다.");
            assert.equal(receipt.logs[0].args._id, 0, "매물 아이디가 0이 아닙니다.");
            return realEstateInstance.getBuyerInfo(0);
        }).then(function(buyerInfo) {
            assert.equal(buyerInfo[0].toUpperCase(), accounts[1].toUpperCase(), "매입자 계정이 가나슈 1번 계정이 아닙니다.");
            // assert.equal(web3.utils.toAscii(buyerInfo[1]).replace(/\0/g, ''), "sejong", "매입자 이름이 세종이 아닙니다.")
            assert.equal(buyerInfo[2], 13, "매입자의 나이가 13살이 아닙니다.");
            return realEstateInstance.getAllBuyers();
        }).then(function(buyers) {
            assert.equal(buyers[0].toUpperCase(), accounts[1].toUpperCase(), "Buyer 배열과 가나슈 계정이 일치하지 않습니다.")
        });
    })
});