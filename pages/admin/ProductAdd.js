import Header from '../Common/Header'
import axios from 'axios';
import { useState,useEffect} from 'react';
import { useRouter } from 'next/router';

const ProductAdd = () => {
    const [productname,setProductname]=useState('');
    const [price,setPrice]=useState('');
    const [img,setImg]=useState('');
    const [message, setMessage] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
            router.push("/editor/login");
        }
    }, [router.push("/editor/login")]);
    async function productAdd(){
        const formData = new FormData();
        setMessage(null);
        formData.append("productname", productname);
        formData.append("price", price);
        formData.append("img", img);
        try {
            const response = await axios({
              method: "post",
              url: "http://127.0.0.1:8000/api/ProductAdd",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message)
            router.push("/admin/ProductAdd")
          } catch(error) {
            console.log(error)
          }
    }
    return (
        <>
            <Header />
            <main>
                <div className='container'>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 mt-5">
                        {message && <div class="alert alert-primary" role="alert">
                                          {message}
                                     </div>}
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Product Name</label>
                                    <input type="text" onChange={(e)=>setProductname(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product Name" required/>
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">Product Price</label>
                                    <input type="text" onChange={(e)=>setPrice(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Price" required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label for="exampleInputEmail1">Product Image</label>
                                    <input type="file" onChange={(e)=>setImg(e.target.files[0])}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Product Iamge" required/>
                                </div>
                                <button type="submit" onClick={productAdd} className="btn btn-primary">Submit</button>
                           
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductAdd