import React, { useState, useEffect } from "react";
import {
    Route,
    Routes,
    Link,
    useParams,
    useSearchParams,
    useLocation
} from "react-router-dom";
import TweetBox from "./TweetBox";
import Sidebar from "./Sidebar";

function DetailUser(){
    let params = useParams();
    return(
        <div className="App">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Detail User</h1>
                </div>
            </header>
            <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                    <Sidebar/>
                    <TweetBox/>
                    User Details: {params.userId}
                </div>
            </div>
        </div>
    );

}

export default DetailUser;