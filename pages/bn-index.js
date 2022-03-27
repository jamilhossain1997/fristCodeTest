import Head from 'next/head'
import Image from 'next/image'
import { Container, Table } from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react'; 
import { Button } from 'react-bootstrap';
import {useRouter} from 'next/router';

export default function Index() {
  const [data, setData] = useState([]);
  const [megDel, setMegDel] = useState(true);
  
  const router=useRouter();
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ProductbnShow')
      .then(function (res) {
        console.log(res);
        setData(res.data);
        setMegDel(false)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
        router.push("/editor/login");
    }
  }, []);
  // function productDelete(id) {
  //   setMegDel(null);
  //   axios.delete('http://127.0.0.1:8000/api/deleteProduct/' + id)
  //   .then(function (res) {
  //       setMegDel(res.data.message);
  //     })
  // }

  if(megDel){
    return <h1>Lodeing...</h1>
  }
 else{
  return (
    <>
      <Navbar/>
      <main>
        <Container >
            <h3 style={{ textDecoration: `none`, marginLeft: `430px`,marginTop:`10px` }}>পণ্য তালিকা</h3>
         
          <Table striped bordered hover size="sm" className="mt-5">
            {
              megDel && <div class="alert alert-success" role="alert">
                {megDel}
              </div>
            }
            <thead>
              <tr>
                <th>পণ্যের নাম</th>
                <th>পণ্যের দাম</th>
                <th>পণ্যের ছবি</th>
               
              </tr>
            </thead>
            <tbody>
              {
                data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.productname}</td>
                      <td>{item.price}</td>
                      <td><img style={{ width: 100 }} src={"http://127.0.0.1:8000/" + item.img} alt="jamil not image" /></td>
                      {/* <td>
                        <Button>Update</Button><br /><br />
                        <Button variant="danger" onClick={() => productDelete(item.id)}>Delete</Button>
                      </td> */}
                    </tr>
                  )
                })
              }

            </tbody>
          </Table>
        </Container>
      </main>

    </>
  )
 }
}