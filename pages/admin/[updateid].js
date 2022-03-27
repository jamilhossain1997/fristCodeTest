import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Header from '../Common/Header'


const dataupdate = () => {
    const router = useRouter();
    const { updateid } = router.query;
    const [data, setData] = useState([]);
    const [productname, setProductname] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [message, setMessage] = useState(null);
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
            router.push("/editor/login");
        }
    }, []);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/oneProductshow/${updateid}`)
            .then(function (res) {
                console.log(res);
                setData(res.data.Product);
                setProductname(res.data.Product.productname)
                setPrice(res.data.Product.price)
                setImg(res.data.Product.img)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [updateid])

    async function handleUpdate(id) {
        // console.warn(name, file, descripaton, price)
        setMessage(null);
        const formData = new FormData();
        formData.append('img', img);
        formData.append('productname', productname);
        formData.append('price', price);

        let result = await fetch("http://127.0.0.1:8000/api/updateProduct/" + id + "?_method=PUT", {
            method: "POST",
            body: formData

        });
        setMessage(result.message)

    }

    return (
        <>
           <Header/>
            <div className='col-sm-6 offset-sm-3'>
                <h1 className='text-center'>update</h1><br />
                <br />
                {message && <div class="alert alert-primary" role="alert">
                    {message}
                </div>}
                <input type="text" onChange={(e) => setProductname(e.target.value)} defaultValue={data.productname} className="form-control" /><br />
                <input type="text" onChange={(e) => setPrice(e.target.value)} defaultValue={data.price} className="form-control" /><br />
                <input type="file" onChange={(e) => setImg(e.target.files[0])} defaultValue={data.img} className="form-control" /><br />
                <img style={{ width: 200 }} src={"http://127.0.0.1:8000/" + data.img} /><br /><br />
                <Button onClick={() => handleUpdate(data.id)} variant="outline-primary">Product Update</Button>
            </div>
        </>
    )
}

export default dataupdate