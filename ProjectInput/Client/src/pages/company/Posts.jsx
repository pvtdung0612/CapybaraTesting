import axios from "axios";
import Authentication from "services/Authentication/Authentication";
import Post from "../../components/company/Post";
import Pagination, { postsPerPage } from "components/Pagination";

const { default: Dashboard } = require("components/company/Dashboard");
const { default: React, useState, useEffect } = require("react");

export default function Posts() {
    const [isPressedActive, setIsPressedActive] = useState(true);
    const [isPressedClosed, setIsPressedClosed] = useState(false);
    const handleActivePosts = () => {
        setIsPressedActive(true);
        setIsPressedClosed(false);
    };
    const handleClosedPosts = () => {
        setIsPressedClosed(true);
        setIsPressedActive(false);
    };

    const companyData = Authentication.getCurrentUser();

    const [posts, setPosts] = useState([]);
    const [activePosts, setActivePosts] = useState([]);
    const [closedPosts, setClosedPosts] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/job?companyId=${companyData.id}`,
        })
            .then((res) => {
                // console.log(res.data);
                const posts = res.data.elements;
                setPosts(posts);

                const activePosts = posts.filter((post) => {
                    return new Date() <= new Date(post.closeDate);
                });
                const closedPosts = posts.filter((post) => {
                    return new Date() >= new Date(post.closeDate);
                });
                setActivePosts(activePosts);
                setClosedPosts(closedPosts);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    useEffect(() => {
        setCurrentPage(1);
    }, [isPressedActive, isPressedClosed]);
    return (
        <Dashboard>
            <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide relative">
                <h1 className="text-xl font-semibold text-text_color mb-10">
                    Tin tuyển dụng
                </h1>
                <div className="flex gap-10">
                    <button
                        onClick={() => handleActivePosts()}
                        className={`${isPressedActive ? "text-text_color" : "text-text_color/50"
                            } text-base font-medium `}
                    >
                        Tin hoạt động
                        <span className="ml-2 text-base">{activePosts.length}</span>
                        {isPressedActive && (
                            <div className="w-full h-2 bg-emerald-300 mt-1 rounded-xl"></div>
                        )}
                    </button>
                    <button
                        onClick={() => handleClosedPosts()}
                        className={`${isPressedClosed ? "text-text_color" : "text-text_color/50"
                            } text-base font-medium `}
                    >
                        Tin hết hạn
                        <span className="ml-2 text-base">{closedPosts.length}</span>
                        {isPressedClosed && (
                            <div className="w-full h-2 bg-emerald-300 mt-1 rounded-xl"></div>
                        )}
                    </button>
                </div>
                <div className="flex flex-col gap-2 m-5 h-auto ">
                    {/* <h1 className="text-lg font-medium">
            {`Tổng số tin: ${
              isPressedActive ? activePosts.length : closedPosts.length
            }`}
          </h1> */}
                    <div className=" overflow-y-scroll h-3/4 scrollbar-hide flex flex-col gap-5">
                        {isPressedActive && (
                            <div>
                                {activePosts
                                    .slice(firstPostIndex, lastPostIndex)
                                    .map((post) => {
                                        return (
                                            <div>
                                                <Post key={post.id} post={post} />
                                            </div>
                                        );
                                    })}
                                <div className="absolute right-8 bottom-4">
                                    <Pagination
                                        totalPosts={activePosts.length}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        )}
                        {isPressedClosed &&
                            closedPosts.map((post) => {
                                return <Post key={post.id} post={post} />;
                            })}
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
