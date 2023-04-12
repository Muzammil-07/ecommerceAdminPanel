import React, { useEffect, useState } from 'react'
import { db } from "../Services/Firebase";
import { addDoc, collection, setDoc, getDoc, getDocs, query, where } from "firebase/firestore";
import useSWR from 'swr';
import Image from 'next/image';
import axios from 'axios';
function Products() {
  const catogary = [{ value: "newIn", label: "newIn" }, { value: "casual", label: "casual" }, { value: "formal", label: "formal" }];
  var arr = [];
  const [unSubscribe, setUnsubscribe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [myArray, updateMyArray] = useState([]);


  useEffect(() => {

    if (!unSubscribe) {
      arr = [];
      var b = 0;
      const reload = async () => {
      
        const getData = await getDocs(collection(db, "newIn"));
        updateMyArray([])
        getData.forEach((doc) => {
          console.log(doc.data())
          updateMyArray(args=>[...args, doc.data()])
          
        })
        setLoading(true)
        console.log("hello world")
        setUnsubscribe(true)
      }
      reload();


    }
    () => {

    }



  }, [])
  if (!loading) {
    return <div>Loading</div>
  }
console.log(myArray,"myArray")
  return (
    <div className='bg-light'>
      <div>
        <h1>New IN</h1>
        <div className='d-flex'>
          {myArray.map((doc,index) => {
            let a = doc;
         console.log(a.images[0],"uuuuu")
            return(
            <div className="card" key={index} style={{ width: "18rem" ,margin:20}}>
              <div className="card-body">
                <div className='d-flex justify-content-center '>
                <Image src={doc.images[1]} alt="img"  width={150} height={200}  />
                </div>
                <h5 className="card-title">{doc.productName}</h5>
                <p className="card-text">{doc.productPrice}</p>
                <p className="card-text">{doc.fabric}</p>
             
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>)
          })

          }
        </div>
      </div>
    </div>


  )
}

export default Products