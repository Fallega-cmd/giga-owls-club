import './Navbar.css';
import { useState ,useEffect} from 'react';
import { useMetaMask } from "metamask-react";
import useEthBalance from '../../utils/scripts/useEthBalance';
import ethIcon from './eth.svg';
const menuItems = [
    {Name : "Explore",Id:1},
    {Name : "Suggest",Id:2},
    {Name : "Contact",Id:3},
    {Name : "About us",Id:4},
];



const Navbar = () => {
    const [innerText,setInnerText] = useState("");
    const { status, connect, account } = useMetaMask();
    const [isDisabled,setIsDisabled] = useState (false);
    const [isDisplayed,setIsDisplayed] = useState("none");
    const [isDispEth,setIsDispEth] = useState("none");
    const [isColored,setIsColored] = useState("red");
    const balance = useEthBalance(account)
    
    useEffect(() => {
        
        if (status === "connected"){
            const slicedfirst = account.slice(0,4).concat(".....");
            const slicedlast = account.slice(-4);
            const accountFormatted = slicedfirst.concat(slicedlast);
            setInnerText(accountFormatted);
            setIsDisabled(true);
            setIsDisplayed("block");
            setIsColored("greenyellow");
            setIsDispEth("block")
            
        };
        if (status === "initializing") {setInnerText("Initialising ...");}
        if (status === "unavailable"){setInnerText("Install Metamask");}
        if (status === "notConnected"){setInnerText ("Connect to MetaMask");
        setIsDisabled(false);
        setIsDisplayed("block");
        setIsColored("red");
    }
        if (status === "connecting") {setInnerText("connecting");};
        return null;
      }, [status, account]);
    
    const updateStatus = () => {
    if (status === "connected"){
    setInnerText(account.slice(0,4).concat(".....").concat(account.slice(-4)));
 
};
    if (status === "notConnected"){connect()};
    if (status === "unavailable"){window.open('https://metamask.io/download/', '_blank');}
    return null;
    }

 return (
       <div className="nav-main">
           <div className="logo">GigaOwlsClub</div>
           <div className="menu"><ul>
               {menuItems.map( (item) => {
                   return (<li key={item.Id}>{item.Name}</li>)
               } )}
           </ul></div>
           
           <button id="connectWallet" disabled={isDisabled} onClick={() => {updateStatus();}} className="connect-button">
               {innerText}
           </button>
           <div className='connected' style={{display:isDisplayed,backgroundColor:isColored}}></div>
           <div className='EthBalance' style={{display:isDispEth}}><img id="img1" style={{width:20,height:20}} alt="Ethereum Icon"src={ethIcon}></img> {balance === 0 ? "0.00" : balance}</div>
       </div>

    )
}

export default Navbar;