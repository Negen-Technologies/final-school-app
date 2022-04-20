import { createWrapper } from "next-redux-wrapper";
import "../assets/antd-custom.less";
import store from "../store/store";
import Loading from "../Components/loadingComponents/Loading";
import Message from "../Components/messageComponents/Message";
import { Provider } from "react-redux";

// The development branch (dev) is created and we push to that branch before the main

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
