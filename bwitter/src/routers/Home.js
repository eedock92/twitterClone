import { dbService } from "fbase";
import React , { useEffect, useState } from "react";
import Bweet from "components/Bweet";

const Home = ({userObj}) => {
    const [bweet, setBweet] = useState("");
    const [bweets, setBweets] = useState([]);
    const [attachment, setAttachment] = useState();
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
    const onFileChange = (event) => {
        const {
            target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent)=> {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null)
return (
    <div>
        <form onSubmit={onSubmit}>
            <input 
                value={bweet} onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
            />
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="Bweet" />
            {attachment &&(
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>)}
        </form>
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