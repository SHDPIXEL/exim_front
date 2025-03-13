import React, { useEffect, useRef } from "react";

const TwitterPost = ({ tweetUrl }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (window.twttr && containerRef.current) {
            window.twttr.widgets.createTweet(
                tweetUrl.split("/").pop(),  
                containerRef.current,
                {
                    align: "center"  
                }
            );
        }
    }, [tweetUrl]);

    return (
        <div>
          
            <div ref={containerRef}></div>
        </div>
    );
};

export default TwitterPost;
