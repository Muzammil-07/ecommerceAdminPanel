import { db } from "../Services/Firebase";
import { addDoc, collection, setDoc, getDoc, getDocs } from "firebase/firestore";


export default async function  getData (req,res){
    const catogary = [{ value: "newIn", label: "newIn" }, { value: "casual", label: "casual" }, { value: "formal", label: "formal" }];
    var arr=[];
    var b=0;
  const a= catogary.forEach(async(doc)=>{

        const querySnapshot = await getDocs(collection(db, doc.value));
       const data=   querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
    arr.push(arr)
        });
     b++;
     console.log(b)
    })
    
if(b==3){
    res.status(200).json(arr)
}

    
}