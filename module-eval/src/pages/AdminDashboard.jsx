import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import { getRestaurants , saveRestaurants} from "../utils/localStorage";

const AdminDashboard=()=>{
    const [restaurants, setRestaurants]=useState([]);
    const navigate=useNavigate();

    const [form, setForm]=useState({
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

    const handleChange=(e)=>{
        setForm({ ...form, [e.target.name]: e.target.value});
    };

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

        return(
            <div style={{ dislay: "flex"}}>
                {/* SIDEBAR*/}
                <div style={{ width: "30%", padding: "10px" }}>
                    <h3>Add Restaurant</h3>

                    <input 
                        name="restaurantName"
                        placeholder="Name"
                        value={form.restaurantName}
                        onChange={handleChange}
                    />

                    <input 
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                    />

                    <select name="type" value={form.type} onChange={handleChange}>
                        <option value="">Select Type</option>
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
                        <option value="">Parking Available?</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>

                    <button onClick={handleAdd}> Add Restaurant</button>
                </div>
                {/*RESTAURANT LIST */}
                <div style={{ widht: "70%"}}>
                    {restaurants.map((r)=>(
                        <RestaurantCard
                            key={r.id}
                            data={r}
                            isAdmin={true}
                            onDelete={handleDelete}
                            onUpdate={(id)=>
                            navigate(`/admin/restaurants/Update/${id}`)
                         }
                        />
                    ))}
                </div>
            </div>
        );
    };
export default AdminDashboard;