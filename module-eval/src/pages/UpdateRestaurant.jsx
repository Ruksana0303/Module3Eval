import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

const UpdateRestaurant=()=>{
    const { id }=useParams();
    const navigate=useNavigate();
    const [form, setForm]=useState(null);

    useEffect(()=>{
        const restaurants=getRestaurants();
        const current =restaurants.find(
            (r) => r.id === Number(id)
        );
        setForm(current);
    }, [id]);
    if (!form) return <h3>Loading...</h3>;

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    };

    const handleUpadte=()=>{
        if(
            !form.restaurantName ||
            !form.address ||
            !form.type
        ){
            alert("Fields cannot be empty");
            return;
        }
        if(!window.confirm("Are you sure you want to update?")) return;

        const restaurants=getRestaurants();
        const upadted=restaurants.map((r)=>
            r.id === form.id 
                ?{...form,parkingLot: form.parkingLot === "true"}
                : r
        );
        saveRestaurants(updated);
        alert("Restaurant updates successfully");
        navigate("/admin/dashboard");
        
    };

    return(
        <div>
            <h2>Update Restaurant</h2>

            <input
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleChange}
            />

            <input  
                name="address"
                value={form.address}
                onChange={handleChange}
            />

            <select
                name="type"
                value={form.type}
                onChange={handleChange}
            >
                <option>Rajasthani</option>
                <option>Gujarati</option>
                <option>Mughlai</option>
                <option>Jain</option>
                <option>Thai</option>
                <option>North Indian</option>
                <option>South Indian</option>
            </select>
            <select 
                        name="parkingLot"
                        value={form.parkingLot}
                        onChange={handleChange}
                    >
                        
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <button onClick={handleUpdate}>Update</button>

        </div>
    );
};
export default UpdateRestaurant;