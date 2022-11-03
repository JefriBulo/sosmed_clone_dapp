import React, { useState, useEffect } from "react";
import "./Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import FlipMove from "react-flip-move";
import axios from "axios";
import { TwitterContractAddress } from "./config";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";
import {
    useParams,
    Link,
    Routes,
    Route
} from "react-router-dom";
import DetailUser from "./DetailUser";

function Feed({personal}){

    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const getUpdatedTweets = (allTweets, address) => {
        let updatedTweets = [];
        for(let i=0; i<allTweets.length; i++){
            if(allTweets[i].username.toLowerCase() == address.toLowerCase()){
                let tweet = {
                    "id":allTweets[i].id,
                    "tweetText":allTweets[i].tweetText,
                    "isDeleted":allTweets[i].isDeleted,
                    "username":allTweets[i].username,
                    "personal":true
                };
                updatedTweets.push(tweet);
            }else{
                let tweet = {
                    "id":allTweets[i].id,
                    "tweetText":allTweets[i].tweetText,
                    "isDeleted":allTweets[i].isDeleted,
                    "username":allTweets[i].username,
                    "personal":false
                };
                updatedTweets.push(tweet);
            }
        }
        return updatedTweets;
    }

    const getAllTweets = async() => {
        try{
            const ethereum = window.ethereum;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(
                    TwitterContractAddress,
                    Twitter.abi,
                    signer
                )

                let allTweets = await TwitterContract.getAllTweets();
                setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
            }else{
                console.log("Ethereum object doesn't exist")
            }
        }catch(error){
            console.log(error);
        }
    };

    const deleteTweet = key => async() => {
        console.log(key);
        try{
            const ethereum = window.ethereum;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(
                    TwitterContractAddress,
                    Twitter.abi,
                    signer
                );

                let deletedTweetTx = await TwitterContract.deleteTweet(key, true);
                let allTweets = await TwitterContract.getAllTweets();
                setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
            }else{
                console.log("Ethereum object doesn't exist");
            }
        }catch(error){
            console.log(error);
        }
    };

    const commentPosts = key => async() => {
        console.log("commecnt post:"+key);
        try{
            const ethereum = window.ethereum;
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(
                    TwitterContractAddress,
                    Twitter.abi,
                    signer
                );
                let commentTweets = await TwitterContract.commentPosts(key, true);
                let allComments = await TwitterContract.getAllTweets();
                // setComments()
            }else{
                console.log("Ethereum object doesn't exist => commentPosts");
            }
        }catch(error){
            console.log("error commecnt post:"+error);
        }
    };

    useEffect(() => {
        getAllTweets();
    }, []);

    return(
        <div className="feed">
            <div className="feed__header">
                <h3 className="font-bold">Hello Buddy</h3>
            </div>
            <TweetBox/>
            <FlipMove className="">
                {posts.map((post)=>(
                    <Post
                        key={post.id}
                        displayName={post.username}
                        text={post.tweetText}
                        personal={post.personal}
                        onClick={deleteTweet(post.id)}
                        ref={post.address}
                    />
                    // <Post
                    //     key={post.id}
                    //     displayName={post.username}
                    //     text={post.tweetText}
                    //     personal={post.personal}
                    //     onClick={deleteTweet(post.id)}
                    //     ref={post.address}
                    // />
                )).sort().reverse()}
            </FlipMove>
        </div>
    );
}

export default Feed;