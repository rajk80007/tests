import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    // Fetch notes when the component mounts
    useEffect(() => {
        getNotes();
        
    }, []);

    // Fetch notes from API
    const getNotes = () => {
        axios.get('http://127.0.0.1:8000/api/notes')
            .then((res) => {
                setNotes(res.data.data);
            })
            .catch((err) => console.log(err));
    };

    // Handle note submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/create', {
            title: note,
            content: content,
        })
        .then((res) => {
            setMessage(res.data.message);
            setTimeout(() => {
                setMessage('');
            }, 2000);
            getNotes();  // Refresh the list of notes after adding
        })
        .catch((err) => console.log(err));

        // Clear form fields
        setNote('');
        setContent('');
    };

    // Handle delete note
    const deleteNote = (id) => {
        axios.post(`http://127.0.0.1:8000/api/delete/${id}`)
            .then((res) => {
                setMessage(res.data.message);
                setTimeout(() => {
                    setMessage('');
                }, 2000);
                // Remove the deleted note from the list
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            {message && <p className='text-green-500 text-center text-xl mt-4'>{message}</p>}
            <div className='flex items-center justify-center w-full'>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setNote(e.target.value)}
                        name='title'
                        className='border-2 border-slate-300 px-4 py-2 my-5 w-[350px] rounded-lg'
                        value={note} required
                    />
                    <textarea
                        name="content"
                        id=""
                        className='border-2 border-slate-300 px-4 py-2 my-1 w-[350px] rounded-lg'
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='Take a note...'
                        rows={5}
                        value={content} required
                    ></textarea>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-2'>Add</button>
                </form>
            </div>
            <div className='relative grid grid-cols-2 gap-4 md:grid-cols-3 mt-5 mb-10 pb-10 mx-5'>
                {notes && notes.map((note) => {
                    return (
                        <div key={note.id} className='border-2 border-slate-300 px-4 py-2 my-1 rounded-lg'>
                            <h2 className='text-xl font-bold'>{note.title}</h2>
                            <p>{note.content}</p>
                            <img
                                src="delete.svg"
                                width={30} height={30}
                                alt="delete"
                                className='cursor-pointer relative left-[90%] hover:scale-105'
                                onClick={() => confirm('Are you sure you want to delete this note?') && deleteNote(note.id)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Home;
