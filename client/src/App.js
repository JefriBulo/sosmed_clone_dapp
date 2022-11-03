import './App.css';
import "./index.css";
import React, {useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import {Button} from "@mui/material";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton
} from "react-twitter-embed";
import { Detector, Offline, Online } from "react-detect-offline";
import Navbar, {About} from "./Navbar";
import logo from "./assets/img/opensea_logo_collections_circle_clothes.png";
import preloaderJson1 from "./assets/json/77078-ethereum.json";
import preloaderJson2 from "./assets/json/62124-animation-of-eth-coin-button-icon.json"
import { ethers } from "ethers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eclipse } from "react-loading-io";
import { Player } from "@lottiefiles/react-lottie-player";
import {Route, Routes} from "react-router-dom";
import DetailUser from "./DetailUser";
import Dashboard from "./Dashboard";

const MySwal = withReactContent(Swal);
const notify = () => toast("Wow so easy");

function getWindowSize(){
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

function App() {

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
        toast('You already connected to chain id: ' + chainId + ' network', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme:"dark"
        });
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
      // toast('Trying to connecting to chain: ' + chainId + ' network', {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme:"dark"
      // });
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

  return (
      // <div className="container mx-auto md:container md:mx-auto">
      // <div className="container mx-auto">
      <div className="App">
        {loading ? (
            <div className="loader-container">
                <div className="spinner"
                     style={{
                       position:"fixed",left:"0px",top:"25%",width:"100%",height:"100%",textAlign:"center",
                       display:"inline-block",zIndex:"9999"
                     }}
                >
                  <Player
                      src={preloaderJson2}
                      autoplay
                      loop
                      style={{height:"300px",width:"300px"}}
                  />
                  {/*<Eclipse size={64} />*/}
                </div>
            </div>
        ) : (
            <div>
              <Navbar/>
              <div className="main">
                <Routes>
                  <Route path="/" element={<Dashboard/>}></Route>
                  <Route path="detailuser/:userId" element={<DetailUser/>}></Route>
                  <Route path="about" element={<About/>}></Route>
                </Routes>
              </div>

            </div>
        )}
      </div>
  );
}

export default App;
