pragma solidity ^0.5.16;

contract RealEstate {
    struct Buyer {
        address buyerAddress;
        string name;
        uint age;
    }

    mapping (uint => Buyer) public buyerInfo;
    address public owner;
    address payable seller;
    address[10] public buyers;

    event LogBuyRealEstate (
        address _buyer,
        uint _id
    );
    
    constructor() public {
        owner = msg.sender;
        seller = msg.sender;
    }

    function buyRealEstate(uint _id, string memory _name, uint _age) public payable {
        require(_id >= 0 && _id <= 9);
        buyers[_id] = msg.sender;
        buyerInfo[_id] = Buyer(msg.sender, _name, _age);

        emit LogBuyRealEstate(msg.sender, _id);
        seller.transfer(msg.value);
    }

    function getBuyerInfo(uint _id) public view returns (address, string memory, uint) {
        Buyer memory buyer = buyerInfo[_id];
        return (buyer.buyerAddress, buyer.name, buyer.age);
    }

    function getAllBuyers() public view returns (address[10] memory) {
        return buyers;
    }
}
