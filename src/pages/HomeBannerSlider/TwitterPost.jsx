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
        <>
            <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Prometheus Unbound <a href="https://t.co/bCNBQTynB5">pic.twitter.com/bCNBQTynB5</a></p>&mdash; Elon Musk (@elonmusk) <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw">April 4, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </>
    );
};

export default TwitterPost;
