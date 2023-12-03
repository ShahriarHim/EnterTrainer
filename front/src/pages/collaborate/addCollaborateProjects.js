export default function CollaborateProjects(){
    async function SubmitHandle(event){
        event.preventDefault();
        const title = event.target.title.value;
        const description = event.target.description.value;
        const requirements = event.target.requirements.value;
        // generating the date now and convert it to string
        const date = new Date();
        const dateStr = date.toDateString();
        // generating a random string of 16 characters
        const serial = Math.random().toString(36).substring(2, 16);
        const data = {
            serial,
            title,
            description,
            requirements,
            date: dateStr
        }
        try{
            const response = await fetch('http://localhost:5000/collaborate-projects',{
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
                <a href="/collaborate-projects">View Projects</a>
            </div>
            Create a collaboration project
            <form onSubmit={SubmitHandle}>
                <label>Project Name</label>
                <input style={{width:"330px"}} type="text" placeholder="Project Name" name='title' />
                <label>Description</label>
                <textarea type="text" name='description' />
                <label>Requirements</label>
                <textarea type="text" name='requirements' />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}