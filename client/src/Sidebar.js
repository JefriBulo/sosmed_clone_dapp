import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./Sidebar.css";
import {Button} from "@mui/material/";
import {ListItem} from "@mui/material";
import { useAlert } from "react-alert";
import {ethers} from "ethers";
import Web3 from "web3";
import CurrencyFormat from "react-currency-format";
import { NumericFormat, PatternFormat } from "react-number-format";
import {toast} from "react-toastify";
import Feed from "./Feed";
import {Detector} from "react-detect-offline";

function Sidebar(){

    const [currentAccount, setCurrentAccount] = useState("");
    const [correctNetwork, setCorrectNetwork] = useState("");
    const alert = useAlert();
    const [idNetwork, setIdNetwork] = useState("");
    const [data, setData] = useState({
        address:"",
        balance:null
    });
    const [balAmount, setBalAmount] = useState("");
    const [balanceFromWei, setBalanceFromWei] = useState("");

    const btnHandler = () => {
        if(window.ethereum){
            window.ethereum.request({method:"eth_requestAccounts"}).then((res)=>accountChangeHandler(res[0]));
            // window.location.reload = "/";
            toast('Please choose metamask rinkeby testnet', {
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
        }else{
            toast('You are not connected to metamask', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                icon:"🦄",
                theme:"colored"
            });
        }
    };

    const connectWallet = async () => {
        try{
            const {ethereum} = window
            if(!ethereum){
                console.log("Metamask not detected!");
                return;
            }

            let chainId = await ethereum.request({method: "eth_chainId"});
            const accountId = await ethereum.request({method:"eth_requestAccounts"});
            console.log("Connected to chain: " + chainId + ", account: " + accountId);

            const rinkebyChainId = "0x4";
            if(chainId !== rinkebyChainId){
                alert("You are not connected to the Rinkeby Testnet!");
                setCorrectNetwork(false);
                return;
            }else{
                setCorrectNetwork(true);
            }

            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            const addr1 = accounts[0];
            const web3 = new Web3(window.ethereum);
            const balAmount = await web3.eth.getBalance(accounts[0]);
            console.log(balAmount);
            const balanceFromWei = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]));
            console.log("Balance from wei:"+balanceFromWei);

            console.log("Found Account: ", accounts[0])
            setCurrentAccount(accounts[0]);
        }catch (error){
            console.log("Error connecting to metamask", error);
        }
    };

    const klikTombol = async () => {
        const ethereum = window.ethereum;
        const akun = await ethereum.request({method:"eth_requestAccounts"});
        const web3 = new Web3(ethereum);
        const saldo = await web3.eth.getBalance(akun[0]);
        setBalAmount(saldo);
        console.log("Saldo:"+saldo);
    };

    const loadSaldo = async () => {
        const ethereum = window.ethereum;
        const akun = await ethereum.request({method:"eth_requestAccounts"});
        const web3 = new Web3(ethereum);
        const saldo = await web3.eth.getBalance(akun[0]);
        setBalAmount(saldo);
        setBalanceFromWei(saldo);
        console.log("Saldo:"+saldo);
    };

    const loadAkun = async() => {
        const ethereum = window.ethereum;
        const akun = await ethereum.request({method:"eth_requestAccounts"});
        const subAkun = akun[0].substring(0,4);
        const web3 = new Web3(ethereum);
        const akunSaya = await web3.eth.getAccounts(akun[0]);
        setCurrentAccount(subAkun);
    };

    const getAccounts = () => {
        if(window.ethereum){
            window.ethereum.request({method:"eth_requestAccounts"}).then((res) => {
                accountChangeHandler(res[0])
            });
        }else{
            alert("Install metamask extensional");
        }
    };

    const getBalance = (address) => {
        window.ethereum.request({
            method:"eth_getBalance",
            params:[address, "latest"]
        }).then((balance) => {
            setData({
                balance:ethers.utils.formatEther(balance)
            });
        });
    };

    const accountChangeHandler = (account) => {
        setData({
            address: account
        });
    };

    const balanceAmount = async() => {
        const addr1 = "0xeAfea38B21F7325cB53B53209EC765C9e214Cb4C";
        const str = "Hai Everyone";
        const web3 = new Web3(window.ethereum);
        const blnc = web3.eth.getBalance(addr1);
        console.log(balAmount);
        const balance2 = web3.utils.fromWei(web3.eth.getBalance(addr1));
        console.log(balance2);
    };

    const handleWalletBalance = async () => {
        try{
            const ethereum = window.ethereum;
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            const account = accounts[0];
            const web3 = new Web3(ethereum);
            const balAmount2 = await web3.eth.getBalance(account);
            const balance2 = new Web3(ethereum).utils.fromWei(await web3.eth.getBalance(account));
            setBalAmount(accounts[0]);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        connectWallet();
        klikTombol();
        loadSaldo();
        loadAkun();
    });

    return(
        <div className="App">
            <div className="sidebar">
                {currentAccount === "" ? (
                    <div className="flex flex-row">
                        {/*<Button variant="contained" className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500"*/}
                        {/*    onClick={connectWallet}>*/}
                        <button variant="contained" className="text-md py-3 px-12 bg-rose-700 text-pink-100 rounded-lg mb-10 hover:scale-105 transition duration-500"
                                onClick={btnHandler}>
                            Connect Wallet
                        </button>
                    </div>
                ) : (
                    <div onLoad={loadSaldo} style={{marginTop:"-35px"}} className="flex flex-row w-72 lg:-ml-20">
                        <div className="">
                            <ul className="bg-sky-200 mt-6  " style={{padding:"15px",borderRadius:"15px",textAlign:"left"}}>
                                <li className="mb-5 mt-4" style={{textAlign:"center"}}>
                                    <button variant="contained" onClick={klikTombol} className="text-md py-2 px-4 text-blue-100 rounded-xl bg-indigo-800">Sign Out</button>
                                </li>
                                <li>
                                    {/*Account: {currentAccount}</li>*/}
                                    Account: {currentAccount.substring(0,4)+" ... "+currentAccount.substring(29)}</li>
                                <li>
                                    Current Balance: {balanceFromWei}
                                    {/*Current Balance: {parseFloat(balanceFromWei.toLocaleString(undefined, {maximumFractionDigits:3})).toPrecision(6).substring(0,6)}*/}
                                </li>
                                <li>Network:</li>
                                <li>
                                    <Detector className="" render={({ online }) => (
                                        <div className={online ? "success" : "warning"} style={{marginBottom:"25px"}}>
                                            {online ? "online" : "offline"}
                                        </div>
                                    )}/>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;