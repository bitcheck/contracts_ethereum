pragma solidity >=0.4.23 <0.6.0;

interface DisputeInterface {
    function getLockReasonStatus(bytes32 _hashkey) external view returns(uint256);
    
    function setLockReason(
        bytes32 _key,
        string calldata _description,
        uint256 _status,
        uint256 _replyDeadline,
        uint256 _refund,
        address payable _locker,
        address payable _recipient,
        uint256 _fee,
        uint256 _recipientAgree,
        uint256 _toCouncil
    ) external returns(bool);
    
    function getLockReason(bytes32 _hashkey) external view returns(
        string memory description,
        uint256 status,
        uint256 datetime,
        uint256 replyDeadline,
        uint256 refund,
        address payable locker,
        address payable recipient,
        uint256 fee,
        uint256 recipientAgree,
        uint256 toCouncil
    );

    function getStatus(bytes32 _hashkey) external view returns(uint256);
    function setStatus(bytes32 _hashkey, uint256 _status) external;
    function getRefund(bytes32 _hashkey) external view returns(uint256);
    function setRefund(bytes32 _hashkey, uint256 _refund) external;
    function getToCouncil(bytes32 _hashkey) external view returns(uint256);
    function setToCouncil(bytes32 _hashkey, uint256 _toCouncil) external;
    function getLocker(bytes32 _hashkey) external view returns(address payable);
    function setLocker(bytes32 _hashkey, address payable _locker) external;
    function getDatetime(bytes32 _hashkey) external view returns(uint256);
    function setDatetime(bytes32 _hashkey, uint256 _datetime) external;
    function getRecipientAgree(bytes32 _hashkey) external view returns(uint256);
    function setRecipientAgree(bytes32 _hashkey, uint256 _recipientAgree) external;
    function getReplyDeadline(bytes32 _hashkey) external view returns(uint256);
    function setReplyDeadline(bytes32 _hashkey, uint256 _replyDeadline) external;
    function getFee(bytes32 _hashkey) external view returns(uint256);
    function setFee(bytes32 _hashkey, uint256 _fee) external;
    function getRecipient(bytes32 _hashkey) external view returns(address payable);
    function setRecipient(bytes32 _hashkey, address payable _recipient) external;

    function sendFeeTo(address token, address to, uint256 amount) external;
}