import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "@fontsource/cairo";
import "./css/common.scss";
import "./App.scss";
import Config from "./includes/config.json";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import i18n from "./i18n";
import { createAxiosCall, scrollTo } from "./includes/functions";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import ThankyouPage from "./pages/ThankyouPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

class App extends Component {
	constructor(props) {
		super(props);
		this.onScreenScroll = this.onScreenScroll.bind(this);
	}

	componentDidMount() {
		this.checkRTL();
		this.getPhoneNumber();
		document.addEventListener("scroll", this.onScreenScroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.onScreenScroll);
	}

	checkRTL() {
		if (Config.rtl_languages.includes(i18n.language)) {
			const body = document.querySelector("body");
			if (!body.classList.contains("rtl")) {
				document.querySelector("body").classList.add("rtl");
			}
		} else {
			document.querySelector("body").classList.remove("rtl");
		}
	}

	onScreenScroll(e) {
		if (window.scrollY > 300) {
			let classList = document.getElementById("scrollToTop").classList;
			if (!classList.contains("visible")) {
				document.getElementById("scrollToTop").classList.add("visible");
			}
		} else {
			document.getElementById("scrollToTop").classList.remove("visible");
		}
	}

	async getPhoneNumber() {
		const request = {
			column: "campaign_name",
			value: `'${Config.campaignName}'`,
			tableName: "campaigns_phone_numbers",
			selectValues: "phone_number, telephone",
		};
		const response = await createAxiosCall("POST", "common/get-entries", request);
		Config.telephone = response[0]?.telephone || null;
		Config.whatsapp_number = response[0]?.phone_number || null;
		this.setState({});
	}

	render() {
		return (
			<div className="App">
				<div className="sticky-div">
					{Config.telephone && (
						<a href={"tel:" + Config.telephone}>
							<PhoneInTalkIcon className="sticky-div-icon" />
						</a>
					)}
					{Config.whatsapp_number && (
						<a href={"https://wa.me/" + Config.whatsapp_number + "?text=" + Config.whatsapp_message} target="_blank" rel="noopener noreferrer">
							<WhatsAppIcon className="sticky-div-icon" />
						</a>
					)}
				</div>
				<div className="sticky-div left">
					<KeyboardDoubleArrowUpIcon id="scrollToTop" onClick={() => scrollTo("body")} className="sticky-div-icon scrollTop" />
				</div>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/thankyou/:orderNum" component={ThankyouPage} />
					<Route exact path="/privacy_policy" component={PrivacyPolicy} />
					<Route exact path="/terms_and_conditions" component={TermsAndConditions} />
					<Redirect to="/" />
				</Switch>
				<BottomNav />
			</div>
		);
	}
}

export default App;
