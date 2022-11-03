//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract TwitterContract {
    event AddTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);
    event AddComment(address recipient, uint commentId);
    event DeleteComment(uint commentId, bool deletedComment);

    struct Tweet{
        uint id;
        address username;
        string tweetText;
        bool isDeleted;
    }
    Tweet[] private tweets;

    struct CommentTweet{
        uint id_comment;
        address username;
        string user_comment;
        bool deletedComment;
    }
    CommentTweet[] private comments;

    //  Mapping of Tweet id to the wallet address of the user
    mapping(uint256 => address) tweetToOwner;
    mapping(uint256 => address) commentToOwner;
    //  Method to be called by our frontend when trying to add a new Tweet
    function addTweet(string memory tweetText, bool isDeleted) external{
        uint tweetId = tweets.length;
        tweets.push(Tweet(tweetId, msg.sender, tweetText, isDeleted));
        tweetToOwner[tweetId] = msg.sender;
        emit AddTweet(msg.sender, tweetId);
    }
    //  add new comments
    function addComment(string memory user_comment, bool deletedComment) external{
        uint commentId = comments.length;
        comments.push(CommentTweet(commentId, msg.sender, user_comment, deletedComment));
        commentToOwner[commentId] = msg.sender;
        emit AddComment(msg.sender, commentId);
    }

    //  Method to get all the Tweets
    function getAllTweets() external view returns (Tweet[] memory){
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++){
            if(tweets[i].isDeleted == false){
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++){
            result[i] = temporary[i];
        }
        return result;
    }

    //  Method to get only my Tweets
    function getMyTweets() external view returns (Tweet[] memory){
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++){
            if(tweetToOwner[i] == msg.sender && tweets[i].isDeleted == false){
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++){
            result[i] = temporary[i];
        }
        return result;
    }

    //  Method to delete a Tweet
    function deleteTweet(uint tweetId, bool isDeleted) external{
        if(tweetToOwner[tweetId] == msg.sender){
            tweets[tweetId].isDeleted = isDeleted;
            emit DeleteTweet(tweetId, isDeleted);
        }
    }

}
