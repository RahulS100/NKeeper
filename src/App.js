import React, {useState, useEffect} from 'react';
import useHttp from './hooks/httpreq';

//----------------------Importing thr React Componets------------------
import Header from './componets/Header';
import Note from './componets/Note';
import Footer from './componets/Footer';
import NoteInput from './componets/NoteInput';

//MUI Spinner Component
import CircularProgress from '@mui/material/CircularProgress'


function App() {

    //http Request Hook
    let {httpReq, isLoading, isError} = useHttp();
    let {httpReq: httpSend} = useHttp(true);

    let [notes, setNotes] = useState([]);


    //Http Request
    useEffect(() => {
     httpReq(getData)
    }, [httpReq])

    //Getting Data from the Custom Http Hook
    function getData(data) {

        let allnotes = [];
        //Transforming the Data Into array of Objects
        for(const key in data) {
            const newNote = {
                id: key,
                title: data[key].title,
                content: data[key].content
            }

            allnotes.push(newNote);
        }
        setNotes(allnotes);
    }


    //Using the same Hook Function for Adding and Deleting the Node
    //Add Note to firebase realtime DB
    function addNote(oneNote) {
        httpSend(null, {method: "POST", body: JSON.stringify(oneNote), headers: {
            "Content-Type": "application/json"
        }}).then(() => {
            httpReq(getData);
        });
    }


    //Remove Note from firebase RealTime DB
    function deleteNote(id) {
        httpSend(null, {method: "DELETE", headers: {"Content-Typr": "application/json"}}, true, id)
        .then(() => {
            httpReq(getData);
        })
    }

    const noteRender = (note, index) => {
        return (<Note title={note.title} description={note.content} key={index} id={note.id} OnDelete={deleteNote}/>);
    };
    

    return (<div>
    <Header />
    <NoteInput onSubmitNote={addNote}/>
    <div className="all-note-container">
    {!isLoading && !isError && notes.map(noteRender)}
    {isLoading && !isError && <div className='center'><CircularProgress color="inherit" /></div>}
    {!isLoading && isError && <p>Something Went Wrong!</p>}
    </div>
    <Footer />
    </div>);
}

export default App;

