import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import { Data } from './EmployData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [Id, setId] = useState(0)
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(Data)
  }, []);

  const handleEdit = (id) => {
    console.log(id);
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {

      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setEmail(dt[0].email);
      setPhone(dt[0].phone);

    }
  }

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are U Sure Delete This Item?")) {
        const dlt = data.filter(item => item.id !== id);
      }

    }
  }

  const handleSave = (e) => {
    let error = '';

    if(firstName === '')
    error += 'First Name is Required';

    if(email === '')
    error += 'Email Is Required';
  
    if(phone === '')
    error += "Mobile No is Requires";

    if (error === '') {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: Data.length + 1,
        firstName: firstName,
        email: email,
        phone: phone
      }
      dt.push(newObject);
      setData(dt);    
    }
    else{
      alert(error)
    }
    
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(Id);
    let dt = [...data];
    // console.log("dt", dt, firstName);
    dt[index].firstName = firstName;
    dt[index].email = email;
    dt[index].phone = phone;

    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setEmail('');
    setPhone('');
    setIsUpdate(false)
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <div>
          <label>FirstName :
            <input type='text' placeholder='Enter Your First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />&nbsp;
          </label>
        </div>
        <div>
          <label> Email :
            <input type='text' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} value={email} />&nbsp;
          </label>
        </div>
        <div>
          <label>Phone :
            <input type='text' placeholder='Enter Your Mobile no' onChange={(e) => setPhone(e.target.value)} value={phone} />&nbsp;
          </label>
        </div>
        <div>
          {
            !isUpdate ?
              <button className='btn btn-primary' onClick={(e) => handleSave(e)}>Save</button>
              :
              <button className='btn btn-primary' onClick={() => handleUpdate()}>Update</button>
          }

          <button className='btn btn-danger' onClick={() => handleClear()}>Clear</button>
        </div>
      </div>
      <table className='table table-hover '>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>FirstName</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
