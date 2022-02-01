import {useCallback, useState} from 'react';

export default function useHttp(newNote = false) {
    let [isLoading, setLoading] = useState(false);
    let [isError, setError] = useState(false);

        const httpReq = useCallback(async (getterData = null, reqData = {method: "GET"}, deleteNote = false, id = null) => {
            if(!newNote) setLoading(true);

            //Checking if the deleteNote Option is true to change endpoint
            let url = `${process.env.BASE_URL}/notes.json`
            if(deleteNote) url = `${process.env.BASE_URL}/notes.json/${id}.json`;

            const res =  await fetch(url, reqData);
           
            if(!res.ok) {
                try {
                    throw new Error("SomeThing Went Wrong!");
                }catch(e) {
                    setError(true);
                }
                
            }

            const noteData = await res.json();

            if(newNote) {
                return;
            }
            if(!newNote) setLoading(false);
            getterData(noteData)
        }
        , [newNote]);

        return {httpReq, isLoading, isError}
}