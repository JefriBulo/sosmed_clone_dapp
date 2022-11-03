import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./avatar";
import { Button } from "@material-ui/core";
import axios from "axios";
import { TwitterContractAddress } from "./config";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";

function TweetBox(){

    const [tweetMessage, setTweetMessage] = useState("");
    // const [tweetImage, setTweetImage] = useState("");
    const [avatarOptions, setAvatarOptions] = useState("");
    const addTweet = async() => {
        let tweet = {
            "tweetText":tweetMessage,
            "isDeleted":false
        };

        try{
            const {ethereum} = window
            if(ethereum){
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const TwitterContract = new ethers.Contract(
                    TwitterContractAddress,
                    Twitter.abi,
                    signer
                )
                let twitterTx = await TwitterContract.addTweet(tweet.tweetText, tweet.isDeleted);
                console.log(twitterTx);
            }else{
                console.log("Ethereum object doesn't exist");
            }
        }catch(error){
            console.log("Error submitting new Tweet ",error);
        }
    }

    const sendTweet = async(e) => {
        e.preventDefault();
        await addTweet();
        setTweetMessage("");
        // setTweetImage("");
    };

    useEffect(() => {
        let avatar = generateRandomAvatarOptions();
        setAvatarOptions(avatar);
    }, []);

    return(
        <div className="tweetBox 2xl:w-96">
            <form>
                <div className="tweetBox__input">
                    <Avatar
                        // style={{width:"75px",height:"75px"}}
                        className="md:w-96 lg:w-24 xl:w-24 2xl:w-24 sm:w-16 w-16 h-16"
                        avatarStyle="Circle"
                        {...avatarOptions}
                    />
                    <textarea
                        // className="w-8 sm:w-4 max-w-xs:w-4 xs:w-4"
                        className="tweetBox__input"
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="Hello Everyone"
                        // rows={2}
                        // cols={15}
                    ></textarea>
                </div>
                <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox__tweetButton"
                >
                    Publish
                </Button>
            </form>
        </div>
    );
}

export default TweetBox;