const RestaurantCard =({ data, isAdmin, onDelete, onUpdate})=>{
    return (
        <div>
            <img src={data.image} width="150" />
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