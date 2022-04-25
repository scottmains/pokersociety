
import axios from "axios";
import { useState} from 'react';

const UsersExcerpt = ({ user }) => {

    const [winUpdate, setWinUpdate] = useState('');
    const [lossUpdate, setLossUpdate] = useState('');

    const [winContent, setWinContent] = useState(false);
    const [lossContent, setLossContent] = useState(false);

    const editWins = async (e) => {
        const response = await axios.post('http://localhost:5000/api/admin/updateWins',
           { _id: user._id, winUpdate: winUpdate }
        );
    }

    const editLosses = async (e) => {
        const response = await axios.post('http://localhost:5000/api/admin/updateLosses',
           { _id: user._id, lossUpdate: lossUpdate }
        );
    }


const showWinContent = () => {
    setWinContent(!winContent)

    }

    const showLossContent = () => {
        setLossContent(!lossContent)
    
        }
    



    return (
        <article className="mx-auto p-1 mt-2 sm:w-1/3 rounded-lg border text-white border-green-200 shadow-md bg-green-800 ">
            <h4 className="font-mono text-4xl"> Name: {user.name}</h4> 
            <p className="font-mono text-lg pt-3 "> Wins: {user.wins}</p>
             <button className="text-red" onClick={showWinContent}>Edit</button>
             <div className={winContent? 'hidden' : undefined}>
             <input className="appearance-none rounded-none relative block w-20 mx-auto px-3 py-2 border border-gray-300 
            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500
             focus:z-10 sm:text-sm" 
            type="text" id="wins" onChange={(e)=> setWinUpdate(e.target.value)} value={winUpdate} required />
           
            <button onClick={editWins}>Submit</button>
            </div>

            <p className="font-mono text-lg pt-3 ">Losses: {user.losses}</p>
             <button className="text-red" onClick={showLossContent}>Edit</button>
             <div className={lossContent? 'hidden' : undefined}>
             <input className="appearance-none rounded-none relative block w-20 mx-auto px-3 py-2 border border-gray-300 
            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500
             focus:z-10 sm:text-sm" 
            type="text" id="losses" onChange={(e)=> setLossUpdate(e.target.value)} value={lossUpdate} required />
           
            <button onClick={editLosses}>Submit</button>
            </div>
        </article>
    )
}
export default UsersExcerpt