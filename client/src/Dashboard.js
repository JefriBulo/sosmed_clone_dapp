import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import {toast, ToastContainer} from "react-toastify";
import Feed from "./Feed";
import Widgets from "./Widgets";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MySwal = withReactContent(Swal);
const notify = () => toast("Wow so easy");

function getWindowSize(){
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
}

function Dashboard(){

    const [currentAccount, setCurrentAccount] = useState("");
    const [correctNetwork, setCorrectNetwork] = useState("");
    const [navbar, setNavbar] = useState("");
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [data, setData] = useState({
        address:"",
        Balance:null
    });
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const [loading, setLoading] = useState(false);

    //  Call Metamask to connect wallet on clicking connect wallet button
    const connectWallet = async () => {
        try{
            const ethereum = window.ethereum;
            if(!ethereum){
                console.log("Metamask not detected!");
                MySwal.fire({
                    title:<h4>Notification!</h4>,
                    didOpen:() => {
                        MySwal.showLoading()
                    },
                }).then(()=>{
                    return MySwal.fire(<p>Metamask not detected!</p>)
                });
                return;
            }

            let chainId = await ethereum.request({method: "eth_chainId"})
            // console.log("Connected to chain: " + chainId);

            const rinkebyChainId = "0x4";
            if(chainId !== rinkebyChainId){
                toast('You are not connected to Rinkeby network', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    icon:"🦄",
                    theme:"dark"
                });
                setCorrectNetwork(false);
                return;
            }else{
                // toast('Trying to connecting to chain id: ' + chainId + ' network', {
                //     position: "top-center",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme:"dark"
                // });
                setCorrectNetwork(true);
            }

            const accounts = await ethereum.request({method: "eth_requestAccounts"})

            console.log("Found Account: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        }catch (error){
            console.log("Error connecting to metamask", error);
        }
    }

    const checkCorrectNetwork = async () => {
        const {ethereum} = window
        let chainId = await ethereum.request({method: "eth_chainId"});
        console.log("Connected to chain: " + chainId);
        const rinkebyChainId = "0x4";
        if(chainId !== rinkebyChainId){
            setCorrectNetwork(false);
        }else{
            setCorrectNetwork(true);
        }
    }

    useEffect(() => {
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        }, 3000);
        connectWallet();
        checkCorrectNetwork();
        function handleWindowResize(){
            setWindowSize(getWindowSize());
        }
        window.addEventListener("resize", handleWindowResize);
        return()=>{
            window.removeEventListener("resize",handleWindowResize);
        };
    },[]);

    return(
        <div className="App">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <div className="p-8" style={{textAlign: "center", marginTop:"20px"}}>
                {currentAccount === "" ? (
                    // <div className="app grid grid-cols-3 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        <div className="w-64 md:text-center">
                            <div className="w-auto mx-auto md:w-64 xl:ml-52 lg:ml-52">
                                <Sidebar/>
                                <ToastContainer/>
                            </div>
                        </div>
                    </div>
                ) : correctNetwork ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        <div className="w-64 md:text-center">
                            <div className="w-auto mx-auto md:w-64 xl:ml-40">
                                <div>
                                    Width: {windowSize.innerWidth}<br/>
                                    {/*Height: {windowSize.innerHeight}*/}
                                </div>
                                <ToastContainer/>
                                <Sidebar/>
                            </div>
                        </div>
                        <div className="lg:w-72 sm:w-48 md:text-center">
                            <div className="w-auto mx-auto sm:w-36 xl:-ml-24">
                                <Feed/>
                            </div>
                        </div>
                        <div className="w-64 md:text-center">
                            <div className="w-auto mx-auto md:w-64 xl:ml-12">
                                <Widgets/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                        <div className="w-64 md:text-center">
                            <div className="w-auto mx-auto md:w-64 xl:-ml-52">
                                <div>
                                    Please connect to the Rinkeby Testnet
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Dashboard;