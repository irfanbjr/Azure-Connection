import React from "react";


const Addproduct=()=>
{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const [imei1,setImei1]=React.useState('');
    const [imei2,setImei2]=React.useState('');
    const [details,setDetails]=React.useState('');

    const [error,setError]= React.useState('')
    const handleAdd= async()=>
    {
        //Note:if one of the is empty will return true
        if(!name|| !price|| !category|| !company 
            || !imei1 || !imei2 || !details)
        {
            setError(true);
            return false;

        }
        //console.log(name,price,category,company)
        let result=await fetch('http://mobile.backend.alphasconsulting.com/add-product',{
                method:'post',
                //but we cannot send like this api not accept this
                //body:name,price,category,company

                //because API accept JSON format this will work
                body:JSON.stringify({name,price,category,company,imei1,imei2,details}),
                headers:{
                    "Content-Type":"application/json",
                    // for token vrification
                    Authorization:`e-mobile ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result= await result.json();
        console.log(result);
    }
    return(
        <div className="product">
            <h1 className='listHeader'>Add Product</h1>
            <input value={name} onChange={(e)=>{setName(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Name"/>
            {/* //for error  & error, field name for when try to submit without text */}
            {error && !name && <span className="invalid-input">Enter valid name </span>}

            <input value={price} onChange={(e)=>{setPrice(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Price"/>

            {error && !price &&<span className="invalid-input">Enter valid price </span>}
            
            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Category"/>
           
            {error && !category &&<span className="invalid-input">Enter valid categori </span>}
            
            <input value={company} onChange={(e)=>{setCompany(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Company"/>
            
            {error && !company && <span className="invalid-input">Enter valid company </span>}

            <input value={imei1} onChange={(e)=>{setImei1(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product IMEI 1"/>
            
            {error && !imei1 && <span className="invalid-input">Enter valid IMEI </span>}

            <input value={imei2} onChange={(e)=>{setImei2(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product IMEI 2"/>
            
            {error && !imei2 && <span className="invalid-input">Enter valid IMEI 2 </span>}

            <input value={details} onChange={(e)=>{setDetails(e.target.value)}} className="inputBox" type="text" placeholder="Enter Product Details"/>
            
            {error && !details && <span className="invalid-input">Enter valid Details </span>}


            
            <button onClick={handleAdd} className="btnLogup" type="button">Add Product</button>
        </div>
       
    )
}

export default Addproduct;