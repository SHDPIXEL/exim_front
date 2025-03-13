import React from "react";


const ViewPage = () => {

   

    return (
       
        <div className="container border shadow-sm p-md-5 py-md-3">
        <div className="w-100 " style={{ height: "100vh" }}>
            <iframe 
                width="100%" 
                height="100%" 
                src="http://eximin.net/demo/index.html" 
                title="Embedded Page"
            ></iframe>
        </div>
    </div>
    
         
    )

}

export default ViewPage;