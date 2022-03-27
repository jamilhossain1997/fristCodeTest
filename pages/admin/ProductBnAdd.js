
import axios from 'axios';
import { useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import Header from '../Common/Header'

const ProductBnAdd = () => {
    const [productname,setProductname]=useState('');
    const [price,setPrice]=useState('');
    const [img,setImg]=useState('');
    const [message, setMessage] = useState(null);
    const router = useRouter();
    
    useEffect(() => {
        if (!localStorage.getItem("user-info")) {
            router.push("/editor/login");
        }
    }, []);
    async function productAdd(){
        const formData = new FormData();
        setMessage(null);
        formData.append("productname", productname);
        formData.append("price", price);
        formData.append("img", img);
        try {
            const response = await axios({
              method: "post",
              url: "http://127.0.0.1:8000/api/ProductbnAdd",
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
                            <h3>বাংলা ভাষা যোগ করুন</h3>
                        {message && <div class="alert alert-primary" role="alert">
                                          {message}
                                     </div>}
                                <div className="form-group">
                                    <label for="exampleInputEmail1">পণ্যের নাম</label>
                                    <input type="text" onChange={(e)=>setProductname(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="পণ্যের নাম লিখুন" required/>
                                </div><br/>
                                <div className="form-group">
                                    <label for="exampleInputEmail1">পণ্যের দাম</label>
                                    <input type="text" onChange={(e)=>setPrice(e.target.value)}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="পণ্যের দাম লিখুন" required/>
                                </div><br/>
                                <div className="form-group mb-3">
                                    <label for="exampleInputEmail1">পণ্যের ছবি</label>
                                    <input type="file" onChange={(e)=>setImg(e.target.files[0])}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="পণ্যের ছবি" required/>
                                </div><br/>
                                <button type="submit" onClick={productAdd} className="btn btn-primary">জমা দিন</button>
                           
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}


export default ProductBnAdd