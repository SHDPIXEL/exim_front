import React, { useEffect } from "react";

const FacebookPost = () => {
    useEffect(() => {
        if (!window.FB) {
            const script = document.createElement("script");
            script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        } else {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <div className="fb-page"
            data-href="https://www.facebook.com/facebookapp"
            data-tabs="timeline"
            data-width="470"
            data-height="700"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true">
        </div>

    );
};

export default FacebookPost;
