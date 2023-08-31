import React, { useEffect } from "react";
import {useParams,useNavigate} from "react-router-dom"


const UpdateProduct=()=>
{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const param = useParams();
    const navigate = new useNavigate();
    const [error,setError]= React.useState('');
    const [imei1,setImei1]=React.useState('');
    const [imei2,setImei2]=React.useState('');
    const [details,setDetails]=React.useState('');

    useEffect(()=>
    {
        setError('')
       // console.log(param);
       //this fanction have API for update from field with concern 
        getProductDetails();
    }, []);

    const getProductDetails= async()=>
    {
        let result = await fetch(`http://mobile.backend.alphasconsulting.com/product/${param.id}`,{
            headers:
            {
            // this bearer is extra for more secure on BE side I removed this
            // so if any body genreate token and pass only token not with any other word with space
            // then will not work only token
            Authorization:`e-mobile ${JSON.parse(localStorage.getItem('token'))}`
            } 
        });
        result = await result.json();
        if(result)
        {
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company);
            setImei1(result.imei1);
            setImei2(result.imei2);
            setDetails(result.details);
        }
        console.log(result);

        //console.log(result);
    }
    const handleUpdate= async()=>
    {
        if(!name|| !price|| !category|| !company 
            || !imei1 || !imei2 || !details)
        {
            setError(true);
            return false;

        }
        let result = await fetch(`http://mobile.backend.alphasconsulting.com/product/${param.id}`,{
            method:"put",
            body:JSON.stringify({name,price,category,company,imei1,imei2,details}),
            headers:{
                "Content-Type":"application/json",
                 // for token vrification
                 Authorization:`e-mobile ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        navigate('/')
        //if(!name|| !price|| !category|| !company)
        console.log(result )
    }

    return(
        <div className="product">
            <h1 className='listHeader'>Update Product</h1>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Name"/>
            {error && !name && <span className="invalid-input">Enter valid name </span>}

            <input value={price} onChange={(e)=>{setPrice(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Price"/>
            {error && !price && <span className="invalid-input">Enter valid price </span>}
           
            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Category"/>
            {error && !category && <span className="invalid-input">Enter valid category </span>}
           
            <input value={company} onChange={(e)=>{setCompany(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Company"/>
            {error && !company && <span className="invalid-input">Enter valid company </span>}
           
            <input value={imei1} onChange={(e)=>{setImei1(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product IMEI 1"/>
            {error && !imei1 && <span className="invalid-input">Enter valid imei1 </span>}
            
            <input value={imei2} onChange={(e)=>{setImei2(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product IMEI 2"/>
            {error && !imei2 && <span className="invalid-input">Enter valid imei2 </span>}
            
           
            <input value={details} onChange={(e)=>{setDetails(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Details"/>
            {error && !details && <span className="invalid-input">Enter valid details </span>}
            
            
            <button onClick={handleUpdate} className="btnLogup" type="button">Update Product</button>
        </div>
       
    )
}

export default UpdateProduct;