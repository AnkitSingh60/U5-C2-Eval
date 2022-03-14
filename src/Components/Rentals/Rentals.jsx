import { useEffect, useState } from "react";
import "./Rentals.css";

export const Rentals = () => {
  const [houseData, setHouseData] = useState([])
  const [searchData,setSearchData]=useState([])
  const [searchText, setSearchText] = useState("")
  const [tempData,setTempData] = useState([])
  useEffect(() => {
    housesData();
   
  }, [])

  const housesData=async ()=>{
    let res={}
    try{
      const _data=await fetch("http://localhost:8080/houses");
       res=await _data.json();
      setHouseData(res)
      setSearchData(res)
    }catch(e){
      console.warn(e.message);
    }
  }

  useEffect(()=>{
    if(searchText==="") setHouseData(searchData)
    else
    setHouseData(()=>{
      return searchData.filter((row)=>{
        return row.address?.toLowerCase().includes(searchText.toLowerCase().trim())})
    });
  },[searchData, searchText])

  // console.log(searchData)
 

  function handleSearch(text) {
    setSearchText(text);
  }
  
  return (
    <div className="rentalContainer">
      <div className="sortingButtons">
        <button className="sortById">Sort by ID</button>
        <button className="sortByRentAsc">Rent Low to high</button>
        <button className="sortByRentDesc">Rent High to low</button>
        <button className="sortByAreaAsc">Area Low to high</button>
        <button className="sortByAreaDesc">Area High to Low</button>
      </div>
      <input
        className="searchAddress"
        type="text"
        onChange={({target})=>handleSearch(target.value)}
        placeholder="Search Address"
      />
      <table className="table" border="1">
        <thead>
          <tr>
            <th>Sl.no.</th>
            <th>Name</th>
            <th>Owner Name</th>
            <th>Address</th>
            <th>Area Code</th>
            <th>Rent</th>
            <th>Available For</th>
            {/* <th>Image</th> */}
          </tr>
        </thead>
        <tbody>
          {houseData.map((house, index) => {
            return (
              <tr key={house.id} className="houseDetails">
                <td className="houseId">{house.id}</td>
                <td className="houseName">{house.name} </td>
                <td className="ownersName">{house.ownerName}</td>
                <td className="address">{house.address}</td>
                <td className="areaCode">{house.areaCode}</td>
                <td className="rent">{house.rent}</td>
                <td className="preferredTenants">
                  {house.preferredTenants ? "married" :"bachelors"}
                </td>
                {/* <td className="houseImage">
                  <img src={house.image} alt="house" />
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
