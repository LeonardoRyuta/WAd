// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "contracts/base/ERC721Base.sol";

contract Collection is ERC721Base {
    address public minter;

    modifier onlyMinter() {
        require(msg.sender == minter, "Collection: caller is not the minter");
        _;
    }

    constructor(
        address _minter,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721Base(_minter, _name, _symbol, _royaltyRecipient, _royaltyBps) {
        minter = _minter;
    }

    function setMinter(address _minter) public onlyOwner {
        minter = _minter;
    }

    function mintTo(
        address _to,
        string memory _tokenURI
    ) public virtual override onlyMinter {
        _setTokenURI(nextTokenIdToMint(), _tokenURI);
        _safeMint(_to, 1, "");
    }
}
