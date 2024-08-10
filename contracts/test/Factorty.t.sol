// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import {Factory} from "../src/Factory.sol";

// import {Collection} from "../src/Collection.sol";

contract FactoryTest is Test {
    Factory public factory;

    function setUp() public {
        factory = new Factory();
    }

    function test_CreateNFTAd() public {
        address[] memory targets = new address[](2);
        targets[0] = address(0x1);
        targets[1] = address(0x2);

        factory.createNFTAd("https://example.com/", targets, "NFTAd", "NFT");

        assertEq(factory.getCollections().length, 1);
    }

    function test_GetInterests() public {
        string[] memory interests = new string[](2);
        interests[0] = "interest1";
        interests[1] = "interest2";

        factory.pushInterest(msg.sender, interests);

        assertEq(factory.getInterestsByUser(msg.sender).length, 2);
    }
}
