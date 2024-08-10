// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "contracts/base/ERC721Base.sol";

contract Collection is ERC721Base {
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721Base(
            _defaultAdmin,
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}
}
