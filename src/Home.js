import BlogList from "./BlogList";
import useFetch from "./useFetch";


const Home = () => {
    const {data: blogs, isPending, error} = useFetch('https://ap-south-1.aws.data.mongodb-api.com/app/application-0-gblsohc/endpoint/blogs')


    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs = {blogs} title = "All Blogs!" />}
        </div>
        
    );
}
 
export default Home;