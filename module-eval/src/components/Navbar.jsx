import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

const [restaurants, setRestaurants]=useState([]);
const [search, setSearch]=useState("");
const [type, setType]=useState("");
const [parking, setParking]=useState("");
const navigate=useNavigate();

const [form,setFrom]=useState({
   restaurantName: "",
        address: "",
        type: "",
        parkingLot: "",
        image: 
            "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
    });

    useEffect(()=>{
        setRestaurants(getRestaurants());
    }, []);
    const handleAdd=()=>{
        if(
            !form.restaurantName ||
            !form.address ||
            !form.type ||
            !form.parkingLot === ""
        ){
            alert("Please fill all fields");
            return;
        }
        const newRestaurant={
            id : Date.now(),
            ...form,
            parkingLot: form.parkingLot === "true",
        };

        const updated = [...restaurants, newRestaurant];
        saveRestaurants(updated);
        setRestaurants(updated);

        alert("Restaurants added successfully");

        setForm({
            restaurantName: "",
            address: "",
            type:"",
            parkingLot: "",
            image:
                "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg",
        });
    };

    const handleDelete=(id)=>{
        if(!window.confirm("Sre you sure you want to delete?")) return;

        const updated=restaurants.filter((r)=>r.id !==id);
        saveRestaurants(updated);
        setRestaurants(updated);

        alert("Restaurant deleted successfully");

        };
})