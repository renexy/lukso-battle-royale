// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@lukso/lsp7-contracts/contracts/LSP7DigitalAsset.sol";

contract SimpleAMA is LSP7DigitalAsset {
    struct Question {
        address sender;
        string questionText;
        string answerText;
        bool answered;
    }

    address public profileOwner;
    uint256 public questionCounter;
    mapping(uint256 => Question) public questions;
    mapping(address => bool) public hasReceivedToken;

    constructor(
        address newOwner
    ) LSP7DigitalAsset("Free Question Token", "FQT", newOwner, 0, false) {
        profileOwner = newOwner;
    }

    // each visitor gets one token
    function claimFreeToken() public {
        require(!hasReceivedToken[msg.sender], "Already claimed a free token");

        hasReceivedToken[msg.sender] = true;
        _mint(msg.sender, 1 * 10 ** 18, true, "Free token for AMA question");
    }

    // this will burn the visitors token after submitting a question
    function submitQuestion(string memory _questionText) public {
        require(
            balanceOf(msg.sender) >= 1 * 10 ** 18,
            "You need a token to submit a question"
        );

        questionCounter++;
        questions[questionCounter] = Question(
            msg.sender,
            _questionText,
            "",
            false
        );

        _burn(msg.sender, 1 * 10 ** 18, "Burn token to submit a question");
    }

    // lets owner of contract anwser questions
    function answerQuestion(
        uint256 _questionId,
        string memory _answerText
    ) public {
        require(
            msg.sender == profileOwner,
            "Only the profile owner can answer questions"
        );
        require(_questionId <= questionCounter, "Invalid question ID");

        Question storage question = questions[_questionId];
        question.answerText = _answerText;
        question.answered = true;
    }

    function getAllQuestions() public view returns (Question[] memory) {
        Question[] memory allQuestions = new Question[](questionCounter);
        for (uint256 i = 1; i <= questionCounter; i++) {
            allQuestions[i - 1] = questions[i];
        }

        return allQuestions;
    }

    // checks if address already submitted
    function hasSubmittedQuestion(address user) public view returns (bool) {
        for (uint256 i = 1; i <= questionCounter; i++) {
            if (questions[i].sender == user) {
                return true;
            }
        }
        return false;
    }
}
