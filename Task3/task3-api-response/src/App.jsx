import axios from "axios";
import { useState } from "react";

function App() {

  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phone);
    axios.post('https://chimpu.online/api/post.php', {
      phonenumber: phone
    }).then((res) => {
      console.log(res.data);
      setMessage(res.data.msg);
    }).catch((err) => {
      console.log(err);
      alert(err);
    }).finally(() => {
      setPhone('');
    });
  };

  
  return (
    <>
      <div className="">
        <h1 className="bg-slate-800 text-white text-2xl px-4 py-2 font-bold text-center">
          Task 3 - API Response
        </h1>

        <form className="flex justify-center items-center py-10"
          onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-2 border-slate-800 rounded-md p-2 m-2"
          />
          <input
            type="submit"
            value="Submit"
            className="bg-slate-800 text-white rounded-md p-2 m-2 cursor-pointer hover:bg-slate-700 font-bold"
          />
        </form>
        <div className="flex justify-center items-center">
          {
              message &&
            <span className="text-slate-800 font-bold border-2 border-slate-800 rounded-md p-2">{message}</span>
          }
        </div>
      </div>
    </>
  );
}

export default App;
