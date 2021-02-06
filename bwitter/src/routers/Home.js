import { dbService } from "fbase";
import React , { useEffect, useState } from "react";
import Bweet from "components/Bweet";

const Home = ({userObj}) => {
    const [bweet, setBweet] = useState("");
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
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("bweets").add({
            text: bweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
    });
    setBweet("");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setBweet(value);
    };
return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
                value={bweet} onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
            />
            <input type="submit" value="Bweet" />
        </form>
        <div>
            {bweets.map((bweet) => (
                 <Bweet key={bweet.id} bweetObj={bweet} isOwner={bweet.creatorId === userObj.uid}/>
             ))}
        </div>
    </div>
);
};
<span>Home</span>;
export default Home;