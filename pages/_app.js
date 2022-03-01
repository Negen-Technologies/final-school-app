import { createWrapper } from "next-redux-wrapper";
import "../assets/antd-custom.less";
import store from "../store/store";
import Loading from "../components/loadingComponents/Loading";
import Message from "../components/messageComponents/Message";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Loading></Loading>
      <Message></Message>

      <Component {...pageProps} />
    </Provider>
  );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);