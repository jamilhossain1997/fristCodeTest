import Head from 'next/head'
import Image from 'next/image'
import { Container, Table } from 'react-bootstrap';
// import styles from '../../styles/Home.module.css'
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import {useRouter} from'next/router';

export default function Home() {
  const [data, setData] = useState([]);
  const [megDel, setMegDel] = useState(null);
  const [loading,setLoading] =useState(true);
  const router=useRouter();
  useEffect(() => {
    if (!localStorage.getItem("user-info")) {
        router.push("/editor/login");
    }
}, []);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/ProductShow')
      .then(function (res) {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  function productDelete(id) {
    setMegDel(null);
    axios.delete('http://127.0.0.1:8000/api/deleteProduct/' + id)
    .then(function (res) {
        setMegDel(res.data.message);
      })
  }

  if(loading){
    return <h1>Loading....</h1>
  }
  else{
    return (
      <>
        <Header />
        <main>
          <Container >
           
            <Table striped bordered hover size="sm" className="mt-5">
              {
                megDel && <div class="alert alert-success" role="alert">
                  {megDel}
                </div>
              }
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Action</th>
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
                        <td>
                          <Link href={`/admin/${item.id}`}><Button>Update</Button></Link><br /><br />
                          <Button variant="danger" onClick={() => productDelete(item.id)}>Delete</Button>
                        </td>
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


