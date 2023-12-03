export default function AddEvents(){
    async function SubmitHandle(event){
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const dateInput = event.target.date.value;
        // generating the date now and convert it to string
        const date = new Date();
        const dateStr = date.toDateString();
        // generating a random string of 16 characters
        const serial = Math.random().toString(36).substring(2, 16);
        const data = {
            serial,
            title,
            description,
            date: dateInput,
            createdAt: dateStr,
        }
        try{
            const response = await fetch('http://localhost:5000/events',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(response)
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div
        style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            marginTop:"100px",
            textAlign:"center",
            width:"100%"
        }}
        >
            <div>
                <a href="/events">View Events</a>
            </div>
            Create an Event
            <form onSubmit={SubmitHandle}>
                <label>Event Name</label>
                <input style={{width:"330px"}} type="text" placeholder="Event Name" name='title' />
                <label>Description</label>
                <textarea type="text" name='description' />
                <label>Date</label>
                <input type="date" name='date' />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
