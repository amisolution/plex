// External Libraries
import * as React from "react";
import * as _ from "lodash";
import * as ReactGA from "react-ga";
import * as Web3 from "web3";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { BigNumber } from "bignumber.js";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
const promisify = require("tiny-promisify");

// Router
import { AppContainer } from "../AppContainer";

// Layouts
import {
    WelcomeContainer,
    FillLoanEmpty,
    DefaultContent,
    TestForm,
    RequestLoanFormContainer,
    RequestLoanSuccessContainer,
    DashboardContainer,
    FillLoanEnteredContainer,
    TermsContainer,
    Privacy,
    EnsureAgreedToTermsContainer,
} from "../modules";
import { ParentContainer } from "../layouts";

// Actions
import {
    web3Connected,
    dharmaInstantiated,
    setAccounts,
    setNetworkId,
    setRecommendedGasPrice,
} from "./actions";
import { setError } from "../components/Toast/actions";

// Common
import { web3Errors } from "../common/web3Errors";
import { ETH_GAS_STATION_API_URL, SUPPORTED_NETWORK_IDS } from "../common/constants";

interface Props {
    store: any;
    env: string;
}

class AppRouter extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    async componentDidMount() {
        const { store, env } = this.props;
        const dispatch = store.dispatch;

        try {
            const web3 = await this.connectToWeb3(env);
            dispatch(web3Connected(web3));

            const networkID = await this.getNetworkID(web3);
            dispatch(setNetworkId(networkID));

            const accounts = await this.getAccounts(web3);
            dispatch(setAccounts(accounts));

            const dharma = await this.instantiateDharma(web3);
            dispatch(dharmaInstantiated(dharma));

            const recommendedGasPrice = await this.getRecommendedGasPrice(web3);
            dispatch(setRecommendedGasPrice(recommendedGasPrice));
        } catch (e) {
            dispatch(setError(e.message, true));
        }
    }

    /**
     * Asynchronously instantiates a new web3 instance and ensures that a valid connection is
     * present; throws otherwise.
     *
     * @async
     * @param  {string}  env the node environment as specified in the process running the app.
     *
     * @return {Promise<Web3>}     web3 instance that is actively connected to an Ethereum node.
     * @throws {UNABLE_TO_FIND_WEB3_PROVIDER} error in the case where no web3 provider is found.
     * @throws {UNABLE_TO_CONNECT_TO_NETWORK} error in the case where an active connection is not made.
     */
    async connectToWeb3(env: string): Promise<Web3> {
        let web3: Web3;

        if (typeof (window as any).web3 !== "undefined") {
            web3 = await new Web3((window as any).web3.currentProvider);
        } else if (env === "test") {
            web3 = await new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        } else {
            throw new Error(web3Errors.UNABLE_TO_FIND_WEB3_PROVIDER);
        }

        if (web3.isConnected()) {
            return web3;
        } else {
            throw new Error(web3Errors.UNABLE_TO_CONNECT_TO_NETWORK);
        }
    }

    /**
     * Asynchronously retrieves the networkID and checks to ensures that Dharma supports its
     * associated network; throws otherwise.
     *
     * @async
     * @param  {Web3}  web3 instance of web3 with a valid connection to an Ethereum node.
     *
     * @return {Promise<number>}      the network id associated with the currrent web3 connection.
     * @throws {UNSUPPORTED_NETWORK} error in the case where the network id does not map to a
     *                               network supported by Dharma.
     */
    async getNetworkID(web3: Web3): Promise<number> {
        const networkIDString = await promisify(web3.version.getNetwork)();
        const networkID = parseInt(networkIDString, 10);

        if (_.includes(SUPPORTED_NETWORK_IDS, networkID)) {
            return networkID;
        } else {
            throw new Error(web3Errors.UNSUPPORTED_NETWORK);
        }
    }

    /**
     * Asynchronously retrieves the accounts associated with the web3 instance.
     *
     * @async
     * @param  {Web3}  web3 instance of web3 with a valid connection to an Ethereum node.
     *
     * @return {Promise<string[]>}      the accounts associated with the web3 instance.
     * @throws {UNABLE_TO_FIND_ACCOUNTS} error in the case where no accounts can be retrieved.
     */
    async getAccounts(web3: Web3): Promise<string[]> {
        const accounts = await promisify(web3.eth.getAccounts)();
        if (accounts.length) {
            return accounts;
        } else {
            throw new Error(web3Errors.UNABLE_TO_FIND_ACCOUNTS);
        }
    }

    async instantiateDharma(web3: Web3) {
        return new Dharma(web3.currentProvider);
    }

    /**
     * Returns a recommended gas price in wei as a BigNumber, wrapped in a promise.
     *
     * Examples:
     *
     * await getRecommendedGasPrice(web3);
     * => 4000000000
     *
     * @param {module:web3.Web3} web3
     * @returns {Promise<BigNumber>}
     */
    async getRecommendedGasPrice(web3: Web3): Promise<BigNumber> {
        // Parse JSON data from the gas station.
        const stationResp = await fetch(ETH_GAS_STATION_API_URL);
        const stationData = await stationResp.json();

        const recommendation = new BigNumber(stationData.fast);

        return web3.toWei(recommendation.div(10), "gwei");
    }

    trackPageView() {
        ReactGA.pageview(window.location.pathname);
    }

    render() {
        const history = syncHistoryWithStore(browserHistory, this.props.store);

        return (
            <Router history={history} onUpdate={this.trackPageView}>
                <Route path="/" component={AppContainer}>
                    <IndexRoute component={WelcomeContainer} />
                    <Route component={EnsureAgreedToTermsContainer}>
                        <Route path="/dashboard" component={DashboardContainer} />
                        <Route path="/request" component={ParentContainer}>
                            <IndexRoute component={RequestLoanFormContainer} />
                            <Route path="success" component={RequestLoanSuccessContainer} />
                        </Route>
                    </Route>
                    <Route path="/fill" component={ParentContainer}>
                        <IndexRoute component={FillLoanEmpty} />
                        <Route path="loan" component={FillLoanEnteredContainer} />
                    </Route>
                    <Route path="/plex" component={DefaultContent} />
                    <Route path="/whitepaper" component={DefaultContent} />
                    <Route path="/blog" component={DefaultContent} />
                    <Route path="/github" component={DefaultContent} />
                    <Route path="/chat" component={DefaultContent} />
                    <Route path="/twitter" component={DefaultContent} />
                    <Route path="/test" component={TestForm} />
                    <Route path="/terms" component={TermsContainer} />
                    <Route path="/privacy" component={Privacy} />
                </Route>
            </Router>
        );
    }
}

export { AppRouter };
