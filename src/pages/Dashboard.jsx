import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUrls } from "../features/url/urlSlice"
import CreateUrlForm from "../components/CreateUrlForm"
import UrlList from "../components/UrlList"
const Dashboard = () => {

    const dispatch = useDispatch()
    const { urls, loading } = useSelector(state => state.url)

    useEffect(() => {
        dispatch(fetchUrls())
    }, [dispatch])

    return (
        <>
            <h2>Dashboard</h2>
            <CreateUrlForm/>

            {loading ? <p>Loading...</p> : <UrlList urls={urls}/>}
        </>
    )
}

export default Dashboard