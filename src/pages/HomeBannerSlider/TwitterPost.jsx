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
            <blockquote class="twitter-tweet"><p lang="en" dir="ltr">What does this milestone mean for India’s maritime journey?<br /><br />Read more: <a href="https://t.co/7VbS6CsF2n">www.t.co/7VbS6CsF2n</a><a href="https://twitter.com/hashtag/PSAMumbai?src=hash&amp;ref_src=twsrc%5Etfw">#PSAMumbai</a> <a href="https://twitter.com/hashtag/JNPort?src=hash&amp;ref_src=twsrc%5Etfw">#JNPort</a> <a href="https://twitter.com/hashtag/SagarSammanAwards?src=hash&amp;ref_src=twsrc%5Etfw">#SagarSammanAwards</a> <a href="https://twitter.com/hashtag/MaritimeIndia?src=hash&amp;ref_src=twsrc%5Etfw">#MaritimeIndia</a> <a href="https://twitter.com/hashtag/ShippingNews?src=hash&amp;ref_src=twsrc%5Etfw">#ShippingNews</a> <a href="https://twitter.com/hashtag/LogisticsLeadership?src=hash&amp;ref_src=twsrc%5Etfw">#LogisticsLeadership</a> <a href="https://twitter.com/hashtag/PortPerformance?src=hash&amp;ref_src=twsrc%5Etfw">#PortPerformance</a> <a href="https://twitter.com/hashtag/TradeUpdate?src=hash&amp;ref_src=twsrc%5Etfw">#TradeUpdate</a> <a href="https://twitter.com/hashtag/NationalMaritimeDay?src=hash&amp;ref_src=twsrc%5Etfw">#NationalMaritimeDay</a> <a href="https://twitter.com/hashtag/IndiaPorts?src=hash&amp;ref_src=twsrc%5Etfw">#IndiaPorts</a> <a href="https://t.co/WhGClLMp6t">pic.twitter.com/WhGClLMp6t</a></p>&mdash; Exim_India (@Exim_India) <a href="https://twitter.com/Exim_India/status/1909591228036898989?ref_src=twsrc%5Etfw">April 8, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </>
    );
};

export default TwitterPost;
