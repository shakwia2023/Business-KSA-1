import React, { Component } from "react";
import ImageSlider from "../../components/ImageSlider";
import "./styles.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { scrollTo } from "../../includes/functions";
import About from "../../components/About";
import ContactUs from "../../components/ContactUs";
import { withTranslation } from "react-i18next";
import Services from "../../components/Services";
import SubmitReport from "../../components/SubmitReport";

const images = [{ url: require("../../images/1.png") }, { url: require("../../images/2.jpg") }, { url: require("../../images/3.jpg") }, { url: require("../../images/4.jpg") }];

class Home extends Component {
	onScrollArrowClick(e) {
		scrollTo("#about");
	}

	render() {
		const { t } = this.props;
		return (
			<div className="page-content home">
				<ImageSlider data={images}>
					<div className="inside-slider">
						<div className="business-name">
							<label className="fixed-name">{t("business_name").split(" ")[0]}</label>
							<label className="animated-name">{t("business_name").split(" ").slice(1).join(" ")}</label>
						</div>
						<p className="campaign-intro">{t("campaign-intro")}</p>
						<ExpandMoreIcon className="scroll-down-btn" onClick={this.onScrollArrowClick} />
					</div>
				</ImageSlider>
				<div style={{ margin: "0px 10px" }}>
					<About id="about" />
					<Services id="services" />
					<SubmitReport id="submit_report" />
					<ContactUs id="contact_us" />
				</div>
			</div>
		);
	}
}

export default withTranslation()(Home);
