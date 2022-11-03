import React from "react";
import {TwitterShareButton, TwitterTimelineEmbed, TwitterTweetEmbed} from "react-twitter-embed";
import {Helmet} from "react-helmet";

function Widgets(){
    return(
        <div className="">
            <Helmet>
                <title>Jeflo Punks Dapp</title>
            </Helmet>
            <div className="row-auto mb-5">
                <div className="col-auto col-start-4">
                    <TwitterShareButton
                        url=""
                        options={{height:200}}
                        placeholder="Share It"
                    />
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName="jeflo_punks"
                        options={{
                            height:500,width:350
                        }}
                        theme={"dark"}
                        noScrollbar={true}
                    />
                    {/*<TwitterTweetEmbed tweetId={"933354946111705097"}/>*/}
                </div>
            </div>
        </div>
    );
}

export default Widgets;