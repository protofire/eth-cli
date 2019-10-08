pragma solidity ^0.5.9;

contract Box {
  uint256 public value;

  event ValueIncremented();
  event ValueIncrementedBy(uint256 increment);

  constructor(uint256 _value) public {
    value = _value;
  }

  function inc() public {
    value++;
    emit ValueIncremented();
  }

  function incBy(uint256 increment) public {
    value += increment;
    emit ValueIncrementedBy(increment);
  }
}
