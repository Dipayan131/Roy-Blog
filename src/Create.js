import { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 from uuid package

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('yoshi')
    const [isPending, setIsPending] = useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = uuidv4(); // Generate a unique id
        const blog = { id, title, body, author };

        setIsPending(true)

        setTimeout(() => {
            fetch("https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/blog", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog)
            }).then(() => {
                console.log('new blog added');
                setIsPending(false);
                history.push('/')
            })

        });


    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                >
                </textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
    );
}

export default Create;
