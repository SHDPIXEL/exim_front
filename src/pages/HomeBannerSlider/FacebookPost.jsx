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
        <>
            <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0npBrFFWEaigSupTSPqFQwj19j7U1MYpVix57w42PCVNnEeeDApXMUmc1ujvRVS6Ll%26id%3D100064039290498&show_text=true&width=500"
             width="100%" 
             height="698" 
             style={{ border:'none', overflow:'hidden' }}
             scrolling="no" 
             frameborder="0" 
             allowfullscreen="true" 
             allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </>
    );
};

export default FacebookPost;
