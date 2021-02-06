import { dbService } from "fbase";
import React , { useEffect, useState } from "react";

const Home = () => {
    const [bweet, setBweet] = useState("");
    const [bweets, setBweets] = useState([]);
    const getBweets = async()=>{
        const dbBweets = await dbService.collection("bweets").get();
        dbBweets.forEach((document) => {
            const bweetObject = {
                ...document.data(),
                id: document.id,
            };
            setBweets(prev => [bweetObject, ...prev]);
        });
        console.log(dbBweets);
    };
    useEffect(() => {
        getBweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("bweets").add({
            bweet,
            createdAt: Date.now()
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
            <input value={bweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="Bweet" />
        </form>
        <div>
            {bweets.map( (bweet) => (
            <div key={bweet.id}>
               <h4>{bweet.bweet}</h4>
               </div>
               ))}
        </div>
    </div>
);
};
<span>Home</span>;
export default Home;