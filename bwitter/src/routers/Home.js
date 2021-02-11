import React , { useEffect, useState } from "react";

import { dbService, storageService } from "fbase";
import Bweet from "components/Bweet";
import BweetFactory from "components/BweetFactory";

const Home = ({userObj}) => {
   
    const [bweets, setBweets] = useState([]);
    useEffect(() => {
       dbService.collection("bweets").onSnapshot(snapshot => {
            const bweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBweets(bweetArray);
        });
    }, []);
  
return (
    <div>
        <BweetFactory userObj = {userObj}/>
        <div>
            {bweets.map((bweet) => (
                 <Bweet 
                 key={bweet.id} 
                 bweetObj={bweet} 
                 isOwner={bweet.creatorId === userObj.uid}
                 />
             ))}
        </div>
    </div>
);
};
<span>Home</span>;
export default Home;