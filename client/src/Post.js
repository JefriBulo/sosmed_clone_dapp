import React, {forwardRef, useRef, useState} from "react";
import "./Post.css";
import Avatar from 'avataaars';
import { generateRandomAvatarOptions } from './avatar';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from '@material-ui/icons/Delete';
import {
    useHref,
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink,
    useParams, BrowserRouter,
    Navigate,
    useNavigate,
    useLocation,
    useNavigation
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import {Details} from "@material-ui/icons";
import DetailUser from "./DetailUser";
import ProfilePage from "./ProfilePage";

const Post = forwardRef(
    ({ displayName, text, personal, onClick }, ref) => {
        const usersId = ["0001","0002","0003"];
        const [posts, setPosts] = useState([]);
        let navigate = useNavigate();

        return (
            <div className="post" ref={ref}>
                <div className="post__avatar">
                    <Avatar
                        // style={{ width: '100px', height: '100px' }}
                        className="w-16 h-16 xl:w-24 xl:h-24"
                        avatarStyle='Circle'
                        {...generateRandomAvatarOptions() }
                    />
                </div>
                <div className="post__body">
                    <div className="post__header">
                        <div className="post__headerText">
                            {/*<h3>*/}
                            {/*    {posts.map((post)=>{*/}
                            {/*        {*/}
                            {/*            personal ?*/}
                            {/*                <Link to={`/detailuser/${post}`}>*/}
                            {/*                    <div className="text-green-600">{displayName.substring(0,4)+"..."+post.substring(38,42)}{""}</div>*/}
                            {/*                </Link> :*/}
                            {/*                <Link to={`/detailuser/${post}`}>*/}
                            {/*                    <div className="text-green-600">qq{displayName.substring(0,4)+"..."+post.substring(38,42)}{""}</div>*/}
                            {/*                </Link>*/}

                            {/*        }*/}
                            {/*    })}*/}
                            {/*</h3>*/}
                            <h3>{
                                personal ?
                                    <div className="text-green-600">
                                        <Link to={`detailuser/${displayName}`}>{displayName}{""}</Link>
                                    </div> :
                                    <div className="text-gray-600">
                                        <Link to={`detailuser/${displayName}`}>{displayName}{""}</Link>
                                    </div>
                            }
                            </h3>
                        </div>
                        <div className="post__headerDescription">
                            <p>{text}</p>
                        </div>
                    </div>
                    <div className="post__footer">
                        <Link to="/detailuser" element={<DetailUser/>}>
                            <ChatBubbleOutlineIcon fontSize="small" color={"primary"} cursor="pointer"/>
                        </Link>
                        {/*{posts.map((post)=>(*/}
                        {/*    <Link to={`/detailuser/${this}`}>*/}
                        {/*        <ChatBubbleOutlineIcon fontSize="small" color={"primary"} cursor="pointer"/>*/}
                        {/*    </Link>*/}
                        {/*))}*/}
                        {/*<Routes>*/}
                        {/*    <Route path="/detailuser/:post" element={<DetailUser/>}></Route>*/}
                        {/*</Routes>*/}
                        {/*{usersId.map(userId => {*/}
                        {/*    return(*/}
                        {/*        <a href={`/detailuser/userId/${userId}`}>*/}
                        {/*            <ChatBubbleOutlineIcon fontSize="small" color={"primary"} cursor="pointer"/>*/}
                        {/*        </a>*/}
                        {/*    );*/}
                        {/*})}*/}
                        {/*</Link>*/}
                        {/*<ChatBubbleOutlineIcon fontSize="small" color={"primary"}/>*/}
                        {/*<RepeatIcon fontSize="small" />*/}
                        <FavoriteBorderIcon fontSize="small" color={"secondary"}/>
                        <PublishIcon fontSize="small" cursor="pointer"/>
                        {personal ? (
                            <DeleteIcon cursor="pointer" color={"secondary"} fontSize="small" onClick={onClick}/>
                        ) : ("")}
                    </div>
                    <Routes>
                        <Route exact path="detailuser/:userId" element={<DetailUser/>}></Route>
                    </Routes>
                </div>
            </div>
        );
    }
);

export const User = () => {
    const params = useParams();
    return <div>qq{params.displayName}</div>
}

export default Post;