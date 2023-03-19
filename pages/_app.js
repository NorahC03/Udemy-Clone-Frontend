import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '../public/css/styles.css'
import TopNav from '../components/topNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from '../context/indexContext';
function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <ToastContainer />
            <TopNav />
            <Component{...pageProps} />
        </Provider>
    )
}
export default MyApp; 