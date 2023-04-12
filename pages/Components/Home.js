import React from "react";
import Select from "react-select";
import { useState,useEffect } from "react";
import { province, districts } from "../Services/Cities";
import { db } from "../Services/Firebase";
import { addDoc, collection, setDoc, doc, getDoc,getDocs } from "firebase/firestore";
import useSWR from "swr";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Home() {


   const [stList,setStList]=useState([''])
  const [sprovince, setProvince] = useState("Sindh");
  const [sdistrict, setDistrict] = useState("Karachi");
  const [stName, setStName] = useState("");
  const [stProvince, setStProvince] = useState("");
  const [stDistrict, setStDistrict] = useState("");
  const [sStName, setSstName] = useState("loading");
  const [sStDistrict, setSstDistrict] = useState("loading");
  const [sStNumber, setSstNumber] = useState("loading");
  let districtOptions = districts.filter((res) => {
    return res.province == sprovince;
  });

  useEffect(()=>{

    let unSubscribe = true;
    if(unSubscribe){
        console.log("Hello World")
        const reload = async () => {
          try {
            let res = await getDocs(collection(db,"station"));
            res.forEach((doc)=>{
              console.log(doc.data());
              setStList(doc.data().stName);
              setStDistrict(doc.data().stDistrict)
            })
          
         
           
          } catch (error) {
            console.log(error.message);
          }
        };
reload();
    }
   
   ()=>{
    return unSubscribe=false;
   }
  },[])

  const addStation = async () => {
    try {
      const docRef = await setDoc(doc(db, "station", stName.toLocaleLowerCase()), {
        stName: stName.toLocaleLowerCase(),
        stDistrict: sdistrict,
        stProvince: sprovince,
      });
      console.log(docRef);
    } catch (error) {
      console.log(error.message);
    }
  };
  const searchSt = async () => {
    try {
      let res = await getDoc(doc(db,"station", stName.toLocaleLowerCase()));
      console.log(res.data());
      setSstName(res.data().stName);
      setStDistrict(res.data().stDistrict)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container bg-dark p-4" style={{ marginTop: "40px" }}>
      <div className="row">
        <div className="col-12 col-md-3">
          <label htmlFor="inputEmail4" className="form-label text-white">
            Enter Station Name
          </label>
          <input
            type="text"
            className="form-control "
            placeholder="Add Station Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={(e) => {
              setStName(e.target.value);
            }}
          />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="inputEmail4" className="form-label text-white">
            Select Province
          </label>
          <Select
            options={province}
            onChange={(e) => {
              setProvince(e.value);
            }}
            id="long-value-select2"
            instanceId="long-value-select2"
          />
        </div>
        <div className="col-12 col-md-3">
          <label htmlFor="inputEmail4" className="form-label text-white">
            Select District
          </label>
          <Select
            options={districtOptions}
            onChange={(e) => {
              setDistrict(e.value);
            }}
            id="long-value-select2"
            instanceId="long-value-select2"
          />
        </div>
        <div className="col-12 col-md-3"></div>
      </div>
      <div className="input-group mt-4">
        <span className="input-group-text">Add Address</span>
        <textarea className="form-control" aria-label="With textarea"></textarea>
      </div>
      <button className="btn btn-primary mt-4" onClick={addStation}>
        Add Station
      </button>
      <div className="container mt-4 text-white h-100">
        <h3> Search Stations</h3>
      </div>
      <div className="row">
        <div className="col-md-4 col-12 mt-4 d-flex">
          <input
            type="search"
            className="form-control w-75 h-100 d-inline "
            placeholder="Add station Name"
            onChange={(e) => {
              setStName(e.target.value);
            }}
          />
          <button
            className="btn btn-primary d-inline w-25 h-100"
          onClick={searchSt}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row mt-4  text-white">
        <h5>Station Name : {sStName.toUpperCase()}</h5>
        <h5>Station Address : {stDistrict}</h5>
        <h5>Number of Bikes : Loading</h5>
        <div>
          <h3> Add New Bike</h3>
          <div className="row">
            <div className="col-4">
              <label htmlFor="inputEmail4" className="form-label text-white">
                Enter Station Name
              </label>
              <input
                type="text"
                className="form-control "
                placeholder="Bike Rigistration Number"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
            <div className="row mt-2">
              <div className="col-4 text-dark">
                <label htmlFor="inputEmail4" className="form-label text-white">
                  Select Station Name
                </label>
                <Select
                  options={districtOptions}
                  onChange={(e) => {
                    setDistrict(e.value);
                  }}
                  id="long-value-select2"
                  instanceId="long-value-select2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
