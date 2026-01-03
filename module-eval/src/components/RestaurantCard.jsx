const RestaurantCard =({ data, isAdmin, onDelete, onUpdate})=>{
    return (
        <div style={{border: "1px solid gray", margin: "10px", padding:"10px"}}>
            <img src={data.image} width="200" />
            <h3>{data.restaurantName}</h3>
            <p>{data.address}</p>
            <p>{data.type}</p>
            <p>Parking: {data.parkingLot ? "Yes" : "No"}</p>

            {isAdmin && (
                <>
                <button onClick={()=>onUpdate(data.id)}>Update</button>
                <button onClick={()=>onDelete(data.id)}>Delete</button>
                </>
            )}
        </div>
    );
};
export default RestaurantCard;